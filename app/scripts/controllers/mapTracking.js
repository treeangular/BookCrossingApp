BookCrossingApp.controller('MapTrackingCtrl', function ($scope, $rootScope, dataService) {
    $scope.myMarkers = [];
    var markerIcon = "styles/img/book.png";

    var user = {
        id:"uctPK4BZ3r",
        image: "styles/img/user.jpg",
        nick: "Marc"
    };

    $scope.currentTrack = {
        description: "The book is under the bench in Central square! Enjoy it!",
        user: user,
        time: "12 days"};

    $scope.mapOptions = {
        center: new google.maps.LatLng(37.772323, -122.214897),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    $scope.openMarkerInfo = function(marker) {
        $scope.currentMarker = marker;
        $scope.myInfoWindow.open($scope.myMap, marker);
    };

    $scope.addMarker = function($event) {
        $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: $event.latLng
        }));
    };

    //Mock Data
     $scope.onMapIdle = function() {

         $scope.myMarkers = [
             new google.maps.Marker({
                 map: $scope.myMap,
                 position: new google.maps.LatLng(37.772323, -122.214897),
                 title: "1",
                 icon:markerIcon
             }),
             new google.maps.Marker({
                 map: $scope.myMap,
                 position: new google.maps.LatLng(21.291982, -157.821856),
                 title: "2",
                 icon:markerIcon
             }),
             new google.maps.Marker({
                 map: $scope.myMap,
                 position: new google.maps.LatLng(21.291982, -157.821856),
                 title: "2",
                 icon:markerIcon
             }),
             new google.maps.Marker({
                 map: $scope.myMap,
                 position: new google.maps.LatLng(-27.46758, 153.027892),
                 title: "4",
                 icon:markerIcon
             })
         ];

    var flightPlanCoordinates = [
        new google.maps.LatLng(37.772323, -122.214897),
        new google.maps.LatLng(21.291982, -157.821856),
        new google.maps.LatLng(-18.142599, 178.431),
        new google.maps.LatLng(-27.46758, 153.027892)
    ];

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });

    flightPath.setMap($scope.myMap);
    };
});