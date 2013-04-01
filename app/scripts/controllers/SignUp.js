'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, DataService, $location) {
    $scope.registerNewUser = function (user) {

        DataService.registerNewUser(user, function (isResult, result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                $scope.registerResult = isResult ? "Success" : result;
            });
            if (isResult) {
                //$scope.registerResult = "Success";
                $location.path('/Main');
            }
            else {
                $scope.registerResult = "Fail!";
                //$location.path('/');
            }
        });
    };
});
