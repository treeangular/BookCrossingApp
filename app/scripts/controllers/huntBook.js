'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope, dataService, $rootScope, $q) {
    $scope.books = null;

    function huntBook(book)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.huntBook(book.registrationId,function(isSuccess,book)
        {
            $scope.$apply(function () {
                if(isSuccess)
                {
                    deferred.resolve(book);
                }
                else
                {
                    deferred.reject();
                    $rootScope.TypeNotification = "errormessage";
                    $rootScope.MessageNotification = "something went wrong";
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
                    deferred.reject();
                    $rootScope.TypeNotification = "errormessage";
                    $rootScope.MessageNotification = "Oops . . . Error getting your books to release.";
                }
                $rootScope.$broadcast(loadingRequestConst.Stop);
            });
        });

        return deferred.promise;

    }

    $scope.huntBook = function(book)
    {
        var promise = huntBook(book);
        promise.then(function(returnedBook) {
            $scope.setSelectedBook(returnedBook);
            $scope.goTo('views/bookDetails.html');
        });
    }

    $rootScope.$broadcast(loadingRequestConst.Start);
    var promise = getBooksThatCanBeReleased();
    promise.then(function(books) {

        $scope.books = books

    });

    $scope.release = function (bookId) {
        //Go to releaseBook view
        $scope.setSelectedBook(bookId);
        $scope.goTo('views/releaseBook.html');
    };
});
