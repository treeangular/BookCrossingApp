'use strict';

BookCrossingApp.controller('MainCtrl', function ($scope) {
    // Call the service and fetch the list of signatures that match the given petition ID
	$scope.title = 'BookCrossingApp';
	$scope.leftButtonName = null;
	$scope.rightButtonName = 'Map';
	$scope.subPage='views/home.html';
	$scope.home='current flip';
	$scope.myLibrary='flip';
	$scope.settings='flip';
	$scope.addBook='flip';
	$scope.addZobc='flip';
	
	$scope.goTo = function(page)
    {
		switch(page)
		{
			case 'views/settings.html':
				$scope.title = 'Settings';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
                $scope.selectOption('settings');
				break;
			case 'views/addBook.html':
				$scope.title = 'Register Book';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
                $scope.selectOption('addBook');
				break;
			case 'views/bookBarcode.html':
				$scope.title = 'Register Book';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
                $scope.selectOption('addBook');
				break;
            case 'views/book.html':
                $scope.title = 'Book View';
                $scope.leftButtonName = "Back";
                $scope.leftButtonRef = "views/home.html";
                $scope.rightButtonName = null;
                $scope.selectOption('addBook');
                break;
            case 'views/releaseBook.html':
                $scope.title = 'Release Book';
                $scope.leftButtonRef = "views/book.html";
                $scope.rightButtonName = null;
                $scope.selectOption('addBook');
                break;
			case 'views/addZobc.html':
				$scope.title = 'Register OBCZ';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
                $scope.selectOption('addZobc');
				break;
			case 'views/Library.html':
				$scope.title = $scope.selectedUser + ' Library';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
                $scope.selectOption('myLibrary');
                page = 'views/myLibrary.html';
				break;
            case 'views/myLibrary.html':
                $scope.title = 'My Library';
                $scope.leftButtonName = null;
                $scope.rightButtonName = null;
                $scope.selectOption('myLibrary');
                $scope.selectedUser = null;
                break;
            case 'views/home.html':
				$scope.title = 'BookCrossingApp';
				$scope.leftButtonName = null;
				$scope.rightButtonName = 'Map';
                $scope.selectOption('home');
                $scope.selectedBook = '';
            default:
		}
		$scope.subPage = page;
    };

    $scope.selectOption = function (option) {
        $scope.home = 'flip';
        $scope.myLibrary = 'flip';
        $scope.settings = 'flip';
        $scope.addBook = 'flip';
        $scope.addZobc = 'flip';
        switch (option) {
            case 'home':
                $scope.home = 'current flip';
                break;
            case 'myLibrary':
                $scope.myLibrary = 'current flip';
                break;
            case 'settings':
                $scope.settings = 'current flip';
                break;
            case 'addBook':
                $scope.addBook = 'current flip';
                break;
            case 'addZobc':
                $scope.addZobc = 'current flip';
                break;
            default:
        }
    };

    $scope.selectBook  = function(bookId){
        $scope.selectedBook = bookId;
        $scope.goTo('views/book.html')
    };

    $scope.selectUser  = function(userId){
        $scope.selectedUser = userId;
        $scope.goTo('views/Library.html')
    };

    $scope.setRegisterId  = function(registrationId){
        $scope.registrationCode  = registrationId;
    }

});
