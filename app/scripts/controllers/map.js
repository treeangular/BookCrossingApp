BookCrossingApp.controller('MapCtrl', function($scope, geolocationService, dataService) {
    var geoPoint;
    var myPositionIcon = "styles/img/myPosition.gif";
    var bookIcon = "styles/img/book.png";
    var zobcIcon = "styles/img/zobc.png";

    $scope.myMarkers = [];
    $scope.books = [];

    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

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

            $scope.myMarkers.push(marker);

            $scope.myMap.setCenter(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));
            $scope.getActPage();

        }
    });

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
                    var username = user.get('username');
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

//                    if (actionType != null)
//                        description = actionType.get('description');
//
//                    if (user != null)
//                        username = user.get('nick');

//                    if (actionType != null){
//                        var typeId = actionType.get('description');
//
//                        //TODO: User localization here!!!!
//                        switch(typeId){
//                            case 'registered':
//                                description= "has been registered by ";
//                                break;
//                            case 'joined':
//                                description= "has been joined by ";
//                                break;
//                            case 'locked':
//                                description= "has been locked by ";
//                                break;
//                            case 'released':
//                                description= "has been released around you by ";
//                            default:
//                                description= typeId + " " + username;
//                                break;
//                        }
//                    }

//                    $scope.newbook = {
//                        id: book.id,
//                        title: title,
//                        //TODO: Add localization
//                        releasedAtDescription: releasedAtDescription,
//                        description: description,
//                        image: image,
//                        user: username,
//                        time:time,
//                        bookStatus: bookStatus
//                    };
//                    $scope.books.push($scope.newbook);
                    $scope.books.push(book);
                    var bookMarker = new google.maps.Marker({
                        map: $scope.myMap,
                        position: new google.maps.LatLng(releasedAt.latitude, releasedAt.longitude),
                        title: book.id,
                        icon:bookIcon
                    });

                    $scope.myMarkers.push(bookMarker);
                }
            });
        });
    };



});