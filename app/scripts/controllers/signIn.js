'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, DataService, $location, facebookService) {				
    $scope.signInUser = function (user) {
        DataService.signIn(user.Email, user.Password, function (result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {


                if (result) {

                    $location.path('/Main');
                } else {

					$scope.ErrorMessage = "User or password invalid!";
                }

            });
        });
    };
    $scope.login = function()
    {
        facebookService.login();
    };

});
