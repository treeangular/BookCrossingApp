'use strict';
BookCrossingApp.directive('bcaNotification', function () {

                // Return the directive configuration.
                return({
				    templateUrl: 'views/notification.html',
                    restrict: "E"
                });
 
            }
        );