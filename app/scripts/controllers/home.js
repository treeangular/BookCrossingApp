'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope, $q, $http, $window, $location) {


    $scope.alerts = [];
    $scope.currentPage = 0;
    $scope.isLastPage = true;

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

  $scope.busy = false;

  $scope.nextPage  = function() {
    if ($scope.busy) return;

    $scope.busy = true;

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
      $scope.currentPage = $scope.currentPage + 1

	$scope.busy = false;
  };

});