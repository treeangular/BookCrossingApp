'use strict';
//angular.module('SignComponents',[])
BookCrossingApp.directive('bcaSignUpPassword', function () {
    var templateViewPassword = '<div>' +
        '<input name="username" type="email" class="input username" ng-model="user.Email"  placeholder="Email" required/>' +
        '<input  name="password" type="password" class="input password" ng-model="user.Password"  placeholder="Password" required/>' +
        '<input name="viewPassword"  type="checkbox">' +
        '</div>';

    var templateNoViewPassword =   '<div>' +
        '<input name="username" type="email" class="input username" ng-model="user.Email"  placeholder="Email" required/>'
        '<input ng-hide="showPassword" name="password" type="text" class="input password" ng-model="user.Password"  placeholder="Password" required/>' +
        '<input name="viewPassword"  type="checkbox" placeholder="Password" checked="checked">' +
        '</div>';

    return {

        transclude: true,
        template: templateViewPassword,
        restrict: 'E',
        replace: false,

       complile: function(element, attrs, transclude) {

            var isChecked = element.checked;

           element.html = templateViewPassword;

            return function (scope, element, attrs)
            {
                //scope.signUpPassword = signUpPassword;
                scope.showPassword = isChecked;
            }
        }
    };
  });
