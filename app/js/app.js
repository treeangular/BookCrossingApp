'use strict';


// Declare app level module which depends on filters, and services
angular.module('bookCrossingApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
   // $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
   // $routeProvider.when('/view2', { templateUrl: 'partials/partial2.html', controller: MyCtrl2 });
    $routeProvider.when('/sign', { templateUrl: 'partials/sign.html', controller: SignCtrl });
    $routeProvider.when('/signIn', { templateUrl: 'partials/signIn.html', controller: SignInCtrl });
    $routeProvider.when('/signUp', { templateUrl: 'partials/signUp.html', controller: SignUpCtrl});
    $routeProvider.when('/main', { templateUrl: 'partials/main.html', controller: MainCtrl });
    $routeProvider.otherwise({ redirectTo: '/sign' });
  }])/*.    TRY INITIALIZE PARSE?!?!?
  run((function($rootScope) {
  });*/

/*
myApp.run(function ($rootScope, $location, $http, $timeout, FooService) {
    $rootScope.foo = FooService;
*/