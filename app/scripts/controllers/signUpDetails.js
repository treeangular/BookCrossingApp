'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location, $http) {

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

        //Initialize default value
        $scope.myPicture = "styles/img/user.png";

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

        dataService.getCurrentUser(function(currentUser){

            $scope.user = {
                nick: currentUser.get('nick'),
                gender: currentUser.get('gender'),
                birthday: currentUser.get('birthday'),
                favoriteGenre:currentUser.get('favoriteGenre'),
                myPicture: currentUser.get('myPicture')
            };

            $scope.selectSex($scope.user.gender);



         });

        $scope.getPicture = function(){

            navigator.camera.getPicture(onSuccess, onFail,
                //Options => http://docs.phonegap.com/en/2.6.0/cordova_camera_camera.md.html#Camera
                { quality: 50,
                    destinationType:Camera.DestinationType.FILE_URI,
                    encodingType: Camera.EncodingType.JPEG,
                    //sourceType : Camera.PictureSourceType.PHOTOLIBRARY ,//CAMERA,
                    targetWidth: 100,
                    targetHeight: 100
                });
            function onSuccess(imageURI) {
                var image = document.getElementById('preview');
                movePic(imageURI);

//                image.src = imageURI;
//                $scope.myPicture = image.src;

//                $scope.$apply(function() {
//                    ctrl.$setViewValue(image.src);
//                });
            }

            function onFail(message) {
                alert('Failed because: ' + message);
                ctrl.$setValidity('Failed because: ' + message, false);
            }

        };

        function movePic(file){
            window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
        }

//Callback function when the file system uri has been resolved
        function resolveOnSuccess(entry){
            var d = new Date();
            var n = d.getTime();
            //new file name
            var newFileName = n + ".jpg";
            var myFolderApp = "MyAppFolder";

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                    //The folder is created if doesn't exist
                    fileSys.root.getDirectory( myFolderApp,
                        {create:true, exclusive: false},
                        function(directory) {
                            entry.moveTo(directory, newFileName,  successMove, resOnError);
                        },
                        resOnError);
                },
                resOnError);
        }

//Callback function when the file has been moved successfully - inserting the complete path
        function successMove(entry) {
            //Store imagepath in session for future use
            // like to store it in database
            sessionStorage.setItem('imagepath', entry.fullPath);
        }

        function resOnError(error) {
            alert(error.code);
        }

});
