'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('bookCrossingApp', ['myApp.filters', 'DataServices', 'myApp.directives']);
/*
app.config(function (ParseProvider) {
    ParseProvider.initialize(PARSE_APP_ID, PARSE_REST_API_KEY);
});*/

app.config( function ($routeProvider) {
   
    //ParseProvider.initialize(PARSE_APP_ID, PARSE_REST_API_KEY);
    
    //Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);

    //return $routeProvider.when('/sign', { templateUrl: 'partials/sign.html', controller: SignCtrl }).
    //when('/signIn', { templateUrl: 'partials/signIn.html', controller: SignInCtrl }).
    //when('/signUp', { templateUrl: 'partials/signUp.html', controller: SignUpCtrl }).
    //when('/main', { templateUrl: 'partials/main.html', controller: MainCtrl }).
    //otherwise({ redirectTo: '/sign' });
    
    $routeProvider.when('/sign', { templateUrl: 'partials/sign.html', controller: SignCtrl }).
    when('/signIn', { templateUrl: 'partials/signIn.html', controller: SignInCtrl }).
    when('/signUp', { templateUrl: 'partials/signUp.html', controller: SignUpCtrl }).
    when('/main', { templateUrl: 'partials/main.html', controller: MainCtrl }).
    otherwise({ redirectTo: '/sign' });

});

/*app.run(function (Parse) {
    return Parse.auth.resumeSession();
});
*/
