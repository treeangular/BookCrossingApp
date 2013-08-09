BookCrossingApp.controller('MapTrackingCtrl', function ($scope, $rootScope, dataService) {

    $rootScope.gaPlugIn.trackPage(function(){}, function(){},"MapTracking");


    $scope.myMarkers = [];
    var markerCount = 0;
    var book = $scope.selectedBook;

   var releaseCoordinates = [];

    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    $scope.openMarkerInfo = function(marker) {
        $scope.currentTrack = marker;
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

                         var marker = new google.maps.Marker({
                             map: $scope.myMap,
                             position: releasedAtTransformed,
                             title: "Point" + i,
                             icon:getMarkerIcon(),
                             user: results[i].get('releasedBy'),
                             description: results[i].get('releasedAtDescription'),
                             time: time
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