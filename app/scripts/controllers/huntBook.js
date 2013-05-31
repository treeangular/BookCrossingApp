'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope,dataService,$rootScope) {
    $scope.books = null;
    $scope.huntBook = function (book) {
        //$scope.$apply(function () {
                dataService.huntBook(book.registrationId,function(isSuccess,bookId)
                {
                    $scope.$apply(function () {
                        if(isSuccess)
                        {
                            //$rootScope.
                            $scope.setSelectedBook(bookId);
                            $scope.goTo('views/book.html');
                        }
                        else
                        {
                            $rootScope.TypeNotification = "errormessage";
                            $rootScope.MessageNotification = "something went wrong";
                        }
                    });
                });
        //});
    };

    dataService.getBooksThatCanBeReleased(function (isSuccess, results) {
        if(isSuccess)
        {
            $scope.$apply(function () {
                $scope.books = results
            });
        }
        else
        {
            $rootScope.ErrorMessage = "Oops . . . Error getting your books to release.";
        }
    });


    $scope.release = function (bookId) {
        //Go to releaseBook view
        $scope.setSelectedBook(bookId);
        $scope.goTo('views/releaseBook.html');
    };
});
