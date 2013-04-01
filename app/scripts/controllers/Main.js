'use strict';

BookCrossingApp.controller('MainCtrl', function ($scope, DataService) {
    // Call the service and fetch the list of signatures that match the given petition ID
    DataService.getWholeActions(function (results) {
        $scope.$apply(function () {

            //if the object is complex 
            $scope.actionList = results;
            //Todo hev: try to understand 
            //$scope.actionList = results.models;
        });
    });
});
