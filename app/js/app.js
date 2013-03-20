'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('bookCrossingApp', ['myApp.filters', 'DataServices', 'myApp.directives']);
/*
app.config(function (ParseProvider) {
    ParseProvider.initialize(PARSE_APP_ID, PARSE_REST_API_KEY);
});*/

app.config(function ($locationProvider,$routeProvider) {
   
    //$locationProvider.html5Mode(true);
    //$locationProvider.html5Mode(true).hashPrefix('!');
   
    //2 Ways of doing the same??
    //return $routeProvider.when('/sign', { templateUrl: 'partials/sign.html', controller: SignCtrl }).
    //when('/signIn', { templateUrl: 'partials/signIn.html', controller: SignInCtrl }).
    //when('/signUp', { templateUrl: 'partials/signUp.html', controller: SignUpCtrl }).
    //when('/main', { templateUrl: 'partials/main.html', controller: MainCtrl }).
    //otherwise({ redirectTo: '/sign' });
    
    $routeProvider.
    when('/', { templateUrl: 'partials/sign.html', controller: SignCtrl }).
    when('/sign', { templateUrl: 'partials/sign.html', controller: SignCtrl }).
    when('/signIn', { templateUrl: 'partials/signIn.html', controller: SignInCtrl }).
    when('/signUp', { templateUrl: 'partials/signUp.html', controller: SignUpCtrl }).
    when('/main', { templateUrl: 'partials/main.html', controller: MainCtrl }).
    when('/addBook', { templateUrl: 'partials/addBook.html', controller: AddBookCtrl }).
    otherwise({ redirectTo: '/sign' });

});

/*app.run(function (Parse) {
    return Parse.auth.resumeSession();
});
*/
