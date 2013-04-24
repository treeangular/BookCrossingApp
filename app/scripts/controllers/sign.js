'use strict';

BookCrossingApp.controller('SignCtrl', function ($scope, dataService, $location) {

    alert("BookCrossingApp.controller SignCtrl!");
    dataService.isCurrentUser(function (result) {
        if (result) {
            $location.path('/Main');
        }
        else {
            $location.path('/');
        }
    });
});
