'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location, $http,$rootScope) {

        var disabledClass = 'disabling';
        $scope.maleClass = disabledClass;
        $scope.femaleClass = disabledClass;
        $scope.setDate = false;

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

        $scope.updateUserProfile = function (user) {

            //Only way I found to fix this issue - SO question => that should be already in user.myPicture!!
//            user.myPicture = $scope.myPicture;
//            console.log("SO jquery response" + user.myPicture);
//
//            $scope.myPicture = "../styles/img/CustomAvatarContest.png";

//            window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function(fs){
//                fs.root.getFile("temp", {create: true, exclusive: false},
//                    function(entry){
//                        var fileTransfer = new FileTransfer();
//                        fileTransfer.download(
//                            $scope.myPicture, // the filesystem uri you mentioned
//                            entry.fullPath,
//                            function(entry) {
                                // do what you want with the entry here
                                //console.log("download complete: " + entry.fullPath);
//                                dataService.uploadPicture(user, function(isResult, parseUrl)
//                                {
//                                    user.myPicture = parseUrl;

                                    //need to use q but thats for later after being able to upload the pic
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
//                                });
//                            },
//                            function(error) {
//                                console.log("error source " + error.source);
//                                console.log("error target " + error.target);
//                                console.log("error code " + error.code);
//                            },
//                            false,
//                            null
//                        );
//                    }, function(){
//                        alert("file create error");
//                    });
//            }, null);


            }

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

        dataService.getCurrentUser(function(currentUser){
            var profilePhoto = "styles/img/user.png";

            if(currentUser != null )
            {
                profilePhoto = currentUser.get("myFile");

                if(profilePhoto != "undefined")
                {
                    $scope.myPicture = profilePhoto.url();
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

        $scope.getPicture = function(){

            navigator.camera.getPicture(onSuccess, onFail,
                //Options => http://docs.phonegap.com/en/2.6.0/cordova_camera_camera.md.html#Camera
                { quality: 50,
                    destinationType:Camera.DestinationType.FILE_URI,
                    //destinationType:Camera.DestinationType.DATA_URL,
                    encodingType: Camera.EncodingType.JPEG,
                    //sourceType : Camera.PictureSourceType.PHOTOLIBRARY ,//CAMERA,
                    targetWidth: 100,
                    targetHeight: 100
                });
            function onSuccess(imageURI) {
                var image = document.getElementById('preview');
                var file = new Parse.File("userPicture.JPEG", { base64: imageURI });
                $scope.myPicture = imageURI;

                dataService.uploadPicture(file, function (result) {

                    $scope.$apply(function () {
                        if (result)
                        {

                        }
                        else
                        {
                            $rootScope.TypeNotification = "errormessage";
                            $rootScope.MessageNotification = result.message;
                        }
                    });
                });
            }

            function onFail(message) {
                alert('Failed because: ' + message);
                ctrl.$setValidity('Failed because: ' + message, false);
            }
        };

        $scope.updateUserProfile = function (user) {
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
