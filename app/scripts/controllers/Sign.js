'use strict';

BookCrossingApp.controller('SignCtrl', function ($scope, DataService, $location) {

    DataService.isCurrentUser(function (result) {
        if (result) {
            $location.path('/Main');
        }
        else {
            $location.path('/');
        }

        $scope.status = "CurretnUser";
    });
});
