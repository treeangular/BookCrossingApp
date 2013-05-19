'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope,dataService,$rootScope) {
    $scope.huntBook = function (book) {
        //$scope.$apply(function () {
                dataService.huntBook(book.registrationId,function(isSuccess,bookId)
                {
                    if(isSuccess)
                    {
                        //$rootScope.
                        $scope.selectedBook = bookId;
                        $scope.goTo('views/book.html');
                    }
                    else
                    {
                        $rootScope.ErrorMessage = "Oops . . . Please try to hunt it again in a few seconds.";
                    }
                });
        //});
    };
});
