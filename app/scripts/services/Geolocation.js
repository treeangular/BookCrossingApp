'use strict';

BookCrossingApp.factory('Geolocation', function ($rootScope, phonegapReady) {
        return {
            getCurrentPosition: phonegapReady(function (onSuccess, onError, options) {
                navigator.geolocation.getCurrentPosition(function () {
                        var that = this,
                            args = arguments;

                        if (onSuccess) {
                            $rootScope.$apply(function () {
                                onSuccess.apply(that, args);
                            });
                        }
                    }, function () {
                        var that = this,
                            args = arguments;

                        if (onError) {
                            $rootScope.$apply(function () {
                                onError.apply(that, args);
                            });
                        }
                    },
                    options);
            })
        };
    });
