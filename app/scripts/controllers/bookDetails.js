'use strict';
BookCrossingApp.controller('BookCtrl', function($scope, dataService) {


    $scope.seeMoreOrLess = "See more";
    var book = $scope.selectedBook;
    console.log("book.bookStatus " + book.get("bookStatus").id);
    var bookStatus = book.get("bookStatus").id;
    //If it has been registered or hunted then can be released
    book.isReleasable = bookStatus == BookStatusConst.Registered || bookStatus == BookStatusConst.Hunted;
    $scope.book = book;


    $scope.expand = function () {
        if ($scope.seeMoreOrLess == "See more"){
            $scope.seeMoreOrLess = "See less";
        }
        else {
            $scope.seeMoreOrLess = "See more";
        }
    };
});