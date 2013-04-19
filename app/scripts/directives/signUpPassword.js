'use strict';
//angular.module('SignComponents',[])
BookCrossingApp.directive('bcaSignUpPassword', function () {

    return {

        //template: templateViewPassword,
        restrict: 'E',

        link: function(scope, element, attrs) {

            scope.$watch('viewPasswordCheckbox',

                function (newValue) {

                    var show = newValue ? 1 : 2,
                        hide = newValue ? 2 : 1;

                    element.find('input')[hide].style.display = 'none';
                    element.find('input')[show].style.display = '';
                })

        }
    };
});

//    return {
//
//        // template: templateViewPassword,
//        replace:true,
//        restrict: 'E',
//
//        link: function(scope, element, attrs) {
//
//            scope.$watch('viewPasswordCheckbox',
//                function (newValue) {
//                    if(newValue)
//                    {
//                        $(element).find('input:eq(1)').attr('type', 'text')
//                    }
//                    else
//                    {
//                        $(element).find('input:eq(1)').attr('type', 'password')
//                    }
//                })
//
//        }
//    };
//});



