'use strict';


angular.module('googleAnalyticsProvider', [])
    .factory('googleAnalyticsService',function(){

        try {

            var myAnalyticsAccount = "UA-42503133-1";
            var gaPlugin;
            if (typeof window.plugins != 'undefined')
            {
                alert("ga loaded!!");
                gaPlugin = window.plugins.gaPlugin;
                gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, myAnalyticsAccount, 10);
            }

        } catch (e) {
            console.log(e);
        }


    });
