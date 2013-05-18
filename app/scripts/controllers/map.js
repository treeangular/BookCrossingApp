BookCrossingApp.controller('MapCtrl', function($scope, geolocationService,$rootScope) {
    var geoPoint;
    var myPositionIcon = "styles/img/myPosition.png";
    var bookIcon = "styles/img/book.png";

    //Mock map
    angular.extend($scope, {

        /** the initial center of the map */
        centerProperty: {
            latitude: 0,
            longitude: 0
        },

        /** the initial zoom level of the map */
        zoomProperty: 6,


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
            zoomProperty: 12,

            /** list of markers to put in the map */
            markersProperty: [
                {
                latitude: geoPoint.latitude,
                longitude: geoPoint.longitude,
                icon:myPositionIcon,
                url: 'www.google.com'
                },
                {
                    latitude: geoPoint.latitude+0.15,
                    longitude: geoPoint.longitude+0.15,
                    icon:bookIcon,
                    url: 'www.google.com'

                },
                {
                    latitude: geoPoint.latitude+0.02,
                    longitude: geoPoint.longitude+0.02,
                    icon:bookIcon
                },
                {
                    latitude: geoPoint.latitude+0.04,
                    longitude: geoPoint.longitude+0.04,
                    icon:bookIcon
                },
                {
                    latitude: geoPoint.latitude-0.01,
                    longitude: geoPoint.longitude-0.01,
                    icon:bookIcon
                },
                {
                    latitude: geoPoint.latitude+0.02,
                    longitude: geoPoint.longitude+0.02,
                    icon:bookIcon
                },
                {
                    latitude: geoPoint.latitude+0.02,
                    longitude: geoPoint.longitude-0.02,
                    icon:bookIcon
                },
                {
                    latitude: geoPoint.latitude-0.02,
                    longitude: geoPoint.longitude+0.02,
                    icon:bookIcon
                }
            ],

            // These 2 properties will be set when clicking on the map
            clickedLatitudeProperty: null,
            clickedLongitudeProperty: null
        });
        }

    });



});