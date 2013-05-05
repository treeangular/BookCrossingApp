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
    $scope.fbSignUp = function()
    {
        dataService.fbSignIn(function(result, user)
        {
            $scope.$apply(function () {
                if(result)
                {
                    if(user != null)
                    {
                        $location.path('/Main');
                    }
                    else
                    {
                        facebookService.getUserInfo(function(result){

                            if(result != null)
                            {
                                dataService.updateUserProfileFromFb(result, function(response){
                                    //TODO hev: manage errors;

                                    $location.path('/Main');
                                });
                            }
                            else
                            {
                                $rootScope.ErrorMessage = "User not connected";
                            }
                        });
                    }
                }
                else
                {
                    $rootScope.ErrorMessage = "User has not accepted the conditions";
                }


            });
        });
    };
});
