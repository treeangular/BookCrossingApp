'use strict';
BookCrossingApp.controller('HomeCtrl', function($scope) {
  $scope.images = [1];
  $scope.busy = false;

  $scope.nextPage  = function() {
    if ($scope.busy) return;
    $scope.busy = true;
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 3; i++) {
      $scope.images.push(last + i);
    }
	$scope.busy = false;
  };
});