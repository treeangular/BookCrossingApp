'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location) {
	

	$scope.findBook = function () {
		if ($scope.book.isbn != null){
			//Mock data 1Q84 - Real ISBN = 0307957020 OR 9780307957023			
			$scope.book.title = "1Q84";
			$scope.book.Description = "Director:Haruki Murakami, Synopsis:The year is 1984. Aomame sits in a taxi on the expressway in Tokyo. Her work is not the kind which can be discussed in public but she is in a hurry to carry out an assignment and, with the traffic at a stand-still, the driver proposes a solution. She agrees, but as a result of her actions starts to feel increasingly detached from the real world.";
			$scope.book.image="styles/img/books/1q84.jpg";
		}
			
	};
	

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
