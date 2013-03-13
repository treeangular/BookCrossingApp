'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', { templateUrl: 'partials/partial2.html', controller: MyCtrl2 });
    $routeProvider.when('/sign', { templateUrl: 'partials/sign.html', controller: SignCtrl });
    $routeProvider.when('/signIn', { templateUrl: 'partials/signIn.html', controller: SignInCtrl });
    $routeProvider.when('/signUp', { templateUrl: 'partials/signUp.html', controller: SignUpCtrl });
    $routeProvider.otherwise({ redirectTo: '/sign' });
  }]);
