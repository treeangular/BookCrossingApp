'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope, dataService, $rootScope, $q, facebookService, geolocationService) {

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
        $rootScope.gaPlugIn.trackEvent(function(){}, function(){}, "Button", "Click", "Hunt Book", 1);

        $scope.clicked=true;
        var promise = huntBook(book);
        promise.then(function(returnedBook) {
            $scope.setSelectedBook(returnedBook);

            var promise2 = geolocationService.getCityFromGeopoint(returnedBook.get("releasedAt")._latitude, returnedBook.get("releasedAt")._longitude)
            promise2.then(function(city){
            if(typeof(FB) != 'undefined')
            {
                facebookService.share('hunted',returnedBook.get("title"),returnedBook.get("image"), city, function(isSuccess, result){
                    if(!isSuccess)
                    {
                        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                        $rootScope.MessageNotification = result;
                    }

                });
            }
                $scope.goTo('views/bookDetails.html');
            }, function(error){

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = error;

            })

        }, function(reason) {

            $scope.clicked=false;
            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });
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
