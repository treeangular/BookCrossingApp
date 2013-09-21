'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope, dataService, $rootScope, $q, facebookService, geolocationService) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"HuntBook");

    $scope.books = null;

    function shareFB(book, actionType)
    {
        var deferred = $q.defer();
        facebookService.share(actionType,book.title, function(isSuccess, result){
            if(!isSuccess)
            {
                deferred.reject(result);

            }
            else
            {
                deferred.resolve(result);
            }

        });
        return deferred.promise;

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

    function getBooksThatCanBeReleased()
    {
        var deferred = $q.defer();

        dataService.getBooksThatCanBeReleased(function (isSuccess, results) {
            $scope.$apply(function () {
                if(isSuccess)
                {

                    deferred.resolve(results);

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

          $scope.selectedBook.city = city;
          $scope.goTo('views/bookDetails.html');

        }, function(error){
            $scope.clicked=false;
            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = error;

        })
    }

    $rootScope.$broadcast(loadingRequestConst.Start);
    var promise = getBooksThatCanBeReleased();
    promise.then(function(books) {

        $scope.books = books

    }, function(reason) {

        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
        $rootScope.MessageNotification = reason;
    });

    $scope.release = function (bookId) {
        //Go to releaseBook view
        $scope.setSelectedBook(bookId);
        $scope.goTo('views/releaseBook.html');
    };
});
