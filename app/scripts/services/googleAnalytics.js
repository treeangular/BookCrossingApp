/* global angular, console */

'use strict';

angular.module('googleAnalyticsProvider', [])
    .factory('Analytics','$window', '$rootScope','$location', function($window, $rootScope, $location) {
        var created = false,
            trackRoutes = true,
            accountId,
            trackPrefix = '',
            domainName,
            gaPlugin;

        // config methods
        this.setAccount = function(id) {
            accountId = id;
            if(typeof $window != "undefined")
                initGA(id, $window);
            return true;
        };
        this.trackPages = function(doTrack) {
            trackRoutes = doTrack;
            return true;
        };
        this.trackPrefix = function(prefix) {
            trackPrefix = prefix;
            return true;
        };
        this.initGA = function(id, $window)
        {
            gaPlugin = $window.plugins.gaPlugin;
            gaPlugin.init(function() {

                console.log("gaPlugint inited");

            }, function()
            {
                console.error("gaPlugIn problem");
            }, id, 10);

        }

            // activates page tracking
            if (trackRoutes) $rootScope.$on('$routeChangeSuccess', function() {
                alert("routeChanged!");
                trackPage($location.path());
            });

            return {

                trackPage: function(url) {
                    if (trackRoutes) {

                        gaPlugin.trackPage( function() {

                            console.log("Main Tracked!!");

                        },  function() {

                            alert("not tracked!")

                        }, $location.path());

                    }
                }

            };

    });


