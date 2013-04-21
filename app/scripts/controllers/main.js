'use strict';

BookCrossingApp.controller('MainCtrl', function ($scope, dataService, geolocationService) {
    // Call the service and fetch the list of signatures that match the given petition ID
    dataService.getWholeActions(function (results) {
        $scope.$apply(function () {

            //if the object is complex 
            $scope.actionList = results;
            //Todo hev: try to understand 
            //$scope.actionList = results.models;
            /*
            geolocationService.getCurrentPosition(function (position) {
                alert('Latitude: '              + position.coords.latitude          + '\n' +
                    'Longitude: '             + position.coords.longitude         + '\n' +
                    'Altitude: '              + position.coords.altitude          + '\n' +
                    'Accuracy: '              + position.coords.accuracy          + '\n' +
                    'Altitude Accuracy: '     + position.coords.altitudeAccuracy  + '\n' +
                    'Heading: '               + position.coords.heading           + '\n' +
                    'Speed: '                 + position.coords.speed             + '\n' +
                    'Timestamp: '             + position.timestamp                + '\n');
            }); */

            console.log("Are we getting here more than once?!?");
        });
    });
});
