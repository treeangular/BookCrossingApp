'use strict';

BookCrossingApp.controller('RegisterBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope, cache) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"registerBook");

    $scope.book = $scope.foundBook;
    $scope.seeMoreOrLess = "See more";

    $scope.registerNewBook = function (book) {


         $scope.clicked=true;
         $rootScope.$broadcast(loadingRequestConst.Start);
         dataService.getBookRegistrationId(function (isResult, result) {
            // $scope.$apply(function () {
            // $scope.registrationCode = isResult;   //???
            //Without the registration Id we cannot let the book to be registered!
            if(isResult)
            {
                //Set book registraionID
                book.registrationId = result;

                //Save registartionId in parent scope (main) so I can get it in bookBarCode
                $scope.setRegisterId(result);

                //Save book data with registration Id
                dataService.registerBook(book, function (isResult, result) {
                    //How do I change to another view now?!!? Locate ??
                    $scope.$apply(function () {
                        //isSuccess = isResult ? true : false;
                        if (isResult)
                        {
                            //avocarrot.createStory('Registered', { name: 'Book Registration' }, "Another book on the way to be shared!");
                            cache.restart();
                            $scope.goTo('views/bookBarcode.html')

                        }
                        else
                        {
                            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                            $rootScope.MessageNotification = result;
                        }

                        $scope.clicked=false;
                        $rootScope.$broadcast(loadingRequestConst.Stop);
                    });
                });

            }
            else
            {
                //Set notification error => Pls try again an issue with the cool registration number has happened!
                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = result;
            }


        });

    };

    $scope.expand = function () {
        if ($scope.seeMoreOrLess == "See more"){
            $scope.seeMoreOrLess = "See less";
        }
        else {
            $scope.seeMoreOrLess = "See more";
        }
    };
});




