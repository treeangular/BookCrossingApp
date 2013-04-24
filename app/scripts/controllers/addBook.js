'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location) {
    $scope.registerNewBook = function (book) {

      dataService.registerBook(book, function (isResult, result) {
            //How do I change to another view now?!!? Locate ??
            $scope.$apply(function () {
                //isSuccess = isResult ? true : false;

                if (isResult)
                {
                    $location.path('/main');
                }
                else
                {
                   // $scope.registerResult = "Fail!";
                    //$location.path('/');
                }
            });
        });
        //console.log(isSuccess);
    };

    dataService.getBookRegistrationId(function (isResult, result) {
        $scope.$apply(function () {
            $scope.registrationCode = isResult ? $scope.book = { RegistrationId: result } : "Error: Retriving New Book Code";


        });
    });
});
