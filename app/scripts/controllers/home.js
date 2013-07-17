'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope, $q, $location) {


    function errorHandler(e) {
        //Lame - do nothing
        alert(e.toString());
    }

    
    $scope.alerts = [];
    $scope.currentPage = 0;
    $scope.isLastPage = true;

    if($rootScope.currentUser == undefined)
    {
        dataService.isCurrentUser(function (result, currentUser) {
            if (result) {
                $rootScope.currentUser = currentUser;

            }
        });
//        localStorageService.createActionTable(function(result){
//
//                alert(result);
//
//
//        });
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
    $rootScope.$broadcast(loadingRequestConst.Start);
    $scope.busy = true;

      var promise = getActPage($scope.currentPage);
      promise.then(function(alerts) {

          if (alerts.length == 10) $scope.isLastPage = false;
          else $scope.isLastPage = true;

          for(var i = 0; i <= alerts.length-1; i++) {
            $scope.alerts.push(alerts[i]);
          }

          $rootScope.$broadcast(loadingRequestConst.Stop);

      }, function(reason) {

          $rootScope.$broadcast(loadingRequestConst.Stop);
          $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
          $rootScope.MessageNotification = reason;
      });
      $scope.currentPage = $scope.currentPage + 1

	$scope.busy = false;
  };

});