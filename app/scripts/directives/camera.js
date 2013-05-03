'use strict';

//angular.module('BookCrossingApp')
BookCrossingApp.directive('bcaCamera', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                elm.bind('click', function() {
                    navigator.camera.getPicture(function (imageURI)
                    {
                        scope.$apply(function() {
                            ctrl.$setViewValue(imageURI);
                        });
                    }, function (err) {
                        ctrl.$setValidity('error', false);
                    },
                    //Options => http://docs.phonegap.com/en/2.6.0/cordova_camera_camera.md.html#Camera
                    { quality: 50,
                      destinationType:Camera.DestinationType.FILE_URI,
                      //encodingType: Camera.EncodingType.JPEG,
                      targetWidth: 100,
                      targetHeight: 100
                    })
                });
            }
        };
    });
