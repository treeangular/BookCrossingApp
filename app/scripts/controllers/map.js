BookCrossingApp.controller('MapCtrl', function($scope,$rootScope, geolocationService, dataService) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"Map");

    var geoPoint;
    var myPositionIcon = "styles/img/myPosition.gif";
    var bookIcon = "styles/img/book.png";
    var zobcIcon = "styles/img/zobc.png";

    $scope.myMarkers = [];
    $scope.cluster = {
        bookGroup:[]
    }
    $scope.books = [];

    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 12,
        maxZoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };


    var style = [{
        url: 'styles/img/books.png',
        height: 38,
        width: 40,
        opt_anchor: [16, 0],
        opt_textColor: '#ffffff',
        opt_textSize: 10
    }, {
        url: 'styles/img/books.png',
        height: 38,
        width: 40,
        opt_anchor: [24, 0],
        opt_textColor: '#ffffff',
        opt_textSize: 11
    }, {
        url: 'styles/img/books.png',
        height: 38,
        width: 40,
        opt_textColor: '#ffffff',
        opt_anchor: [32, 0],
        opt_textSize: 12
    }
    ];

    $scope.addMarker = function($event) {
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: $event.latLng
        }));
    };

    $scope.setZoomMessage = function(zoom) {
        $scope.zoomMessage = 'You just zoomed to '+zoom+'!';
        console.log(zoom,'zoomed');
    };

    function getId(array, id) {
        var obj = array.filter(function (val) {
            return val.id === id;
        });
        //filter returns an array, and we just want the matching item
        return obj[0];
    }

    $scope.openMarkerInfo = function(marker) {

        $rootScope.gaPlugIn.trackEvent(function(){}, function(){}, "Button", "Click", "Book Detail From Map", 1);

        if (marker.title == "Me") return;
        $scope.book = getId($scope.books, marker.title);
        $scope.currentMarker = marker;
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function(marker, lat, lng) {
        marker.setPosition(new google.maps.LatLng(lat, lng));
    };

    geolocationService.getCurrentPosition(function (position) {
        geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};
        if (geoPoint!=null){

            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
                title: "Me",
                icon:myPositionIcon
            });

            //$scope.myMarkers.push(marker);

            $scope.myMap.setCenter(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));
            $scope.getActPage();

        }
    });

    var selectedmarkers = [];
    var currentGroupPage = 0;

    $scope.nextBooks = function () {
        currentGroupPage++;
        var marker = selectedmarkers[currentGroupPage];
        $scope.bookgr1 = getId($scope.books, marker.title);
        currentGroupPage++;
        marker = selectedmarkers[currentGroupPage];
        $scope.bookgr2 = getId($scope.books, marker.title);
        if (selectedmarkers.length > currentGroupPage+1){
            currentGroupPage++;
            marker = selectedmarkers[currentGroupPage];
            $scope.bookgr3 = getId($scope.books, marker.title);
        }
        else{
            $scope.bookgr3 = null;
        }
        if (selectedmarkers.length > currentGroupPage+1){
            $scope.IsNextGroupPage = true;
        }
        else{
            $scope.IsNextGroupPage = false;
        }

    }

    function multiChoice(clickedCluster) {
        if (clickedCluster.getMarkers().length > 1)
        {
            currentGroupPage = 1;
            selectedmarkers = clickedCluster.getMarkers();
            var marker = selectedmarkers[0];
            $scope.bookgr1 = getId($scope.books, marker.title);
            marker = selectedmarkers[1];
            $scope.bookgr2 = getId($scope.books, marker.title);

            if (selectedmarkers.length > currentGroupPage+1){
                currentGroupPage = 2;
                marker = selectedmarkers[2];
                $scope.bookgr3 = getId($scope.books, marker.title);
            }
            else{
                $scope.bookgr3 = null;
            }
            if (selectedmarkers.length > currentGroupPage+1){
                $scope.IsNextGroupPage = true;
            }
            else{
                $scope.IsNextGroupPage = false;
            }

            $scope.myInfoWindowList.open($scope.myMap, marker);
            return false;
        }
        return true;
    };

    $scope.getActPage = function () {
        dataService.getBooksForMap(geoPoint, function (isSuccess, results) {
            $scope.$apply(function () {
                //TODO: Load only the released books arround x km
                $scope.bookList = results;
                for (var i=0;i<results.length;i++)
                {
                    var book = results[i];
                    var releasedAt = book.get('releasedAt');
                    //var book = action.get('book');
                    //var actionType = action.get('actionType');
                    var user = book.get('ownedBy');

                    var title = book.get('title');
                    var description = book.get('description');
                    var releasedAtDescription = book.get('releasedAtDescription');
                    var username = user.get('nick');
                    var image = book.get('image');
                    var bookStatus = book.get('bookStatus');
                    var time;
                    //TODO: Move in a directive?

                    var seconds = Math.round((new Date()-book.createdAt)/1000);
                    var minutes = Math.round(seconds/60);
                    var hours = Math.round(minutes/60);
                    var days = Math.round(hours/24);

                    if(seconds < 60)
                        time = seconds + ' sec';
                    else if(minutes < 60)
                        time = minutes + ' min';
                    else if(hours < 24)
                        time = hours + ' hours';
                    else
                        time = days + ' days';

                    book.time = time;
                    book.image = image;

                    $scope.books.push(book);
                    var bookMarker = new google.maps.Marker({
                        map: $scope.myMap,
                        position: new google.maps.LatLng(releasedAt.latitude, releasedAt.longitude),
                        title: book.id,
                        icon:bookIcon
                    });


                    $scope.myMarkers.push(bookMarker);

                }

                var mcOptions = {gridSize: 50, maxZoom: 19, styles: style};
                var markerCluster = new MarkerClusterer($scope.myMap, $scope.myMarkers, mcOptions);

                markerCluster.onClick = function(clickedClusterIcon) {
                    return multiChoice(clickedClusterIcon.cluster_);
                }
            });
        });
    };



});