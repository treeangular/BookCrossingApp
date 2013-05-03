'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location) {

        $scope.updateUserProfile = function (user) {

            //Only way I found to fix this issue - SO question
            user.myPicture = $scope.myPicture;
            //console.log("File available at FILENAME: " + fileName);

            //alert( user.myPicture);

            //SO question WTF!   $.get(user.myPicture);
            user.myPicture =  $.get(user.myPicture);
            console.log("SO jquery response" + user.myPicture);

           dataService.uploadPicture(user, function(isResult, parseUrl)
           {
                user.myPictureFile = parseUrl;

                    //need to use q but thats for later after being able to upload the pic
//               dataService.updateUserProfile(user, function (isResult, result) {
//
//                   $scope.$apply(function () {
//                       if (isResult)
//                       {
//                           $location.path('/Main');
//                       }
//                       else
//                       {
//                           $scope.ErrorMessage = result.message;
//                       }
//                   });
//               });
           });



        }

        //Initialize default value
        $scope.myPicture = "../styles/img/CustomAvatarContest.png";

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

});
