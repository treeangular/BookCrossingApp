'use strict';

var BookCrossingApp = angular.module('BookCrossingApp', ['dataServices', 'facebookProvider', 'infinite-scroll',  'localization', 'isbnProvider', 'ui.map', 'filters', 'googleAnalyticsProvider', 'ngMobile', 'logger', 'parseCache']);

BookCrossingApp.config(['$routeProvider','$httpProvider','cacheProvider', function ($routeProvider, $httpProvider, cache) {

    cache.setIsCacheEnable(true);
    cache.setCacheTime(60000);
    cache.setIsHomeFirstTimeExecuted(true);
    cache.setIsReleaseFirstTimeExecuted(true);
    cache.setIsLibraryFirstTimeExecuted(true);

     $routeProvider
      .when('/', {
        templateUrl: 'views/sign.html',
        controller: 'SignCtrl'
      })
      .when('/TakeTour', {
        templateUrl: 'views/takeTour.html',
        controller: 'TakeTourCtrl'
      })
     .when('/ScreenShots', {
         templateUrl: 'views/screenShots.html',
         controller: 'ScreenShotsCtrl'
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
      .when('/Suggestion', {
             templateUrl: 'views/suggestion.html',
             controller: 'SuggestionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    //loadGoogleAnalytics(window);
    loadHttpInterceptor($httpProvider);
    loadParse();
    loadFB();
    //loadAvoCarrot();

}]);
var _versionMobile = "1.0.3";
var gaPlugin;
//var googleAnalyticsId = "UA-42576964-2";
//Production
var googleAnalyticsIdApp = "UA-42576964-3";
//Test
//var googleAnalyticsIdApp = "UA-42576964-2";

BookCrossingApp.run(function ($rootScope, $http, dataService, $window, $q, $location, localize) {

    document.addEventListener("deviceready", onDeviceReady, false);
    $rootScope.IsActionFirstTimeExecuted = true;
    $rootScope.IsBooksToReleaseFirstTimeExecuted = true;
    $rootScope.IsMyLibraryFirstTimeExecuted = true;
    $rootScope.homeFilterType = "you";

    function onDeviceReady() {

        FastClick.attach(document.body);
//        if (typeof navigator.globalization != 'undefined')
//        {
//            setTimeout(function() {
//                navigator.splashscreen.hide();
//            }, 2000);
//        }
       localize.initLocalizedResources();

        if (typeof $window.plugins == 'undefined')
        {
            //alert('onDeviceReady- window.plugins == undefined' );
        }
        gaPlugin = $window.plugins.gaPlugin;

        // Note: A request for permission is REQUIRED by google. You probably want to do this just once, though, and remember the answer for subsequent runs.
        //navigator.notification.confirm('GA_PLUGIN would like your permission to collect usage data. No personal or user identifiable data will be collected.', permissionCallback, 'Attention', 'Allow,Deny');

        gaPlugin.init(function(){}, function(){console.log("Error")}, googleAnalyticsIdApp, 10);
        $rootScope.gaPlugIn = gaPlugin;

        //App it s not a page we need to track. We just need to initize and set the rootscpe variable.
        if($rootScope.gaPlugIn === undefined)
        {
            //alert("GA undefined!!!!");
            console.log("App: $rootScope.gaPlugIn === undefined ");
        }

        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
    }

    function onOnline() {
        // Handle the online event
        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
        $rootScope.MessageNotification = "OnLine";
    }

    function onOffline() {
        // Handle the offline event
        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
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
    //Functionally for being cool if someone has not updated the version and we do not enter into data conflicts
    checkVersion();
});

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
    // Test
   var PARSE_APP_ID = "MyXalB83PFKV15BOPSO2lKBBzkYeyLKGNYsNI5DS";
    var PARSE_JS_ID = "7pNuZLzLEArqUc2BlQNmDgD5HMVL4l3G9ZIKP3Qr";
    //Production
    //var PARSE_APP_ID = "j7SSabUR9BT5xXM0r466Wthn7FSEDdIT1RcjqWnP";
    //var PARSE_JS_ID = "tHuZdyxD04OY6S4ejMlUeqPrIoKoKJi6TJItcmlN";

    Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);
}

function loadAvoCarrot()
{
    avocarrot.init("dfd4ded247e18eecd5c5cc4887f69f0d5d0a1c8c");
}