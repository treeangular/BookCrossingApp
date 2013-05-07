'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location, $http) {

        $scope.updateUserProfile = function (user) {

            //Only way I found to fix this issue - SO question => that should be already in user.myPicture!!
            user.myPicture = $scope.myPicture;
            //console.log("File available at FILENAME: " + fileName);

            //alert( user.myPicture);

            //SO question WTF!   $.get(user.myPicture);
            //user.myPicture =  $.get(user.myPicture);
            //user.myPicture = $http.get(user.myPicture);
            //var iGot =  $http.get(user.myPicture);
            console.log("SO jquery response" + user.myPicture);

               dataService.uploadPicture(user, function(isResult, parseUrl)
               {
                    user.myPictureFile = parseUrl;

                        //need to use q but thats for later after being able to upload the pic
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
               });
         }

        //Initialize default value
        $scope.myPicture = "../styles/img/CustomAvatarContest.png";

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

        $scope.randomNick = function createRandomNick()
        {
            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
            var string_length = 8;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }

            return  "USER" + randomstring;
        };

        dataService.getCurrentUser(function(currentUser){
            if(currentUser.nick == undefined )
            {
               currentUser.nick = $scope.randomNick;
               $scope.user = currentUser;
            }
            else
            {
               $scope.user = currentUser;
            }
         });

});
