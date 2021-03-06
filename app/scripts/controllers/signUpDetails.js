'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location, $http,$rootScope, $q) {
        if($rootScope.gaPlugIn !== undefined)
            $rootScope.gaPlugIn.trackPage(function(){}, function(){consloe.log("Error - trackPage SingUpDetails")},"SingUpDetails");

        var fileToUpdate;
        var isFileToUpdate;

        var disabledClass = 'disabling';
        $scope.maleClass = disabledClass;
        $scope.femaleClass = disabledClass;

        $scope.selectSex = function (sex) {
            if (sex=="Male"){
                $scope.user.gender = "Male";
                $scope.maleClass = "NoDisable";
                $scope.femaleClass = disabledClass;
            }
            else if (sex=="Female"){
                $scope.user.gender = "Female";
                $scope.femaleClass = "NoDisable";
                $scope.maleClass = disabledClass;
            }
            else{
                $scope.user.gender = "";
                $scope.femaleClass = disabledClass;
                $scope.maleClass = disabledClass;
            }
        };

        //Initializes binded user
        dataService.getCurrentUser(function(currentUser){
            var profilePhoto = "styles/img/user.png";

            //Will be set to true in case we need to upload a new profile picture.
            isFileToUpdate = false;

            if(currentUser != null )
            {
                profilePhoto = currentUser.get("myPicture");

                if(profilePhoto != undefined)
                {
                    $scope.myPicture = profilePhoto;//profilePhoto.url();
                }
                else{
                    $scope.myPicture = "styles/img/user.png";
                }
            }

            $scope.user = {
                nick: currentUser.get('nick'),
                gender: currentUser.get('gender'),
                birthday: currentUser.get('birthday'),
                favoriteGenre:currentUser.get('favoriteGenre'),
                myPicture: profilePhoto
            };

            $scope.selectSex($scope.user.gender);
         });

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
                isFileToUpdate = true;

                window.resolveLocalFileSystemURI(value, function(entry) {

                    var reader = new FileReader();

                    reader.onloadend = function(evt) {
                        console.log('read onloderend');
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
                    }

                    reader.onerror = function(evt) {
                        console.log('read error');
                        console.log(JSON.stringify(evt));
                    }

                    console.log('pre read');

                    entry.file(function(s) {
                        reader.readAsArrayBuffer(s);
                    }, function(e) {
                        console.log('ee');
                    });

                    //reader.readAsArrayBuffer(entry.file(function(s) { console.log('ss');}, function(e) { console.log('e');});
                    console.log('fired off the read...');
                });
            }
        }, true);

        $scope.updateUserProfile = function (user) {

          if (fileToUpdate!=undefined){
                var parseFile = new Parse.File("mypic.jpg", fileToUpdate);

                parseFile.save().then(function(uploadedParseFile) {

                    var currentUser = Parse.User.current();
                    currentUser.set("myPicture",uploadedParseFile._url);
                    //currentUser.set("myFile",uploadedParseFile);

                    currentUser.save().then(function(){
                           // navigator.notification.alert("success updating user!", null);
                            //callback(true);
                        }
                        , function(error) {
                            // The file either could not be read, or could not be saved to Parse.
                            //navigator.notification.alert("error updating user!", null);
                            $rootScope.TypeNotification = "errormessage";
                            $rootScope.MessageNotification = result.message;
                            //callback(false,error);
                        });

                }, function(error) {
                    navigator.notification.alert("Error:" + error, null);
                    console.log(error);
                });
            }

            dataService.updateUserProfile(user, function (isResult, result) {

                $scope.$apply(function () {
                    if (isResult)
                    {
                        $location.path('/Main');
                    }
                    else
                    {
                        $rootScope.TypeNotification = "errormessage";
                        $rootScope.MessageNotification = result.message;
                    }
                });
            });
        }
});
