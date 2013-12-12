'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, dataService, $location, facebookService, $q, $rootScope) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"Sign Up");

    function registerNewUser(user)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.registerNewUser(user, function (isResult, result) {

            $scope.$apply(function () {
                if (isResult)
                {
                    deferred.resolve(result);

                }
                else
                {
                    deferred.reject(result);

                }
            });

        });

        return deferred.promise;

    }


    $scope.registerNewUser = function (user) {

        user.language = $rootScope.language;
        var promise = registerNewUser(user);
        promise.then(function(result) {

            $location.path('/SignUpDetails');

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
            alert("result true!");
            $scope.$apply(function () {
                if(result)
                {
                    alert("result true!");
                    if(user != null)
                    {
                        alert("user not null");
                        dataService.getUserByFbId(user.id, function(isSuccess, result){
                            if(isSuccess)
                            {
                                alert("success connecting");
                                if(result != null)
                                {
                                    alert("already registered");
                                    $location.path('/Main');
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
