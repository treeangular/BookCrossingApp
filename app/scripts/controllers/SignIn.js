'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, DataService, $location, facebookService) {
    $scope.signInUser = function (user) {
        DataService.signIn(user.Email, user.Password, function (result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                $scope.registerResult = result ? "Success" : "Failed";

                if (result) {
                    $scope.registerResult = "Success";
                    $location.path('/Main');
                } else {
                    $scope.registerResult = "Fail!";
                    $location.path('/');
                }

            });
        });
    };
    $scope.login = function()
    {
        facebookService.login();
    };

});
