BookCrossingApp.controller('AddBlankBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope, cache) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"addBlankBook");

    var fileToUpdate = undefined;
    var isFileToUpdate;

    $scope.$watch('bookPicture', function(value) {
        alert(">> $scope.$watch('bookPicture");
        if(value) {
            $scope.bookPicture = value;
            isFileToUpdate = true;
            window.resolveLocalFileSystemURI(value, function(entry) {

                var reader = new FileReader();

                reader.onloadend = function(evt) {
                    alert('read onloderend');
                    console.log(JSON.stringify(evt.target));
                    console.log(evt.target.result);
                    var byteArray = new Uint8Array(evt.target.result);
                    var output = new Array( byteArray.length );
                    var i = 0;
                    var n = output.length;
                    while( i < n ) {
                        output[i] = byteArray[i];
                        i++;
                    }

                    fileToUpdate = output;
                    alert("fileToUpdate = output");
                }

                reader.onerror = function(evt) {
                    alert('read error');
                    console.log(JSON.stringify(evt));
                }

                console.log('pre read');

                entry.file(function(s) {
                    reader.readAsArrayBuffer(s);
                }, function(e) {
                    alert('ee');
                });

                //reader.readAsArrayBuffer(entry.file(function(s) { console.log('ss');}, function(e) { console.log('e');});
                console.log('fired off the read...');
            });
        }
        else
        {
            alert(">> $scope.$watch(else value is not set or something like this.");
        }
    }, true);

    $scope.registerNewBook = function (book) {
        $scope.clicked=true;
        $rootScope.$broadcast(loadingRequestConst.Start);
        alert(">> Start to : registerNewBook1");

        if (fileToUpdate!=undefined){

            $scope.$apply(function () {
                alert(">> Start to : registerNewBook2");

                dataService.getBookRegistrationId(function (isResult, result) {
                    //Without the registration Id we cannot let the book to be registered!
                    if(isResult)
                    {
                        alert(">> Start to : registerNewBook3");

                        //Set book registraionID
                        book.registrationId = result;

                        //Set author
                        book.authors = [];
                        book.authors.push(book.author);

                        //Save registartionId in parent scope (main) so I can get it in bookBarCode
                        $scope.setRegisterId(result);

                        //Set book image
                        var parseFile = new Parse.File("mypic.jpg", fileToUpdate);
                        parseFile.save().then(function(uploadedParseFile) {

                        alert("Parse file uploaded");
                        book.set("image",uploadedParseFile._url);
                                //Save book data with registration Id
                                dataService.registerBook(book, function (isResult, result) {
                                    //How do I change to another view now?!!? Locate ??
                                    alert("registering book");
                                    //$scope.$apply(function () {
                                        //isSuccess = isResult ? true : false;
                                        if (isResult)
                                        {
                                            //avocarrot.createStory('Registered', { name: book }, "Another book on the way to be shared!");
                                            cache.restart();
                                            $scope.goTo('views/bookBarcode.html')
                                        }
                                        else
                                        {
                                            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                                            $rootScope.MessageNotification = result;
                                            alert("error register book");
                                        }

                                        $scope.clicked=false;
                                        $rootScope.$broadcast(loadingRequestConst.Stop);
                                    //});
                                });
                        },
                            function(error) {
                            navigator.notification.alert("Error:" + error, null);
                            console.log(error);
                            alert("error - when Parse file uploading");
                        });
                    }
                    else
                    {
                        //Set notification error => Pls try again an issue with the cool registration number has happened!
                        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                        $rootScope.MessageNotification = result;
                        alert("error  - getBookRegistrationId");
                    }
                });
        });
     }
     else
     {
         $rootScope.TypeNotification = ErrorConst.ValidationError;
         $rootScope.MessageNotification = "Validation - All fields must be filled";
         alert("Validation error with result: ")
         alert(result);
     }
    };
});