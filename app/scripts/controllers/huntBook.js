'use strict';

BookCrossingApp.controller('HuntBookCtrl', function ($scope,dataService,$rootScope) {
    $scope.huntBook = function (book) {

                dataService.huntBook(book.registrationId,function(isSuccess)
                {
                    if(isSuccess)
                    {
                        //$rootScope.
                        $scope.goTo('views/book.html');
                    }
                    else
                    {
                        $rootScope.ErrorMessage = "Oops . . . Please try to hunt it again in a few seconds.";
                    }
                });
    };
});
