'use strict';

BookCrossingApp.factory('phonegapReadyService', function () {
    return function (fn) {

        var queue = [];

        var impl = function () {
            queue.push(Array.prototype.slice.call(arguments));
        };

        document.addEventListener('deviceready', function () {
            queue.forEach(function (args) {
                fn.apply(this, args);
            });
            impl = fn;
            console.log("Service phonegapReady detected deviceready");
//            angular.bootstrap(document, ['ngView']);
        }, false);

        return function () {
            return impl.apply(this, arguments);
        };
    };
});
