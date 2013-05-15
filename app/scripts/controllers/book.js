'use strict';
BookCrossingApp.controller('BookCtrl', function($scope, dataService) {

    dataService.getBookById($scope.selectedBook, function (results) {
        $scope.$apply(function () {
            $scope.book = results[0];
        });
        }
    );

    $scope.releaseBook = function () {
        //Go to releaseBook view
        $scope.goTo('views/releaseBook.html');
    };

});