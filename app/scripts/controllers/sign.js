'use strict';

BookCrossingApp.controller('SignCtrl', function ($scope, dataService, $location, $rootScope) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"Sign");

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
