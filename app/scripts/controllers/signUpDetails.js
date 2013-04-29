'use strict';

angular.module('BookCrossingApp')
  .controller('SignUpDetailsCtrl', function ($scope, dataService, $location) {

        $scope.updateUserProfile = function (user) {

            user.myPicture =  $scope.myPicture;

            var reader = new FileReader();
            reader.onloadend = function(evt) {
                console.log("Read as data URL");
                //alert(evt.target.result);
                user.myPicture =  evt;

                dataService.uploadPicture(evt, function(isResult, parseUrl)
                {
                    user.myPictureFile = parseUrl;

                });

                dataService.updateUserProfile(user, function (isResult, result) {

                    //Only way I found to fix this issue - SO question
                    //user.myPicture =  $scope.myPicture;

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
            reader.readAsText(user.myPicture);


        }

        //Initialize default value
        $scope.myPicture = "../styles/img/CustomAvatarContest.png";

        $scope.$watch('myPicture', function(value) {
            if(value) {
                $scope.myPicture = value;
            }
        }, true);

});
