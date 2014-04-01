BookCrossingApp.controller('AddBlankBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope, cache) {
    if ($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function () {
        }, function () {
        }, "addBlankBook");

    var fileToUpdate = undefined;
    var isFileToUpdate;

    $scope.$watch('bookPicture', function (value) {
        if (value) {
            $scope.bookPicture = value;
            isFileToUpdate = true;
            window.resolveLocalFileSystemURI(value, function (entry) {

                var reader = new FileReader();

                reader.onloadend = function (evt) {
                    //consloe.log('read onloderend');
                    //console.log(JSON.stringify(evt.target));
                    //console.log(evt.target.result);
                    var byteArray = new Uint8Array(evt.target.result);
                    var output = new Array(byteArray.length);
                    var i = 0;
                    var n = output.length;
                    while (i < n) {
                        output[i] = byteArray[i];
                        i++;
                    }

                    fileToUpdate = output;
                }

                reader.onerror = function (evt) {
                    console.log(JSON.stringify(evt));
                }

                //console.log('pre read');

                entry.file(function (s) {
                    reader.readAsArrayBuffer(s);
                }, function (error) {
                    console.log(error);
                    //alert('ee');
                });

                //reader.readAsArrayBuffer(entry.file(function(s) { console.log('ss');}, function(e) { console.log('e');});
                console.log('fired off the read...');
            });
        }
        else {
            console.log(">> $scope.$watch(else value is not set or something like this.");
            $scope.bookPicture = "styles/img/bookToAdd.png";
        }
    }, true);

    $scope.registerNewBook = function (book) {
        $scope.clicked = true;
        $rootScope.$broadcast(loadingRequestConst.Start);

        if (fileToUpdate != undefined && book.description != undefined && book.title != undefined && book.author != undefined) {
            dataService.getBookRegistrationId(function (isResult, result) {
                //Without the registration Id we cannot let the book to be registered!
                if (isResult) {
                    //Set book registraionID
                    book.registrationId = result;

                    //Set author
                    book.authors = [];
                    book.authors.push(book.author);

                    //Save registartionId in parent scope (main) so I can get it in bookBarCode
                    $scope.setRegisterId(result);

                    //Set book image
                    var parseFile = new Parse.File("bookCover.jpg", fileToUpdate);
                    parseFile.save().then(function (uploadedParseFile) {

                            book.image = uploadedParseFile._url;
                            //Save book data with registration Id
                            dataService.registerBook(book, function (isResult, result) {
                                //How do I change to another view now?!!? Locate ??
                                //isSuccess = isResult ? true : false;
                                    $scope.$apply(function () {
                                if (isResult) {
                                    //avocarrot.createStory('Registered', { name: book }, "Another book on the way to be shared!");
                                    cache.restart();
                                    $scope.goTo('views/bookBarcode.html')
                                }
                                else {
                                    $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                                    $rootScope.MessageNotification = result;
                                }
                                $scope.clicked = false;
                                $rootScope.$broadcast(loadingRequestConst.Stop);
                                    });
                            });
                        },
                        function (error) {
                            //navigator.notification.alert("Error:" + error, null);
                            console.log(error);

                        });
                }
                else {
                    //Set notification error => Pls try again an issue with the cool registration number has happened!
                    $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                    $rootScope.MessageNotification = result;
                }
            });
        }
        else {
            $rootScope.TypeNotification = ErrorConst.ValidationError;
            $rootScope.MessageNotification = "Validation - All fields must be filled";
            alert("Validation error with result: ")
        }
    };
});