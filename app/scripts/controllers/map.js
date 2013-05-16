BookCrossingApp.controller('MapCtrl', function($scope, geolocationService,$rootScope) {
    var geoPoint;


    //Mock map
    angular.extend($scope, {

        /** the initial center of the map */
        centerProperty: {
            latitude: 45,
            longitude: -73
        },

        /** the initial zoom level of the map */
        zoomProperty: 6,

        /** list of markers to put in the map */
        markersProperty: [ {
            latitude: 45,
            longitude: -73
        }],

        // These 2 properties will be set when clicking on the map
        clickedLatitudeProperty: null,
        clickedLongitudeProperty: null
    });

    geolocationService.getCurrentPosition(function (position) {
        geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};

        if (geoPoint!=null){

        angular.extend($scope, {

            /** the initial center of the map */
            centerProperty: {
                latitude: geoPoint.latitude,
                longitude: geoPoint.longitude
            },

            /** the initial zoom level of the map */
            zoomProperty: 6,

            /** list of markers to put in the map */
            markersProperty: [ {
                latitude: geoPoint.latitude,
                longitude: geoPoint.longitude
            }],

            // These 2 properties will be set when clicking on the map
            clickedLatitudeProperty: null,
            clickedLongitudeProperty: null
        });
        }

    });


});