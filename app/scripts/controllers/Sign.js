'use strict';

BookCrossingApp.controller('SignCtrl', function ($scope, DataService, $location) {

    $scope.ToSignIn = function () {
          //How do I change to another view now?!!? Locate ??
          $location.path('/main');
    };

    DataService.isCurrentUser(function (result) {
        if (result) {
            $location.path('/Main');
        }
        else {
            $location.path('/');
        }
    });
});
