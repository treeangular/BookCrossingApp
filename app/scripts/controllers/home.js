'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope, $q, $http, $window, $location, cache, geolocationService) {

    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"Home");

    $scope.currentPage = 0;
    $scope.alerts = [];
    $scope.alertsFilter = "world";

    //alert(navigator.globalization);
    if(cache.getIsHomeFirstTimeExecuted())
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var promise = cache.getCachedActions();
        cache.setIsHomeFirstTimeExecuted(false);
        promise.then(function(alerts) {

            $rootScope.$broadcast(loadingRequestConst.Stop);
            $scope.alerts = alerts;

        }, function(reason)
        {
            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = ErrorConst.GenericError;
            $rootScope.$broadcast(loadingRequestConst.Stop);

        });
        $scope.currentPage = 1;
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

    function getActPage(pageNumber, filter, geoPoint)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.getActionsForHomePage(pageNumber, filter, geoPoint, function (isSuccess,results) {
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
    $scope.newValue = function(alertsFilter) {

        var geoPoint;
        geolocationService.getCurrentPosition(function (position) {

            geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};
            
            alert(geoPoint.latitude);
            alert(geoPoint.longitude);

            var promise = getActPage($scope.currentPage, alertsFilter, geoPoint);
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


        });
    }




});