'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope,DataService, $location) {

        $scope.updateUserProfile = function (user) {

            DataService.updateUserProfile(user, function (isResult, result) {

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
});
