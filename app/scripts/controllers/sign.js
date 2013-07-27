'use strict';

BookCrossingApp.controller('SignCtrl', function ($scope, dataService, $location, $rootScope) {





    dataService.isCurrentUser(function (result, currentUser) {



        if (result) {
            $rootScope.currentUser = currentUser;
            $location.path('/Main');
        }
        else {
            $location.path('/');
        }
    });
});
