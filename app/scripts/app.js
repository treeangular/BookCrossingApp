'use strict';

var BookCrossingApp = angular.module('BookCrossingApp', ['DataServices']);

//BookCrossingApp.config(function ($locationProvider, $routeProvider) {

//    //$locationProvider.html5Mode(true);
//    //$locationProvider.html5Mode(true).hashPrefix('!');

//    //2 Ways of doing the same??
//    //return $routeProvider.when('/sign', { templateUrl: 'partials/sign.html', controller: SignCtrl }).
//    //when('/signIn', { templateUrl: 'partials/signIn.html', controller: SignInCtrl }).
//    //when('/signUp', { templateUrl: 'partials/signUp.html', controller: SignUpCtrl }).
//    //when('/main', { templateUrl: 'partials/main.html', controller: MainCtrl }).
//    //otherwise({ redirectTo: '/sign' });

//    $routeProvider.
//    when('/', { templateUrl: 'views/sign.html', controller: SignCtrl }).
//    when('/sign', { templateUrl: 'views/sign.html', controller: SignCtrl }).
//    when('/signIn', { templateUrl: 'views/signIn.html', controller: SignInCtrl }).
//    when('/signUp', { templateUrl: 'views/signUp.html', controller: SignUpCtrl }).
//    when('/main', { templateUrl: 'views/main.html', controller: MainCtrl }).
//    when('/addBook', { templateUrl: 'views/addBook.html', controller: AddBookCtrl }).
//    otherwise({ redirectTo: '/sign' });

//});

BookCrossingApp.run(function ($rootScope, $location) {

    /* PG */
    $rootScope.deviceready = false;
    document.addEventListener('deviceready', function () {
        console.log("Report: deviceready");
        navigator.notification.alert("Corodova device ready triggered!");
        $rootScope.deviceready = true;
    }, false);
    /* /PG */

});


BookCrossingApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/Sign.html',
        controller: 'SignCtrl'
      })
      .when('/SignIn', {
        templateUrl: 'views/SignIn.html',
        controller: 'SignInCtrl'
      })
      .when('/SignUp', {
        templateUrl: 'views/SignUp.html',
        controller: 'SignUpCtrl'
      })
      .when('/Sign', {
        templateUrl: 'views/Sign.html',
        controller: 'SignCtrl'
      })
      .when('/Main', {
        templateUrl: 'views/Main.html',
        controller: 'MainCtrl'
      })
      .when('/AddBook', {
        templateUrl: 'views/AddBook.html',
        controller: 'AddBookCtrl'
      })
      .when('/AddZobc', {
        templateUrl: 'views/AddZobc.html',
        controller: 'AddZobcCtrl'
      })
      .when('/MyLibrary', {
        templateUrl: 'views/MyLibrary.html',
        controller: 'MyLibraryCtrl'
      })
      .when('/SignUpDetails', {
        templateUrl: 'views/SignUpDetails.html',
        controller: 'SignUpDetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);



