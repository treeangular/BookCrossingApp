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
//
                        window.resolveLocalFileSystemURI(imageData, function(entry) {

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

                                $scope.$apply(function() {
                                    ctrl.$setViewValue(output);
                                });
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

                    function onFail(message) {
                        alert('Failed because: ' + message);
                        ctrl.$setValidity('Failed because: ' + message, false);
                    }

                });
            }
        };
    });


BookCrossingApp.directive('bcaCameraTakePicture', function () {
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
                        sourceType : Camera.PictureSourceType.CAMERA,
                        targetWidth: 100,
                        targetHeight: 100
                    });
                function onSuccess(imageData) {
//
                    $scope.$apply(function() {
                        ctrl.$setViewValue(imageData);
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
