/**
 * Created with JetBrains WebStorm.
 * User: hev
 * Date: 14/08/13
 * Time: 9:17
 * To change this template use File | Settings | File Templates.
 */
//angular.module('BookCrossingApp')
BookCrossingApp.directive('bcaTrackEvent', function () {
    return {
        restrict: "A",
        require: 'name',
        link: function ($scope, elm, attrs, ctrl) {

            $rootScope.gaPlugIn.trackEvent(function(){}, function(){}, element.type, "Click", element.name, 1);
        }
    };
});
