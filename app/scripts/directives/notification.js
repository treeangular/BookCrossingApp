'use strict';
BookCrossingApp.directive('bcaNotification', function () {
				 var notification = 
				 '<div id="notification" bca-slide-show="ErrorMessage!=null" slide-show-duration="2000">' +
				 '{{ErrorMessage}}<a id="close" ng-click="ErrorMessage = null"></a>' +
				 '</div>';
				 
                // Return the directive configuration.
                return({
				    template: notification,
                    restrict: "E"
                });
 
            }
        );