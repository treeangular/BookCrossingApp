'use strict';

BookCrossingApp.controller('MainCtrl', function ($scope) {
    // Call the service and fetch the list of signatures that match the given petition ID
	$scope.title = 'BookCrossingApp';
	$scope.leftButtonName = null;
	$scope.rightButtonName = 'Map';
    $scope.rightButtonRef = "views/map.html";
	$scope.subPage='views/home.html';
	$scope.home='current flip';
	$scope.myLibrary='flip';
	$scope.settings='flip';
	$scope.addBook='flip';
	$scope.huntBook='flip';
	
	$scope.goTo = function(page)
    {
		switch(page)
		{
            case 'views/reviewBook.html':
                $scope.title = 'Your Review';
                $scope.leftButtonName = null;
                $scope.rightButtonName = null;
                break;
            case 'views/reviews.html':
                $scope.title = 'Reviews';
                $scope.leftButtonName = "back";
                $scope.leftButtonRef = "views/bookDetails.html";
                $scope.rightButtonName = null;
                break;
            case 'views/comments.html':
                $scope.title = 'Comments';
                $scope.leftButtonName = "back";
                $scope.leftButtonRef = "views/bookDetails.html";
                $scope.rightButtonName = null;
                break;
            case 'views/mapTracking.html':
                $scope.title = 'Tracking';
                $scope.leftButtonName = "back";
                $scope.leftButtonRef = "views/bookDetails.html";
                $scope.rightButtonName = null;
                break;
            case 'views/huntBook.html':
                $scope.title = 'BookCrossing Action';
                $scope.leftButtonName = null;
                $scope.rightButtonName = null;
                $scope.selectOption('huntBook');
                break;
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
				break;
            case 'views/bookDetails.html':
                $scope.title = 'Detail';
                $scope.leftButtonName = "Back";
                $scope.leftButtonRef = "views/home.html";
                $scope.rightButtonName = null;
                break;
            case 'views/releaseBook.html':
                $scope.title = 'Release Book';
                $scope.leftButtonRef = "views/book.html";
                $scope.rightButtonName = null;
                break;
			case 'views/addZobc.html':
				$scope.title = 'Register OBCZ';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
				break;
			case 'views/Library.html':
				$scope.title = $scope.selectedUser.get('nick') + ' Library';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
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
                $scope.rightButtonRef = "views/map.html";
                $scope.selectOption('home');
                $scope.selectedBook = '';
                break;
            case 'views/map.html':
                $scope.title = 'BookCrossingApp';
                $scope.leftButtonName = null;
                $scope.rightButtonName = 'List';
                $scope.rightButtonRef = "views/home.html";
                $scope.selectedBook = '';
                break;
            default:
		}
		$scope.subPage = page;
    };

    $scope.selectOption = function (option) {
        $scope.home = 'flip';
        $scope.myLibrary = 'flip';
        $scope.settings = 'flip';
        $scope.addBook = 'flip';
        $scope.huntBook = 'flip';

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
            case 'huntBook':
                $scope.huntBook = 'current flip';
                break;
            default:
        }
    };

    $scope.selectBook  = function(book){
        $scope.selectedBook = book;
        $scope.goTo('views/bookDetails.html')
    };

    $scope.selectUser  = function(user){
        $scope.selectedUser = user;
        $scope.goTo('views/Library.html')
    };

    $scope.setRegisterId  = function(registrationId){
        $scope.registrationCode  = registrationId;
    }

    $scope.setSelectedBook  = function(book){
        $scope.selectedBook = book;
    };
});
