'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope, $q) {

    $scope.alerts = [];
    $scope.currentPage = 0;

    if($rootScope.currentUser == undefined)
    {
        dataService.isCurrentUser(function (result, currentUser) {
            if (result) {
                $rootScope.currentUser = currentUser;
            }
        });
    }
    function getActPage(pageNumber)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.getActionsForHomePage(pageNumber, function (results) {
            $scope.$apply(function () {

                deferred.resolve(results);
                $rootScope.$broadcast(loadingRequestConst.Stop);
                // send notification a request has started


            });
        });
        return deferred.promise;
    }

  $scope.busy = false;

  $scope.nextPage  = function() {
    if ($scope.busy) return;
    $scope.busy = true;

      $rootScope.$broadcast(loadingRequestConst.Stop);
      var promise = getActPage($scope.currentPage);
      promise.then(function(alerts) {
          $scope.alerts = alerts;
          //alert($scope.alerts[0].get("book").get('title'));

      });
      $scope.currentPage = $scope.currentPage + 1

	$scope.busy = false;
  };

});