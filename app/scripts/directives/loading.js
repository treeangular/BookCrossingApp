'use strict';
angular.module('BookCrossingApp')
    .directive('bcaDatepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        ngModelCtrl.$setViewValue(date);
                        scope.$apply();
                    }
                });
            });
        }
    }
});

angular.module('BookCrossingApp')
  .directive('bcaLoading', function () {
    return {
        restrict: "A",
        link: function ($scope, element) {
            // hide the element initially
            element.hide();

            $scope.$on(loadingRequestConst.Start, function () {
                // got the request start notification, show the element
                element.show();
            });

            $scope.$on(loadingRequestConst.Stop, function () {
                // got the request end notification, hide the element
                element.hide();
            });
        }
    };
  });
