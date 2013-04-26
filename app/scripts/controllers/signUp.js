'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, dataService, $location, facebookService) {
    $scope.registerNewUser = function (user) {

        dataService.registerNewUser(user, function (isResult, result) {

            $scope.$apply(function () {
                if (isResult)
                {
                    $location.path('/SignUpDetails');
                }
                else
                {
                    $scope.ErrorMessage = result.message;
                }
            });

        });
    };

    $scope.registerWithFacebook = function(){

        dataService.fbSignUp(function(result)
        {
            $scope.$apply(function () {

            });
        });

    };
});
