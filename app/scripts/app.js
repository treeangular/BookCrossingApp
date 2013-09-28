'use strict';

var BookCrossingApp = angular.module('BookCrossingApp', ['dataServices', 'facebookProvider', 'infinite-scroll',  'localization', 'isbnProvider', 'ui.map', 'filters', 'googleAnalyticsProvider', 'ngMobile', 'logger']);

function gotFS(fileSystem) {

    alert("gotFS")
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);

}

function gotFileEntry(fileEntry) {

    alert("gotFileEntry")
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        alert("contents of file now 'some sample text'");
        writer.truncate(11);
        writer.onwriteend = function(evt) {
            alert("contents of file now 'some sample'");
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                alert("contents of file now 'some different text'");
            }
        };
    };
    writer.write("some sample text");
}

BookCrossingApp.config(['$routeProvider','$httpProvider','logItProvider', function ($routeProvider, $httpProvider, logIt) {

    var file = "myFile";
    logIt.setFile(file);
    logIt.setLogEnable(true);

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        alert("OndeviceReady!")
        if(typeof(LocalFileSystem) != 'undefined')
        {
            alert("inside Local File System")
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }
    }

    $routeProvider
      .when('/', {
        templateUrl: 'views/sign.html',
        controller: 'SignCtrl'
      })
      .when('/TakeTour', {
        templateUrl: 'views/takeTour.html',
        controller: 'TakeTourCtrl'
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

        gaPlugin.init(function(){}, function(){alert("Error")}, googleAnalyticsIdApp, 10);
        $rootScope.gaPlugIn = gaPlugin;

        //App it s not a page we need to track. We just need to initize and set the rootscpe variable.
        if($rootScope.gaPlugIn === undefined)
        {
            //alert("GA undefined!!!!");
            console.log("App: $rootScope.gaPlugIn === undefined ");
        }
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
    var PARSE_APP_ID = "MyXalB83PFKV15BOPSO2lKBBzkYeyLKGNYsNI5DS";
    var PARSE_JS_ID = "7pNuZLzLEArqUc2BlQNmDgD5HMVL4l3G9ZIKP3Qr";

    Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);
}