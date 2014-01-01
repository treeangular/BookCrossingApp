'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, dataService, $location, facebookService, $rootScope, $q) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"Sign In");

    function signInUser(email, password)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.signIn(email, password, function (isSuccess, result) {

                if (isSuccess) {
                    $rootScope.$apply(function () {
                    deferred.resolve(result);
                    });

                } else {
                    $rootScope.$apply(function () {
                    deferred.reject(result);
                    });
                }

            });

        return deferred.promise;
    }

    $scope.signInUser = function (user) {

        var promise = signInUser(user.Email, user.Password);
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
                    alert("Hola!!");
                    var promise = dataService.fbParseLogin(user);
                    promise.then(function(userRegistered){

                        return signInUser(userRegistered.get("email"), userRegistered.get("fbId"));

                    }).then(function(){

                        $location.path('/Main');

                    }, function(error){

                        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                        $rootScope.MessageNotification = error;
                    });
                }
                else
                {
                    $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                    $rootScope.MessageNotification = user;
                }
            });
        });
    };

});
