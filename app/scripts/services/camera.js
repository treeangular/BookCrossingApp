'use strict';

BookCrossingApp.factory('cameraService', function ($rootScope, phonegapReadyService) {
    return {
        takePicture: phonegapReadyService(function (onSuccess, onError, options) {

            navigator.camera.getPicture(gotPic, failHandler,
                {   quality:50,
                    destinationType:Camera.DestinationType.FILE_URI,
                    sourceType:navigator.camera.PictureSourceType.CAMERA,
                    targetWidth: 100,
                    targetHeight: 100
                });

            function gotPic(data) {

                var that = this,
                    args = arguments;

                if (onSuccess) {
                    $rootScope.$apply(function () {
                        onSuccess.apply(that, args);
                    });
                }

                window.resolveLocalFileSystemURI(data, function(entry) {

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

            function failHandler(e) {
                alert("ErrorFromC");
                alert(e);
                console.log(e.toString());
            }
        }),

        selectPicture: phonegapReadyService(function (onSuccess, onError, options) {

        })


    };
});
