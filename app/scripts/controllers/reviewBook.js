BookCrossingApp.controller('ReviewsBookCtrl', function ($scope, $rootScope, dataService, $q, facebookService) {
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

      $scope.clicked = true;
      var promise = saveReview(review)
      promise.then(function(review) {

          $rootScope.$broadcast(loadingRequestConst.Stop);
          $scope.clicked = false;
          $scope.setSelectedBook($scope.selectedBook);

          facebookService.share('review',$scope.selectedBook.title,$scope.selectedBook.image, $scope.selectedBook.releasedAt, function(isSuccess, result){
              if(!isSuccess)
              {
                  $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                  $rootScope.MessageNotification = result;
              }

          });

          $scope.goTo('views/bookDetails.html');
      }, function(reason) {

          $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
          $rootScope.MessageNotification = reason;
      });


  }

});