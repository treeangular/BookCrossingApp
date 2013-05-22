BookCrossingApp.controller('MapCtrl', function($scope, geolocationService,$rootScope) {
    var geoPoint;
    var myPositionIcon = "styles/img/myPosition.gif";
    var bookIcon = "styles/img/book.png";
    var zobcIcon = "styles/img/zobc.png";

    $scope.myMarkers = [];

    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
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

    $scope.markerClicked = function(marker) {
        $scope.currentMarker = marker;
        $scope.currentMarkerLat = marker.getPosition().lat();
        $scope.currentMarkerLng = marker.getPosition().lng();
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.openMarkerInfo = function(marker) {
        $scope.currentMarker = marker;
        $scope.currentMarkerLat = marker.getPosition().lat();
        $scope.currentMarkerLng = marker.getPosition().lng();
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.setMarkerPosition = function(marker, lat, lng) {
        marker.setPosition(new google.maps.LatLng(lat, lng));
    };

            geolocationService.getCurrentPosition(function (position) {
                        geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};

                            if (geoPoint!=null){

                                $scope.onMapIdle = function() {

                                    var marker = new google.maps.Marker({
                                        map: $scope.myMap,
                                        position: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
                                        icon:myPositionIcon
                                    });

                                    $scope.myMarkers.push(marker);

                                    marker = new google.maps.Marker({
                                        map: $scope.myMap,
                                        position: new google.maps.LatLng(geoPoint.latitude+0.1, geoPoint.longitude),
                                        icon:bookIcon
                                    });

                                    $scope.myMarkers.push(marker);

                                    $scope.myMap.setCenter(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));

                                };




        }

        });


});