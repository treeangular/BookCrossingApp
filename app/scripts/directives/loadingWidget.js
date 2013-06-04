'use strict';
BookCrossingApp.directive('loadingWidget', [function () {
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
}]);
