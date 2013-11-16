'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope, dataService, $rootScope, $q, facebookService, geolocationService, cache) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"HuntBook");

    $scope.books = null;

    if(cache.getIsReleaseFirstTimeExecuted())
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var promise = cache.getCachedBooksFromRelease();
        cache.setIsReleaseFirstTimeExecuted(false);
            promise.then(function(books) {

                $rootScope.$broadcast(loadingRequestConst.Stop);
                $scope.books = books;

            }, function(reason)
            {
                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = ErrorConst.GenericError;

            });
    }
    else
    {
        $scope.books = cache.getCachedBooksFromRelease();
    }

    function huntBook(book)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.huntBook(book.registrationId,function(isSuccess,result)
        {
            $scope.$apply(function () {
                if(isSuccess)
                {
                    deferred.resolve(result);

                }
                else
                {
                    deferred.reject(result);

                }
                $rootScope.$broadcast(loadingRequestConst.Stop);

            });
        });

        return deferred.promise;
    }

    $scope.huntBook = function(book)
    {
        $scope.clicked=true;
        var promise = huntBook(book);
        var releasedAt;
        var bookHunted;
        promise.then(function(returnedBook) {

            bookHunted = returnedBook;
            $scope.setSelectedBook(returnedBook);
            return  geolocationService.getCurrentPositionPromise();

        }).then(function(geoLocationPoint){

            var geoPoint = {latitude:geoLocationPoint.coords.latitude, longitude:geoLocationPoint.coords.longitude};
            return geolocationService.getCityFromGeoPoint(geoPoint.latitude, geoPoint.longitude)

        }).then(function(city){

            facebookService.share('hunted',bookHunted.get("title"),bookHunted.get("image"), city);
            cache.restart();
            $scope.goTo('views/bookDetails.html');

        }, function(error){
            $scope.clicked=false;
            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = error;

        })
    }

    $scope.release = function (bookId) {
        //Go to releaseBook view
        $scope.setSelectedBook(bookId);
        $scope.goTo('views/releaseBook.html');
    };
});
