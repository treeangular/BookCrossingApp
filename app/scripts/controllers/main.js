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
	
	$scope.subviewchange = function(page)
    {
		switch(page)
		{
			case 'views/settings.html':
				$scope.title = 'Settings';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
				$scope.home='flip';
				$scope.myLibrary='flip';
				$scope.settings='current flip';
				$scope.addBook='flip';
				$scope.addZobc='flip';
				break;
			case 'views/addBook.html':
				$scope.title = 'Register Book';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null
				$scope.home='flip';
				$scope.myLibrary='flip';
				$scope.settings='flip';
				$scope.addBook='current flip';
				$scope.addZobc='flip';
				break;
			case 'views/bookBarcode.html':
				$scope.title = 'Register Book';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null
				$scope.home='flip';
				$scope.myLibrary='flip';
				$scope.settings='flip';
				$scope.addBook='current flip';
				$scope.addZobc='flip';
				break;				
			case 'views/addZobc.html':
				$scope.title = 'Register OBCZ';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null
				$scope.home='flip';
				$scope.myLibrary='flip';
				$scope.settings='flip';
				$scope.addBook='flip';
				$scope.addZobc='current flip';
				break;
			case 'views/myLibrary.html':
				$scope.title = 'My Library';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null
				$scope.home='flip';
				$scope.myLibrary='current flip';
				$scope.settings='flip';
				$scope.addBook='flip';
				$scope.addZobc='flip';
				break;				
			default:				
				$scope.title = 'BookCrossingApp';			
				$scope.leftButtonName = null;
				$scope.rightButtonName = 'Map';
				$scope.subPage='views/home.html';
				$scope.home='current flip';
				$scope.myLibrary='flip';
				$scope.settings='flip';
				$scope.addBook='flip';
				$scope.addZobc='flip';
		}
		$scope.subPage = page;
    };
    
});
