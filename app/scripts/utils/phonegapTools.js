/**
 * Tools for dealing with some gaps between phonegap and parse.com
 */

function resolveLocalFileTobyteArray(imageData)
{
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

            return output;
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


