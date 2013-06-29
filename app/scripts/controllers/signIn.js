'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, dataService, $location, facebookService, $rootScope, $q) {


    function signInUser(email, password)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.signIn(email, password, function (result) {
            //How do I change to another view now?!!? Locate ??
            $scope.$apply(function () {
                if (result) {

                    deferred.resolve(result);

                } else {

                    deferred.reject(result);

                }

            });
        });


        return deferred.promise;

    }

    $scope.signInUser = function (user) {


        var promise = signInUser(user.Email, user.Password)
        promise.then(function() {

            $location.path('/Main');

        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });


    };

    $scope.fbSignIn = function()
    {

        facebookService.login(function(result, user)
        {
            $scope.$apply(function () {
                if(result)
                {
                    if(user != null)
                    {
                        dataService.getUserByFbId(user.id, function(isSuccess, result){
                            if(isSuccess)
                            {
                                if(result != null)
                                {
                                    $location.path('/Main');
                                }
                                else
                                {
                                    alert(user.name);
                                    dataService.registerNewUserFromFB(result, function(isSuccess, result)
                                    {
                                       if(isSuccess)
                                       {
                                           $location.path('/Main');
                                       }
                                        else
                                       {
                                           $rootScope.TypeNotification = "errormessage";
                                           $rootScope.MessageNotification = result;
                                       }

                                    });

                                }
                            }
                            else
                            {
                                $rootScope.TypeNotification = "errormessage";
                                $rootScope.MessageNotification = result;
                            }

                        })

                    }
                    else
                    {
                        alert("mal!");
//                        facebookService.getUserInfo(function(result){
//
//                            if(result != null)
//                            {
//                                dataService.updateUserProfileFromFb(result, function(response){
//                                    //TODO hev: manage errors;
//
//                                    $location.path('/Main');
//                                });
//                            }
//                            else
//                            {
//                                $rootScope.TypeNotification = "errormessage";
//                                $rootScope.MessageNotification = "User not connected";
//                            }
//                        });
                    }
                }
                else
                {
                    $rootScope.TypeNotification = "errormessage";
                    $rootScope.MessageNotification = "User has not accepted the conditions";
                }


         });
        });
    };

});
