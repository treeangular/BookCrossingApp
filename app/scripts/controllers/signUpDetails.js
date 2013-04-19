'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope) {

        $scope.updateUserProfile = function (user) {

            DataService.updateUserProfile(user, function (isResult, result) {

                $scope.$apply(function () {
                    if (isResult)
                    {
                        //$scope.registerResult = "Success";
                        $location.path('/Main');
                    }
                    else
                    {
                        //Show notification window with error!
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });
            });
        }
});
