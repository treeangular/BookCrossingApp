'use strict';

var BookCrossingApp = angular.module('BookCrossingApp', ['dataServices', 'facebookProvider', 'infinite-scroll',  'localization', 'isbnProvider', 'ui.map', 'filters']);

//BookCrossingApp.run(function ($rootScope, $location) {
//    /* PG */
//    BookCrossingApp.initialize();
//},

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

    loadHttpInterceptor($httpProvider);
    loadGoogleAnalytics();
    loadFastClick();
    loadParse();
    loadFB();

}]);

function loadGoogleAnalytics()
{
    var _gaq=[['_setAccount','UA-39828851-1'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));

}

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

        if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
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
