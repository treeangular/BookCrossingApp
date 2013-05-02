'use strict';

BookCrossingApp.controller('BookBarcodeCtrl', function ($scope, dataService, $location) {
	
    dataService.getBookRegistrationId(function (isResult, result) {
        $scope.$apply(function () {
            $scope.registrationCode = result;
        });
    });
});
