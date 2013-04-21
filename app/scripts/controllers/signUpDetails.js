'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location) {

        $scope.updateUserProfile = function (user) {

            dataService.updateUserProfile(user, function (isResult, result) {

                $scope.$apply(function () {
                    if (isResult)
                    {
                        $location.path('/Main');
                    }
                    else
                    {
                        $scope.ErrorMessage = result.message;
                    }
                });
            });
        }

        //Initialize default value
        $scope.myPicture = "../styles/img/CustomAvatarContest.png";

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

});
