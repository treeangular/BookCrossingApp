BookCrossingApp.controller('ReviewsBookCtrl', function ($scope, $rootScope, dataService, $q, facebookService) {
    if($rootScope.gaPlugIn !== undefined)
    {
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"Review Book");
    }
    $scope.review = {
      rating:0,
      reviewText: ""
  }

    function saveReview(review)
    {

        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        review.book = $scope.selectedBook;
        dataService.addReviewToBook(review, function (isSuccess, result) {

            $scope.$apply(function(){
                if(isSuccess)
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

  $scope.sendReview = function (review) {

      $rootScope.gaPlugIn.trackEvent(function(){}, function(){alert("Error")}, "Button", "Click", "Send Review", 1);

      $scope.clicked = true;
      var promise = saveReview(review)
      promise.then(function(review) {

          $rootScope.$broadcast(loadingRequestConst.Stop);
          $scope.clicked = false;
          $scope.setSelectedBook($scope.selectedBook);
          $scope.goTo('views/bookDetails.html');
      }, function(reason) {

          $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
          $rootScope.MessageNotification = reason;
      });


  }

});