'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope, $q, facebookService, $window) {

//    alert("_gap Push location.path is: " + $location.path());
//    $window._gaq.push(['_trackPageview', $location.path()]);
//    gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, "AddBook.ScanBook.com");

    if($rootScope.gaPlugIn !== undefined)
    {
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"addBook.html");
    }
    else
    {
        alert("$rootScope.gaPlugI =>  undefined  : ( ")
    }

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

    function nativePluginResultHandler (result) {
        //alert('nativePluginResultHandler - '+result);
        console.log('nativePluginResultHandler: '+result);

    }

    function nativePluginErrorHandler (error) {
        //alert('nativePluginErrorHandler - '+error);
        console.log('nativePluginErrorHandler: '+error);
    }

    $scope.scanBook = function () {
    {


        console.log('scanning');
        try {

            //gaPlugin.trackPage( nativePluginResultHandler, nativePluginErrorHandler, "AddBook.ScanBook.com");


            $window.plugins.barcodeScanner.scan(
                function(result) {
                    if (result.cancelled)
                        navigator.notification.alert("the user cancelled the scan");
                    else
                        alert("we got a barcode: " + result.text);
                    navigator.notification.alert("Scanner result: \n" +
                        "text: " + args.text + "\n" +
                        "format: " + args.format + "\n" +
                        "cancelled: " + args.cancelled + "\n");
                },
                function(error) {
                    alert("scanning failed: " + error)
                }
            )

           /* $window.plugins.barcodeScanner.scan(function(args) {
                console.log("Scanner result: \n" +
                    "text: " + args.text + "\n" +
                    "format: " + args.format + "\n" +
                    "cancelled: " + args.cancelled + "\n");

                navigator.notification.alert("Scanner result: \n" +
                    "text: " + args.text + "\n" +
                    "format: " + args.format + "\n" +
                    "cancelled: " + args.cancelled + "\n");*/
                /*
                 if (args.format == "QR_CODE") {
                 window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
                 }
                 */
                //document.getElementById("info").innerHTML = args.text;
              //  console.log(args);
            //});
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




