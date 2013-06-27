BookCrossingApp.controller('MapTrackingCtrl', function ($scope, $rootScope, dataService) {
    $scope.myMarkers = [];
    var markerCount = 0;
    var book = $scope.selectedBook;
    //Start Mock data
    //TODO: Join structures in just one
   var releaseCoordinates = [];
//        new google.maps.LatLng(37.772323, -122.214897),
//        new google.maps.LatLng(21.291982, -157.821856),
//        new google.maps.LatLng(-18.142599, 178.431),
//        new google.maps.LatLng(-27.46758, 153.027892)
//    ];

    var user = {
        id:"uctPK4BZ3r",
        image: "styles/img/user.jpg",
        nick: "Marc"
    };

    $scope.currentTrack = {
        description: "The book is under the bench in Central square! Enjoy it!",
        user: user,
        time: "12 days"};
    //Finish mock data

    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 12,
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

    function getMarkerIcon() {
        markerCount++;
        return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + markerCount + "|169691|000000";
    }

         dataService.getTrackingForBook(book, function (isSuccess, results) {

             $scope.$apply(function () {

                 //Load release coordinates in the map
                 if($scope.myMarkers.length == 0){
                     var bounds = new google.maps.LatLngBounds();
                     for (var i = results.length-1; i >= 0 ; i--) {

                         var releasedAt = results[i].get('releasedAt');

                         var releasedAtTransformed =  new google.maps.LatLng(releasedAt.latitude, releasedAt.longitude);

                         bounds.extend(releasedAtTransformed);

                         var marker = new google.maps.Marker({
                             map: $scope.myMap,
                             position: releasedAtTransformed,
                             title: "Point" + i,
                             icon:getMarkerIcon()
                         });

                         $scope.myMarkers.push(marker);
                         releaseCoordinates.push(releasedAtTransformed);
                     }

                     //Create the path in the map
                     var flightPath = new google.maps.Polyline({
                         path: releaseCoordinates,
                         strokeColor: '#000000',
                         strokeOpacity: 1.0,
                         strokeWeight: 4
                     });
                     flightPath.setMap($scope.myMap);

                     //Fit book path in the map
                     $scope.myMap.fitBounds(bounds);
                 }
             });
         });

});