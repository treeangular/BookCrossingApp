'use strict';
BookCrossingApp.directive('bcaHeader', function () {
                // Return the directive configuration.
                return({
				    templateUrl: "/views/header.html",
                    restrict: "E"
                });
 
            }
        );