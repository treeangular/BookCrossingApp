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
        facebookService.login(function(result)
        {
            $scope.$apply(function () {

                if(result === 'connected')
                {
                    $location.path('/Main');
                }
                else
                {
                    $rootScope.ErrorMessage = "User has not accepted the conditions";
                }
            });
        });

    };
//    $rootScope.$on("fb_connected", function (event, args) {
//
//        FB.api('/me', function(response) {
//
//            alert(response.name + '\n' + response);  //response is the basic user object
//        });
//
//    });

});
