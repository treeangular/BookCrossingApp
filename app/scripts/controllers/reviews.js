BookCrossingApp.controller('ReviewsCtrl', function ($scope, $rootScope, dataService, $q) {

    var star = "styles/img/blankstar.png";
    var selectedStar = "styles/img/selectedstar.png";

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


    $scope.like  = function(reviewId) {
        //TODO: Update like in the database


    }

    $scope.unlike  = function(reviewId) {
        //TODO: Update Unlike in the database


    }

    $scope.nextPage  = function() {
        //TODO: Load Next Pages
    };
});
