'use strict';

angular.module('sharedServices', [])
    .config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('myHttpInterceptor');
    var spinnerFunction = function (data, headersGetter) {
        // todo start the spinner here
        $('#loadingWidget').show();
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
}).factory('myHttpInterceptor', function ($q) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                $('#loadingWidget').hide();
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                $('#loadingWidget').hide();
                return $q.reject(response);
            });
        };
    })
