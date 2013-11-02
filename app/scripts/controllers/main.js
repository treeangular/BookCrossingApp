'use strict';

BookCrossingApp.controller('MainCtrl', function ($scope, $location, isbnService, $rootScope, $q, localize) {


    $scope.title = 'BookCrossingApp';
	$scope.leftButtonName = null;
	$scope.rightButtonName = localize.getLocalizedString('_Map_');
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
                $scope.title = localize.getLocalizedString('_YourReview_');
                $scope.leftButtonName = null;
                $scope.rightButtonName = null;
                break;
            case 'views/bookPosition.html':
                $scope.title = 'Position';
                $scope.leftButtonName = localize.getLocalizedString('_Back_');
                $scope.leftButtonRef = "views/bookDetails.html";
                $scope.rightButtonName = null;
                break;
            case 'views/reviews.html':
                $scope.title = localize.getLocalizedString('_Reviews_');
                $scope.leftButtonName = localize.getLocalizedString('_Back_');
                $scope.leftButtonRef = "views/bookDetails.html";
                $scope.rightButtonName = null;
                break;
            case 'views/comments.html':
                $scope.title = localize.getLocalizedString('_Comments_');
                $scope.leftButtonName = localize.getLocalizedString('_Back_');
                $scope.leftButtonRef = "views/bookDetails.html";
                $scope.rightButtonName = null;
                break;
            case 'views/mapTracking.html':
                $scope.title = localize.getLocalizedString('_Tracking_');
                $scope.leftButtonName = localize.getLocalizedString('_Back_');
                $scope.leftButtonRef = "views/bookDetails.html";
                $scope.rightButtonName = null;
                break;
            case 'views/huntBook.html':
                $scope.title = localize.getLocalizedString('_BookCrossingAction_');
                $scope.leftButtonName = null;
                $scope.rightButtonName = null;
                $scope.selectOption('huntBook');
                break;
			case 'views/settings.html':
				$scope.title = localize.getLocalizedString('_Settings_');
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
                $scope.selectOption('settings');
				break;
			case 'views/addBook.html':
				$scope.title = localize.getLocalizedString('_RegisterBook_');
				$scope.leftButtonName = null;
				$scope.rightButtonName = localize.getLocalizedString('_Scan_');
                $scope.rightButtonRef = "views/addBook.html?scan=true";
                $scope.selectOption('addBook');
				break;
            case 'views/registerBook.html':
                $scope.title = localize.getLocalizedString('_RegisterBook_');
                $scope.leftButtonName = localize.getLocalizedString('_Back_');
                $scope.leftButtonRef = "views/addBook.html";
                $scope.rightButtonName = null;
                break;
            case 'views/addBook.html?scan=true':
                $scope.scanBook();
                return;
			case 'views/bookBarcode.html':
				$scope.title = localize.getLocalizedString('_RegisterBook_');
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
				break;
            case 'views/bookDetails.html':
                $scope.title = localize.getLocalizedString('_Detail_');
                $scope.leftButtonName = localize.getLocalizedString('_Back_');
                $scope.leftButtonRef = "views/home.html";
                $scope.rightButtonName = null;
                break;
            case 'views/releaseBook.html':
                $scope.title = localize.getLocalizedString('_ReleaseABook_');
                $scope.leftButtonRef = "views/book.html";
                $scope.rightButtonName = null;
                break;
			case 'views/addZobc.html':
				$scope.title = 'Register OBCZ';
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
				break;
			case 'views/Library.html':
				$scope.title = $scope.selectedUser.get('nick') +' '+localize.getLocalizedString('_Library_');
				$scope.leftButtonName = null;
				$scope.rightButtonName = null;
                page = 'views/myLibrary.html';
				break;
            case 'views/myLibrary.html':
                $scope.title = localize.getLocalizedString('_MyLibrary_');
                $scope.leftButtonName = null;
                $scope.rightButtonName = null;
                $scope.selectOption('myLibrary');
                $scope.selectedUser = null;
                break;
            case 'views/home.html':
				$scope.title = 'BookCrossingApp';
				$scope.leftButtonName = null;
				$scope.rightButtonName = localize.getLocalizedString('_Map_');
                $scope.rightButtonRef = "views/map.html";
                $scope.selectOption('home');
                $scope.selectedBook = '';
                break;
            case 'views/map.html':
                $scope.title = 'BookCrossingApp';
                $scope.leftButtonName = null;
                $scope.rightButtonName = localize.getLocalizedString('_List_');
                $scope.rightButtonRef = "views/home.html";
                $scope.selectedBook = '';
                break;
            case 'views/suggestion.html':
                $scope.title = localize.getLocalizedString('_Suggestion_');
                $scope.leftButtonName = localize.getLocalizedString('_Back_');
                $scope.rightButtonName = null;
                $scope.leftButtonRef = "views/settings.html";
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

    $scope.setFoundBook  = function(book){
        $scope.foundBook = book;
    };

    $scope.scanBook = function () {
        {
            console.log('scanning');
            try {

                var scanner = cordova.require("cordova/plugin/BarcodeScanner");

                scanner.scan(
                    function (result) {
                        /*alert("We got a barcode\n" +
                         "Result: " + result.text + "\n" +
                         "Format: " + result.format + "\n" +
                         "Cancelled: " + result.cancelled);*/

                        $scope.$apply(function () {
                            if (result.text != null)
                            {
                                $rootScope.$broadcast(loadingRequestConst.Start);
                                var promise = findBook(result.text)
                                promise.then(function(results) {
                                    if (results.lenght==0)
                                    {
                                        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                                        $rootScope.MessageNotification = "Book not found!";
                                        $rootScope.$broadcast(loadingRequestConst.Stop);
                                    }
                                    else{
                                        $rootScope.$broadcast(loadingRequestConst.Stop);
                                        $scope.setFoundBook(results[0]);
                                        $scope.goTo("views/registerBook.html");
                                    }
                                }, function(reason) {

                                    $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                                    $rootScope.MessageNotification = reason;
                                    $rootScope.$broadcast(loadingRequestConst.Stop);
                                });
                            }
                        });

                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                );

            } catch (ex) {
                console.log(ex.message);
                navigator.notification.alert("Catch says: " + ex.message);
            }
        }
    };

    function findBook(isbn)
    {
        var deferred = $q.defer();

        isbnService.getGoogleBookInfo(isbn, function(isSuccess, result){

            if(isSuccess)
            {

                deferred.resolve(result);

            }
            else
            {
                deferred.reject(result);

            }
        });

        return deferred.promise;

    }
});
