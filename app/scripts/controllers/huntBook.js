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


    //Release a book
    $scope.books = [
        {id:"3213213", title:"A Clockwork Orange", image:"styles/img/books/a_clockwork_orange.jpg"},
        {id:"3213212", title:"Lord of the rings", image:"styles/img/books/lord_of_the_rings.jpg "}
    ];

    $scope.release = function (bookId) {
        //Go to releaseBook view
        $scope.selectedBook = bookId;
        $scope.goTo('views/releaseBook.html');
    };
});
