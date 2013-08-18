'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope, $q, facebookService, $window) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"AddBook");

    $scope.addBook = false;

    $scope.addNewBook = function () {
        $scope.addBook = true;
    };

    $scope.book = {
        isbn:"",
        description: "",
        image: null,
        title:"",
        authors: null
    };
    function errorHandler(e) {
        //Lame - do nothing
        alert(e.toString());
    }

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
                            $scope.clicked=true;
                            $rootScope.$broadcast(loadingRequestConst.Start);
                            var promise = findBook(result.text)
                            promise.then(function(results) {

                                $scope.books = results;
                                $scope.clicked=false;
                                $rootScope.$broadcast(loadingRequestConst.Stop);


                            }, function(reason) {

                                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                                $rootScope.MessageNotification = reason;
                                $scope.clicked=false;
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

	$scope.findBook = function () {

        if ($scope.isbn != null)
        {
            $scope.clicked=true;
            $rootScope.$broadcast(loadingRequestConst.Start);
            var promise = findBook($scope.isbn)
            promise.then(function(results) {

                $scope.books = results;
                $scope.clicked=false;
                $rootScope.$broadcast(loadingRequestConst.Stop);


            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;
                $scope.clicked=false;
                $rootScope.$broadcast(loadingRequestConst.Stop);
            });
		}
	};

    $scope.registerNewBook = function (book) {

        if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.$trackEvent(function(){}, function(){alert("Error")}, "Button", "Click", "Register New Book", 1);

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

//                            if($rootScope.currentUser.fbId != undefined)
//                            {

//                            }

                            $scope.goTo('views/bookBarcode.html')

                        }
                        else
                        {
                            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                            $rootScope.MessageNotification = result;
                        }
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
});




