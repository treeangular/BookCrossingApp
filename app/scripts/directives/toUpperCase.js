'use strict';

BookCrossingApp.directive('bcaToUpperCase', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var toUpperCase = function(inputValue) {
                var upperCased = inputValue.toUpperCase();
                if(upperCased !== inputValue) {
                    modelCtrl.$setViewValue(upperCased);
                    modelCtrl.$render();
                }
                return upperCased;
            }
            modelCtrl.$parsers.push(toUpperCase);
            toUpperCase(scope[attrs.ngModel]);  // toUpperCase initial value
        }
    };
});