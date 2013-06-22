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


    $scope.registerNewUser = function (user) {


        var promise = registerNewUser(user);
        promise.then(function(result) {

            $location.path('/SignUpDetails');

        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });

    };

});
