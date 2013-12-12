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
        alert("signin in!");
        facebookService.login(function(result, user)
        {
            alert("inside login!");
            $scope.$apply(function () {
                if(result)
                {
                    alert("result true!");
                    if(user != null)
                    {
                        alert("user not null");
                        dataService.getUserByFbId(user.id, function(isSuccess, result){
                            $scope.$apply(function () {
                            if(isSuccess)
                            {
                                alert("success connecting");
                                if(result != null)
                                {

                                    alert("already registered");
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
                                    alert("not registered");
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
