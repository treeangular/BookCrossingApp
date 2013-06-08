'use strict';

BookCrossingApp.controller('SignUpCtrl', function ($scope, dataService, $location, facebookService, $q, $rootScope) {

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
    function fbSignUp(user)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        return deferred.promise;

    }

    $scope.registerNewUser = function (user) {

        var promise = registerNewUser(user);
        promise.then(function(result) {

            $location.path('/SignUpDetails');

        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
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
                                $rootScope.TypeNotification = "errormessage";
                                $rootScope.MessageNotification = "User not connected";
                            }
                        });
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
