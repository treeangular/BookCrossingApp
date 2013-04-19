'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, DataService, $location) {
    $scope.registerNewUser = function (user) {

        DataService.registerNewUser(user, function (isResult, result) {

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
});
