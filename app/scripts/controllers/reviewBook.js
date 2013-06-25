BookCrossingApp.controller('ReviewsBookCtrl', function ($scope, $rootScope, dataService) {
  $scope.review = {
      rate:0,
      content: ""
  }

  $scope.sendReview = function () {
    //TODO: Save review (rate + content)
    $scope.goTo('views/bookDetails.html');
  }

});