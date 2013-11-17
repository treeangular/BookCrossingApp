BookCrossingApp.controller('BookPositionCtrl', function($scope,$rootScope, geolocationService, dataService) {

    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"bookPosition.html");

    var geoPoint;
    var myPositionIcon = "styles/img/myPosition.png";
    var bookIcon = "styles/img/book.png";

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
        $scope.currentMarker = marker;
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function(marker, lat, lng) {
        marker.setPosition(new google.maps.LatLng(lat, lng));
    };

    geolocationService.getCurrentPosition(function (position) {
        geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};
        if (geoPoint!=null){

            new google.maps.Marker({
                map: $scope.myMap,
                position: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
                title: "Me",
                icon:myPositionIcon
            });

            var book = $scope.selectedBook;
            $scope.book = book;

            $scope.books.push(book);

            var bookMarker = new google.maps.Marker({
                map: $scope.myMap,
                position: new google.maps.LatLng(book.get('releasedAt').latitude, book.get('releasedAt').longitude),
                title: book.id,
                icon:bookIcon
            });

            $scope.myMap.setCenter(new google.maps.LatLng(book.get('releasedAt').latitude, book.get('releasedAt').longitude));


            $scope.myMarkers.push(bookMarker);

        }
    });




});