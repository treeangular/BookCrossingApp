BookCrossingApp.controller('ReviewsCtrl', function ($scope, $rootScope, dataService, $q) {

    $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"reviews.html");

    var star = "styles/img/blankstar.png";
    var selectedStar = "styles/img/selectedstar.png";

    $scope.reviewLikes = [];

    function like(reviewId, isLike)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.addOrUpdateLikeUnLikeToReview($scope.selectedBook, reviewId, isLike, function (isSuccess, results) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(results);
                }
                else
                {
                    deferred.reject(results);
                }
            });

        });

        return deferred.promise;
    }
    function getReviewLikeByUser(userId, bookId)
    {

        var deferred = $q.defer();
        dataService.getReviewLike(userId, bookId, function (isSuccess, results) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(results);
                }
                else
                {
                    deferred.reject();
                }
            });

        });

        return deferred.promise;
    }

    function getReviews(bookId)
    {

        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.getReviewsFromBookId(bookId, function (isSuccess, results) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(results);
                }
                else
                {
                    deferred.reject();
                }
            });

        });

        return deferred.promise;

    }

    var promise = getReviews($scope.selectedBook.id)
    promise.then(function(bookReviews) {
        $scope.reviews = bookReviews;
        $rootScope.$broadcast(loadingRequestConst.Stop);
    }, function(reason) {

        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
        $rootScope.MessageNotification = reason;
    });

    promise = getReviewLikeByUser($rootScope.currentUser.id, $scope.selectedBook.id)
    promise.then(function(reviewLikes) {
        $scope.reviewLikes = reviewLikes;
        $rootScope.$broadcast(loadingRequestConst.Stop);
    }, function(reason) {

        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
        $rootScope.MessageNotification = reason;
    });

    $scope.isLike  = function(reviewId) {
      var filterednames = $scope.reviewLikes.filter(function(obj) {
            return (obj.get('review').id === reviewId  && (obj.get('isLike') == true));
      });

      if (filterednames.length > 0)
        return true;
      else
        return false;
    }

    $scope.isUnlike  = function(reviewId) {

        var filterednames = $scope.reviewLikes.filter(function(obj) {
            return (obj.get('review').id === reviewId  && (obj.get('isLike') == false));
        });

        if (filterednames.length > 0)
            return true;
        else
            return false;
    }


    $scope.like  = function(review, isLike) {

        var promise = like(review.id, isLike)
        if(isLike)
        {
            review.increment("likeCount");
        }
        else
        {
            review.increment("unLikeCount");
        }

        promise.then(function(reviewLike) {

            promise = getReviewLikeByUser($rootScope.currentUser.id, $scope.selectedBook.id)
            promise.then(function(reviewLikes) {
                $scope.reviewLikes = reviewLikes;
                $rootScope.$broadcast(loadingRequestConst.Stop);
            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;
            });

            $rootScope.$broadcast(loadingRequestConst.Stop);
            $scope.clicked = false;

        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });


    }

    $scope.nextPage  = function() {
        //TODO: Load Next Pages
    };
});
