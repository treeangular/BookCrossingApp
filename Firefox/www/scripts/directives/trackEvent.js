/**
 * Created with JetBrains WebStorm.
 * User: hev
 * Date: 14/08/13
 * Time: 9:17
 * To change this template use File | Settings | File Templates.
 */
//angular.module('BookCrossingApp')
BookCrossingApp.directive('bcaTrackEvent', function ($rootScope) {
    return {
        restrict: "A",
        link: function ($scope, element, attributes, ctrl) {

            element.on("click", function() {

                if($rootScope.gaPlugIn !== undefined)
                $rootScope.gaPlugIn.trackEvent(function(){}, function(){}, attributes.type, "Click", attributes.value, 1);

            });
        }
    };
});
