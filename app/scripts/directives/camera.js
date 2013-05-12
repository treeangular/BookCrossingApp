'use strict';

//angular.module('BookCrossingApp')
BookCrossingApp.directive('bcaCamera', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, elm, attrs, ctrl) {
                elm.bind('click', function() {

                    navigator.camera.getPicture(onSuccess, onFail,
                    //Options => http://docs.phonegap.com/en/2.6.0/cordova_camera_camera.md.html#Camera
                        { quality: 50,
                            destinationType:Camera.DestinationType.FILE_URI,
                            encodingType: Camera.EncodingType.JPEG,
                            sourceType : Camera.PictureSourceType.PHOTOLIBRARY ,//CAMERA,
                            targetWidth: 100,
                            targetHeight: 100
                        });
                    function onSuccess(imageData) {
                        var image = document.getElementById('myPicture');
                        image.src = "data:image/jpeg;base64," + imageData;
                        alert("Hola!!");
                        $scope.$apply(function() {
                            ctrl.$setViewValue(image.src);
                        });
                    }

                    function onFail(message) {
                        alert('Failed because: ' + message);
                        ctrl.$setValidity('Failed because: ' + message, false);
                    }

                });
            }
        };
    });
