'use strict';
//angular.module('SignComponents',[])
BookCrossingApp.directive('signUpPassword', function () {
    var templateViewPassword = '<div>' +
        '<input  name="password" type="password" class="input password" ng-model="user.Password"  placeholder="Password" required/>' +
        '<input name="viewPassword"  type="checkbox">' +
        '</div>';

    var templateNoViewPassword =   '<div>' +
        '<input ng-hide="showPassword" name="password" type="text" class="input password" ng-model="user.Password"  placeholder="Password" required/>' +
        '<input name="viewPassword"  type="checkbox" placeholder="Password" checked="checked">' +
        '</div>';

    return {

        transclude: true,
        template: templateViewPassword,
        restrict: 'E',
        replace: false
        /* template:  '<div>' +
            '<input ng-hide="showPassword" name="password" type="text" class="input password" ng-model="user.Password"  placeholder="Password" required/>' +
            '<input name="viewPassword"  type="checkbox" placeholder="Password" checked="checked">' +
            '</div>'     */
                    // ,

//        compile:function($tElement,$tAttrs){
//            var el = $tElement[0];
//            if(el.getAttribute('type')){
//                el.removeAttribute('type');
//                el.setAttribute($tAttrs.type,'');
//                return function(scope){
//                    $compile(el)(scope);
//                }
//            }}
//       complile: function(tElement, tAttrs, transclude) {
//
//            var isChecked = tElement.checked;
//
//            tElement.html = templateViewPassword;
//
//            return function (scope, element, attrs)
//            {
//                //scope.signUpPassword = signUpPassword;
//                scope.showPassword = isChecked;
//            }
//        }
    };
  });
