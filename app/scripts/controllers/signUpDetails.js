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

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

        $scope.$watch('profilePhotoFileUpload', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

        dataService.getCurrentUser(function(currentUser){
            var profilePhoto = "styles/img/user.png";

            if(currentUser != null )
            {
                profilePhoto = currentUser.get("myFile");

                if(profilePhoto != undefined)
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

        $scope.UpdateUserProfileImage = function(){

            $scope.myPicture = document.getElementById('profilePhotoFileUpload');

        }

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

            var image = document.getElementById('profilePhotoFileUpload');
            //var fileUploadControl = $("#profilePhotoFileUpload")[0];
            var fileUploadControl = $("#profilePhotoFileUpload")[0];
            if (fileUploadControl.files.length > 0) {
                var file = fileUploadControl.files[0];
                var name = "photo.jpg";

                var parseFile = new Parse.File(name, file);

                //var file = new Parse.File("userPicture.JPEG", { base64: image });

                dataService.uploadPicture(parseFile, function (result) {

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
        }
});
