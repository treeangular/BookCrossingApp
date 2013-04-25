'use strict';
BookCrossingApp.directive('whenScrolled', function () {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('BookCrossingApp', function() {
		    console.log("loading dir");
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});