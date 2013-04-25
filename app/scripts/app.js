'use strict';


var BookCrossingApp = angular.module('BookCrossingApp', ['dataServices']);
//var BookCrossingApp = angular.module('BookCrossingApp', ['dataServices', 'facebookProvider']);

//BookCrossingApp.run(function ($rootScope, $location) {
//    /* PG */
//$rootScope.deviceready = false;
//document.addEventListener('deviceready', function () {
//    console.log("Report: deviceready");
//    navigator.notification.alert("Corodova device ready triggered! From run");
//    alert("ALERT ONLY - Corodova device ready triggered! From run");
//    //TODO: DEJ What after it is ready, should we actually wait unitl it happens?!
//    // use cordova ready service instead??
//    //BookCrossingApp.initialize();
//    $rootScope.deviceready = true;
//}, false);
///* /PG */
//});

BookCrossingApp.config(['$routeProvider', function ($routeProvider) {
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
  }]);
