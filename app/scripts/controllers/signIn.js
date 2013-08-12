'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, dataService, $location, facebookService, $rootScope, $q) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"Sign In");

    function signInUser(email, password)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.signIn(email, password, function (isSuccess, result) {
            //How do I change to another view now?!!? Locate ??
            $scope.$apply(function () {
                if (isSuccess) {

                    deferred.resolve(result);

                } else {

                    deferred.reject(result);

                }

            });
        });

        return deferred.promise;
    }

    $scope.signInUser = function (user) {

        if($rootScope.gaPlugIn !== undefined)
            $rootScope.gaPlugIn.trackEvent(function(){}, function(){alert("Error")}, "Button", "Click", "Sign In", 1);

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
        $rootScope.gaPlugIn.trackEvent(function(){}, function(){alert("Error")}, "Button", "Click", "Sign In Fb", 1);

        facebookService.login(function(result, user)
        {
            $scope.$apply(function () {
                if(result)
                {
                    if(user != null)
                    {
                        dataService.getUserByFbId(user.id, function(isSuccess, result){
                            $scope.$apply(function () {
                            if(isSuccess)
                            {
                                if(result != null)
                                {

                                    var promise = signInUser(result.get("email"), "123456")
                                    promise.then(function() {

                                        $location.path('/Main');

                                    }, function(reason) {

                                        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                                        $rootScope.MessageNotification = reason;
                                    });

                                }
                                else
                                {


                                    user.language = $rootScope.language;
                                    dataService.registerNewUserFromFB(user, function(isSuccess, result2)
                                    {
                                        $scope.$apply(function () {
                                           if(isSuccess)
                                           {


                                               $location.path('/Main');
                                           }
                                            else
                                           {

                                               $rootScope.TypeNotification = "errormessage";
                                               $rootScope.MessageNotification = result2;
                                           }
                                        });

                                    });

                                }
                            }
                            else
                            {
                                $rootScope.TypeNotification = "errormessage";
                                $rootScope.MessageNotification = result;
                            }
                            });

                        })

                    }
                    else
                    {
                        $rootScope.TypeNotification = "errormessage";
                        $rootScope.MessageNotification = result;
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
