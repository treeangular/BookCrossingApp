'use strict';

BookCrossingApp.controller('SignCtrl', function ($scope, dataService, $location) {

    dataService.isCurrentUser(function (result) {
        if (result) {
            $location.path('/Main');
        }
        else {
            $location.path('/');
        }
    });
});
