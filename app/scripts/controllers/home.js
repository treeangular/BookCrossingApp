'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope, dataService, $rootScope, $q, $location, $window) {


    function errorHandler(e) {
        //Lame - do nothing
        alert(e.toString());
    }

    $scope.$on('$viewContentLoaded', function(event) {

        if (typeof $window.plugins != 'undefined')
        {
            $window.plugins.gaPlugin.init(function() {

                alert("gaPlugin inted")

            }, errorHandler, "UA-42503133-1", 10);


            alert("index tracked!!");
            // Call the service and fetch the list of signatures that match the given petition ID
            $window.plugins.gaPlugin.trackPage( function() {

                console.log("Main Tracked!!");

            }, errorHandler, $location.path());
        }
        else
        {
            alert("undefined");

        }

    });


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