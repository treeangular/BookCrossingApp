'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location) {

        $scope.updateUserProfile = function (user) {

            //Only way I found to fix this issue - SO question
            //user.myPicture =  $scope.myPicture;
            user.myPicture =  $scope.myPicture;

            console.log("File available at: " + user.myPicture);
            alert( user.myPicture);

            var reader = new FileReader();

            reader.onloadend = function(fileEntry) {

                console.log(fileEntry.name);
                console.log("Read as data URL");

                //alert(evt.target.result);
                user.myPicture =  fileEntry;

                dataService.uploadPicture(fileEntry, function(isResult, parseUrl)
                {
                    user.myPictureFile = parseUrl;

                });

                dataService.updateUserProfile(user, function (isResult, result) {


                    $scope.$apply(function () {
                        if (isResult)
                        {
                            $location.path('/Main');
                        }
                        else
                        {
                            $scope.ErrorMessage = result.message;
                        }
                    });
                });

            };

//            function onResolveSuccess(fileEntry) {
//
//
//            }
//
//            function fail(evt) {
//                console.log(evt.target.error.code);
//            }

            //window.resolveLocalFileSystemURI(user.myPicture, onResolveSuccess, fail);
            reader.readAsDataURL(user.myPicture);
        }

        //Initialize default value
        $scope.myPicture = "../styles/img/CustomAvatarContest.png";

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

});
