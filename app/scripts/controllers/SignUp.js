'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, DataService, $location) {
    $scope.registerNewUser = function (user) {

        var isSuccess;

        DataService.registerNewUser(user, function (isResult, result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                isSuccess = isResult ? true : false;

                if (isSuccess)
                {
                    //$scope.registerResult = "Success";
                    $location.path('/SignUpDetails');
                }
                else
                {
                    //Show notification window with error!
                }
            });
        });

        console.log(isSuccess);


    };
});
