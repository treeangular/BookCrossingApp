'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, DataService, $location) {
    $scope.registerNewBook = function (book) {
        DataService.registerBook(book, function (isResult, result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                $scope.registerResult = isResult ? "Success" : result;
            });
            if (isResult) {
                //$scope.registerResult = "Success";
                $location.path('/main');
            }
            else {
                $scope.registerResult = "Fail!";
                //$location.path('/');
            }
        });
    };

    DataService.GetBookRegistrationId(function (isResult, result) {
        $scope.$apply(function () {
            $scope.registrationCode = isResult ? $scope.book = { RegistrationId: result } : "Error: Retriving New Book Code";


        });
    });
});
