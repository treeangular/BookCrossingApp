'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, DataService, $location) {
    $scope.registerNewUser = function (user) {

        DataService.registerNewUser(user, function (isResult, result) {

            $scope.$apply(function () {
                if (isResult)
                {
                    //$scope.registerResult = "Success";
                    $location.path('/SignUpDetails');
                }
                else
                {
                    //Show notification window with error!
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        });
    };
});
