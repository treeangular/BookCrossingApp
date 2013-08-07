'use strict';

var BookCrossingApp = angular.module('BookCrossingApp', ['dataServices', 'facebookProvider', 'infinite-scroll',  'localization', 'isbnProvider', 'ui.map', 'filters', 'googleAnalyticsProvider']);


BookCrossingApp.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/sign.html',
        controller: 'SignCtrl'
      })
      .when('/SignIn', {
        templateUrl: 'views/signIn.html',
        controller: 'SignInCtrl'
      })
      .when('/SignUp', {
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl'
      })
      .when('/Sign', {
        templateUrl: 'views/sign.html',
        controller: 'SignCtrl'
      })
      .when('/Main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/AddBook', {
        templateUrl: 'views/addBook.html',
        controller: 'AddBookCtrl'
      })
      .when('/UpdateApp', {
            templateUrl: 'views/updateApp.html',
            controller: 'UpdateAppCtrl'
      })
      .when('/AddZobc', {
        templateUrl: 'views/addZobc.html',
        controller: 'AddZobcCtrl'
      })
      .when('/MyLibrary', {
        templateUrl: 'views/myLibrary.html',
        controller: 'MyLibraryCtrl'
      })
      .when('/SignUpDetails', {
        templateUrl: 'views/signUpDetails.html',
        controller: 'SignUpDetailsCtrl'
      })
      .when('/Settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });



    //loadGoogleAnalytics(window);
    loadHttpInterceptor($httpProvider);
    loadFastClick();
    loadParse();
    loadFB();

}]);
var _versionMobile = "1.0.3";
var gaPlugin;
var googleAnalyticsId = "UA-42576964-2";
var googleAnalyticsIdApp = "UA-42576964-2";

BookCrossingApp.run(function ($rootScope, $http, dataService, $window, $q, $location) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

        if (typeof $window.plugins == 'undefined')
        {
            alert('onDeviceReady- window.plugins == undefined' );
        }

        gaPlugin = $window.plugins.gaPlugin;

        // Note: A request for permission is REQUIRED by google. You probably want to do this just once, though, and remember the answer for subsequent runs.
        //navigator.notification.confirm('GA_PLUGIN would like your permission to collect usage data. No personal or user identifiable data will be collected.', permissionCallback, 'Attention', 'Allow,Deny');

        gaPlugin.init(function(){alert("Hola")}, function(){alert("Error")}, googleAnalyticsId, 10);
        gaPlugin.init(function(){alert("Hola")}, function(){alert("Error")}, googleAnalyticsIdApp, 10);
        alert('onDeviceReady - After init');
    }

    document.addEventListener("online", onOnline, false);

    function onOnline() {
        // Handle the online event
        $rootScope.TypeNotification = "errormessage";
        $rootScope.MessageNotification = "OnLine";
    }

    document.addEventListener("offline", onOffline, false);

    function onOffline() {
        // Handle the offline event
        $rootScope.TypeNotification = "errormessage";
        $rootScope.MessageNotification = "OffLine";
    }

    function checkVersion()
    {
        var deferred = $q.defer();

        dataService.checkApplicationVersion(function (isResult, result) {

            if(isResult)
            {
                if(result.get("version") != _versionMobile)
                    if (result.get("isCritical")) {

                        alert("There is a new critical version, please download it!");
                        $location.path('/UpdateApp');
                    }
                    else {
                        alert("There is a new version, download it!");
                    }
                deferred.resolve();
            }
            else
            {
                deferred.reject();
            }
        });
        return deferred.promise;

    }
    //@Javi una promise sin funcionalidad dentro podemos solo dejar la llamada async sin mas n?
    //  checkVersion();
//    var promise= checkVersion();
//
//    promise.then(function(){
//
//    }, function(){
//
//    })

//    var googleAnalyticsId = "UA-42576964-1";
//    var googleAnalyticsIdApp = "UA-42576964-2";

//    document.addEventListener('deviceready', function () {
//
//        googleAnalyticsProvider.setAccount(googleAnalyticsId);
//
//        googleAnalyticsProvider.trackPage("index.html");
//
//
////        function errorHandler(e) {
////            //Lame - do nothing
////            alert(e.toString());
////        }
////
////        if (typeof window.plugins != 'undefined')
////        {
////            //For Web
////            window.plugins.gaPlugin.init(function() {
////
////                alert("gaPlugin inted")
////
////            }, errorHandler, "UA-42576964-1", 10);
////
////            alert("index tracked!!");
////            // Call the service and fetch the list of signatures that match the given petition ID
////            window.plugins.gaPlugin.trackPage( function() {
////
////                console.log("Main Tracked!!");
////
////            }, errorHandler, "/Main");
////
////            //For App
////            window.plugins.gaPlugin.init(function() {
////
////                alert("gaPlugin inted")
////
////            }, errorHandler, "UA-42576964-2", 10);
////
////
////            alert("index tracked!!");
////            // Call the service and fetch the list of signatures that match the given petition ID
////            window.plugins.gaPlugin.trackPage( function() {
////
////                console.log("Main Tracked!!");
////
////            }, errorHandler, "/Main");
////        }
////        else
////        {
////            alert("undefined");
////        }
//
//        });

});

//function loadGoogleAnalytics($window)
//{
//    function errorHandler(e) {
//        //Lame - do nothing
//        alert(e.toString());
//    }
//
//    if (typeof window.plugins != 'undefined')
//    {
//        //For Web
//        window.plugins.gaPlugin.init(function() {
//
//            alert("gaPlugin inted")
//
//        }, errorHandler, "UA-42576964-1", 10);
//
//        alert("index tracked!!");
//        // Call the service and fetch the list of signatures that match the given petition ID
//        window.plugins.gaPlugin.trackPage( function() {
//
//            console.log("Main Tracked!!");
//
//        }, errorHandler, "/Main");
//
//        //For App
//        window.plugins.gaPlugin.init(function() {
//
//            alert("gaPlugin inted")
//
//        }, errorHandler, "UA-42576964-2", 10);
//
//
//        alert("index tracked!!");
//        // Call the service and fetch the list of signatures that match the given petition ID
//        window.plugins.gaPlugin.trackPage( function() {
//
//            console.log("Main Tracked!!");
//
//        }, errorHandler, "/Main");
//    }
//    else
//    {
//        alert("undefined");
//    }
//
//}

function loadFastClick()
{
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);

}

function loadHttpInterceptor($httpProvider)
{
    var $http,
        interceptor = ['$q', '$injector', function ($q, $injector) {
            var error;

            function success(response) {
                // get $http via $injector because of circular dependency problem

                $http = $http || $injector.get('$http');

                if($http.pendingRequests.length < 1) {
                    $('#loadingWidget').hide();
                }
                return response;
            }

            function error(response) {
                // get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');

                if($http.pendingRequests.length < 1) {
                    $('#loadingWidget').hide();
                }
                return $q.reject(response);
            }

            return function (promise) {
                $('#loadingWidget').show();
                return promise.then(success, error);
            }
        }];

    $httpProvider.responseInterceptors.push(interceptor);

}
function loadFB()
{
    var FB_APP_ID = "160779410752321";

    window.addEventListener('load', function() {

        FB.init({
            appId: FB_APP_ID,
            nativeInterface: CDV.FB,
            status     : true, // check login status

            useCachedDialogs: false
        });
    }, false);
}

function loadParse()
{
    var PARSE_APP_ID = "MyXalB83PFKV15BOPSO2lKBBzkYeyLKGNYsNI5DS";
    var PARSE_JS_ID = "7pNuZLzLEArqUc2BlQNmDgD5HMVL4l3G9ZIKP3Qr";

    Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);
}

function SuccessInitGaPlugin (result) {

  try{
        alert('SuccessInitGaPlugin - '+result);
        console.log('SuccessInitGaPlugin: '+result);


        gaPlugin.trackEvent( nativePluginResultHandler, nativePluginErrorHandler, "Button", "Click", "event only", 1);
        gaPlugin.trackPage("Init.App.com");

    } catch (ex) {
        console.log(ex.message);
        navigator.notification.alert("Catch says: " + ex.message);
    }

}

function ErrorInitGaPlugin (error) {

    try{
        alert('ErrorInitGaPlugin - '+error);
        console.log('ErrorInitGaPlugin: '+error);

    } catch (ex) {
        console.log(ex.message);
        navigator.notification.alert("Catch says: " + ex.message);
    }
}

function nativePluginResultHandler (result) {

    try{
        alert('Event Tracked - '+result);
        console.log('Event Tracked: '+result);


    } catch (ex) {
        console.log(ex.message);
        navigator.notification.alert("Catch says: " + ex.message);
    }

}
