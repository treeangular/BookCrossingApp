'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location, isbnService) {
	

	$scope.findBook = function () {
		if ($scope.book.isbn != null)
        {

            isbnService.getGoogleBookInfo($scope.book.isbn, function(result){

                if(result!=null)
                {
                    $scope.book.description = result.description;
                    $scope.book.image = result.image;
                    $scope.book.title= result.title;
                    $scope.book.authors = result.authors;
                    $scope.book.isbn = result.isbn;

                }
                else
                {
                    $rootScope.ErrorMessage = "something went wrong";
                }


            });
		}
			
	};
	

    $scope.registerNewBook = function (book) {

      dataService.registerBook(book, function (isResult, result) {
            //How do I change to another view now?!!? Locate ??
            $scope.$apply(function () {
                //isSuccess = isResult ? true : false;

                if (isResult)
                {
                    //$location.path('/main');
					$scope.subviewchange('views/bookBarcode.html')
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
