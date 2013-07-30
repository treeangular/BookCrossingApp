'use strict';

BookCrossingApp.factory('geolocationService', function ($rootScope, $http, phonegapReadyService, $q) {

        var getCityFromGeopoint = function getCityFromGeopoint(latitude, longitude){


            var deferred = $q.defer();
            var queryFormat;

            if(latitude && longitude)
            {
                queryFormat = "latlng=" + latitude + "," + longitude;
            }
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?'+queryFormat+'&sensor=true';

            $http({
                method: 'GET',
                url: url,
                cache: false
            }).
                success(function(data, status) {

                    if(data.status === "OK")
                    {
                        deferred.resolve(data.results[1].formatted_address);

                    }
                    else
                    {
                        deferred.reject(ErrorConst.CityNotFound)
                    }

                }).
                error(function(data, status) {

                    deferred.reject(false, ErrorConst.GenericError);
                });
            return deferred.promise;
        }

        return {
            getCurrentPosition: phonegapReadyService(function (onSuccess, onError, options) {
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
                                alert("getCurrentPosition - onError - "+ args);
                            });
                        }
                    },
                    options);


            }),
            getCityFromGeopoint: getCityFromGeopoint
        };
    });
