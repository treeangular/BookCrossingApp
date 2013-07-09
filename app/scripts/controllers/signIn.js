'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, dataService, $location, facebookService, $rootScope, $q) {


    function getLanguage()
    {
        navigator.globalization.getPreferredLanguage(
            function (language) {alert('language: ' + language.value + '\n');},
            function () {alert('Error getting language\n');}
        );
    }
    function signInUser(email, password)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        getLanguage();
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
