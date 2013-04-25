'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, dataService, $location, facebookService, $rootScope) {
    $scope.signInUser = function (user) {
        dataService.signIn(user.Email, user.Password, function (result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {


                if (result) {

                    $location.path('/Main');
                } else {

					$rootScope.ErrorMessage = "User or password invalid!";
                }

            });
        });
    };
    $scope.login = function()
    {
        //facebookService.login();
    };

});
