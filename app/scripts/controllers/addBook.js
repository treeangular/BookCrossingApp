'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope, $q, facebookService, $window) {


    $scope.addBook = false;

    function shareFB(book, actionType)
    {
        var deferred = $q.defer();
        facebookService.share(actionType, book.title, function(isSuccess, result){
            if(!isSuccess)
            {
                deferred.reject(result);

            }
            else
            {
                deferred.resolve(result);
            }

        });
        return deferred.promise;

    }


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
        if (typeof $window.plugins != 'undefined')
        {
            var gaPlugin = $window.plugins.gaPlugin;

            gaPlugin.init(function() {

                alert("gaPlugin inted")

            }, errorHandler, "UA-42576964-1", 10);


            // Call the service and fetch the list of signatures that match the given petition ID
            gaPlugin.trackPage( function() {

                alert("Main Tracked!!");

            }, errorHandler, "/Main.html");
        }
        else
        {
            alert("undefined");
        }
        console.log('scanning');
        try {

            window.plugins.barcodeScanner.scan(
                function(result) {
                    if (result.cancelled)
                        alert("the user cancelled the scan");
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
            navigator.notification.alert("Catch says" + ex.message);
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
            var promise = findBook($scope.isbn)
            promise.then(function(result) {

                $scope.book.description = result.description;
                $scope.book.image = result.image;
                $scope.book.title= result.title;
                $scope.book.authors = result.authors;
                $scope.book.isbn = result.isbn;


            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;
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
                            alert($rootScope.currentUser.fbId);
//                            if($rootScope.currentUser.fbId != undefined)
//                            {
                                facebookService.share('Registered',book.title, function(isSuccess, result){
                                if(!isSuccess)
                                {
                                    $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                                    $rootScope.MessageNotification = result;
                                }

                                });
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




