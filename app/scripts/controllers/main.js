'use strict';

BookCrossingApp.controller('MainCtrl', function ($scope, dataService, geolocationService) {
    // Call the service and fetch the list of signatures that match the given petition ID
	$scope.title = 'BookCrossingApp';
	$scope.leftButtonName = null;
	$scope.rightButtonName = 'Map';
	/*$scope.subPage='views/home.html';*/
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
			case 'views/addZobc.html':
				$scope.title = 'Add OBCZ';
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
	
    dataService.getWholeActions(function (results) {
        $scope.$apply(function () {
            //if the object is complex 
            $scope.actionList = results;
            //Todo hev: try to understand 
            //$scope.actionList = results.models;
            /*
            geolocationService.getCurrentPosition(function (position) {
                alert('Latitude: '              + position.coords.latitude          + '\n' +
                    'Longitude: '             + position.coords.longitude         + '\n' +
                    'Altitude: '              + position.coords.altitude          + '\n' +
                    'Accuracy: '              + position.coords.accuracy          + '\n' +
                    'Altitude Accuracy: '     + position.coords.altitudeAccuracy  + '\n' +
                    'Heading: '               + position.coords.heading           + '\n' +
                    'Speed: '                 + position.coords.speed             + '\n' +
                    'Timestamp: '             + position.timestamp                + '\n');
            }); */

            console.log("Are we getting here more than once?!?");
        });
    });
});
