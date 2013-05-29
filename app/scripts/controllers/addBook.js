'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope) {
	

	$scope.findBook = function () {
		if ($scope.book.isbn != null)
        {

            isbnService.getGoogleBookInfo($scope.book.isbn, function(result){

                if(result!=null)
                {
                    if(result.title === undefined)
                    {
                        $rootScope.TypeNotification = "errormessage";
                        $rootScope.MessageNotification = "Ooops sorry, book not found..";
                    }
                    else
                    {
                        $scope.book.description = result.description;
                        $scope.book.image = result.image;
                        $scope.book.title= result.title;
                        $scope.book.authors = result.authors;
                        $scope.book.isbn = result.isbn;

                    }

                }
                else
                {
                    $rootScope.TypeNotification = "errormessage";
                    $rootScope.MessageNotification = "something went wrong";
                }
            });
		}
	};
	

    $scope.registerNewBook = function (book) {

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
                              //$location.path('/main');

                              $scope.goTo('views/bookBarcode.html')
                          }
                          else
                          {
                              // $scope.registerResult = "Fail!";
                              //$location.path('/');
                              $rootScope.TypeNotification = "errormessage";
                              $rootScope.MessageNotification = "Oops . . . Please try again ina  few seconds we couldn't register the book.";
                          }
                      });
                  });

              }
              else
              {
                //Set notification error => Pls try again an issue with the cool registration number has happened!
                  $rootScope.TypeNotification = "errormessage";
                  $rootScope.MessageNotification = "Oops . . .Please try again in a few seconds, the cool registration number generator has not been that cool! ";
              }
            //});
      });



    };


});
