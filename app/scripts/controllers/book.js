'use strict';
BookCrossingApp.controller('BookCtrl', function($scope, dataService) {

    $scope.seeMoreOrLess = "See more";

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
            if (book.get('description')==null || book.get('description').length < 125)
                $scope.description = book.get('description');
            else
                $scope.description = book.get('description').substring(0, 120) + "...";

            $scope.expand = function () {
                if ($scope.seeMoreOrLess == "See more"){
                    $scope.seeMoreOrLess = "See less";
                    $scope.description = book.get('description');
                }
                else {
                    if (book.get('description')==null || book.get('description').length < 125)
                        $scope.description = book.get('description');
                    else
                        $scope.description = book.get('description').substring(0, 120) + "...";
                    $scope.seeMoreOrLess = "See more";
                }
            };
        });
        }
    );

});