'use strict';

BookCrossingApp.factory('cordovaReady', function () {
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
            navigator.notification.alert("haaaaaaa");
        }, false);

        return function () {
            return impl.apply(this, arguments);
        };
    };
});
