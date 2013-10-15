'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope, $q, $http, $window, $location, cache) {

    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"Home");

    $scope.currentPage = 0;


    if(cache.getIsHomeFirstTimeExecuted())
    {
        $scope.isLastPage = true;
        $scope.busy = false;
        if ($scope.busy) return;

        $scope.busy = true;
        var promise = getActPage(0);
        promise.then(function(alerts) {

            $scope.alerts = [];
            if (alerts.length == 10) $scope.isLastPage = false;
            else $scope.isLastPage = true;
            for(var i = 0; i <= alerts.length-1; i++) {
                $scope.alerts.push(alerts[i]);
            }


        }, function(reason) {


            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });


        $scope.currentPage = 1;
        $scope.alerts = cache.getCachedActions();
        cache.setIsHomeFirstTimeExecuted(false);

    }
    else
    {
        $scope.currentPage = 1;
        $scope.alerts = cache.getCachedActions();
    }


    if($rootScope.currentUser == undefined)
    {

        dataService.isCurrentUser(function (result, currentUser) {
                if (result) {
                    $rootScope.currentUser = currentUser;

                }
                else
                {
                    $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                    $rootScope.MessageNotification = ErrorConst.UserLoginError;
                }
            });

    }
    function getActPage(pageNumber)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.getActionsForHomePage(pageNumber, function (isSuccess,results) {
            $scope.$apply(function () {

                if(isSuccess)
                {
                    deferred.resolve(results);

                    // send notification a request has started
                }
                else
                {
                    deferred.reject(results);
                }


                $rootScope.$broadcast(loadingRequestConst.Stop);
            });
        });
        return deferred.promise;
    }

    $scope.nextPage  = function() {

        var promise = getActPage($scope.currentPage);
        promise.then(function(alerts) {

            if (alerts.length == 10) $scope.isLastPage = false;
            else $scope.isLastPage = true;

            for(var i = 0; i <= alerts.length-1; i++) {
                $scope.alerts.push(alerts[i]);
            }

        }, function(reason) {


            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });
        $scope.currentPage++;

        $scope.busy = false;
    };


});