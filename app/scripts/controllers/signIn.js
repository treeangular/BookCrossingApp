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

    $scope.fbSignIn = function()
    {
        dataService.fbSignIn(function(result, user)
        {

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
    };

});
