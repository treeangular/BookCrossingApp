'use strict';
BookCrossingApp.controller('BookCtrl', function($scope, dataService) {

    dataService.getBookById($scope.selectedBook, function (results) {
        $scope.$apply(function () {
            var book = results[0];
            console.log("book.bookStatus " + book.get("bookStatus").id);
            var bookStatus = book.get("bookStatus").id;
            //If it has been registered or hunted then can be released
            if(bookStatus == "wXbJK5Sljm" || bookStatus == "LeIWbPd5vA")
            {
                console.log("book.bookStatus " + book.bookStatus);
                book.isReleasable = true;
            }
            else
            {
                book.isReleasable = false;
            }

            $scope.book = book;
        });
        }
    );

    $scope.releaseBook = function () {
        //Go to releaseBook view
        $scope.goTo('views/releaseBook.html');
    };
});