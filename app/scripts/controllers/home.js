'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope, $q, localStorageService) {

    $scope.alerts = [];
    $scope.currentPage = 0;

    if($rootScope.currentUser == undefined)
    {
        dataService.isCurrentUser(function (result, currentUser) {
            if (result) {
                $rootScope.currentUser = currentUser;
            }
        });
        localStorageService.createActionTable(function(result){

                alert(result);


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
          $scope.alerts = alerts;
          //alert($scope.alerts[0].get("book").get('title'));

      }, function(reason) {

          $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
          $rootScope.MessageNotification = reason;
      });
      $scope.currentPage = $scope.currentPage + 1

	$scope.busy = false;
  };

});