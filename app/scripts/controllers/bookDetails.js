'use strict';
BookCrossingApp.controller('BookCtrl', function($scope,$rootScope, dataService) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"bookDetails.html");

    $scope.seeMoreOrLess = "See more";
    var book = $scope.selectedBook;
    console.log("book.bookStatus " + book.get("bookStatus").id);
    var bookStatus = book.get("bookStatus").id;

    //If it has been registered or hunted then can be released

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