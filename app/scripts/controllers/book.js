'use strict';
BookCrossingApp.controller('BookCtrl', function($scope, dataService) {

    dataService.getBookById($scope.selectedBook, function (results) {
        $scope.$apply(function () {
            $scope.book = results[0];
        });
        }
    );

});