'use strict';
BookCrossingApp.controller('ReleaseBookCtrl', function($scope, dataService, geolocationService, $rootScope, $q, facebookService, $timeout) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"ReleaseBook");

    function releaseBook(releaseInfo, registrationId)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.releaseBook(releaseInfo,registrationId).then(
            function(result){

              deferred.resolve(result);

            },function(error){

               deferred.reject(error);

            })

        return deferred.promise;
    }

    //TODO: Get Zobc around the current location
    $scope.zobcList = [
        {id:'0', name:'Are you here?'},
        {id:'112121', name:'Bar Cosmo'},
        {id:'222121', name:'Cafeteria Lola'},
        {id:'112221', name:'Libreria Central'},
        {id:'132121', name:'Biblioteca Universidad Barcelona'}
    ];

    var geoPoint;
    $scope.myMarkers = [];
    var myPositionIcon = "styles/img/myPosition.gif";
    var bookIcon = "styles/img/book.png";
    var zobcIcon = "styles/img/zobc.png";

    $scope.mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    //TODO hev: see how to make it with $timeout
    $scope.$on('$destroy', function(e) {
       clearInterval(timer);
    });

    var getPosition = function(position){

        geolocationService.getCurrentPosition(function (position) {
            geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};

            if (geoPoint != null){

                var marker = new google.maps.Marker({
                    map: $scope.myMap,
                    position: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
                    title: "Me",
                    icon:myPositionIcon
                });
                for (var i = 0; i < $scope.myMarkers.length; i++) {
                    $scope.myMarkers[i].setMap($scope.myMap);
                }
                $scope.myMarkers.push(marker);
                $scope.myMap.setCenter(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));

            }
        });
    }

   var timer =  setInterval(getPosition, 5000);

    $scope.release = function () {

       $scope.clicked=true;
       $rootScope.$broadcast(loadingRequestConst.Start);
       var releaseInfo = new Object();
       var bookToRelease;

       var geoPoint;

       //First we call the geoLocationService to get the current GeoPoint
       geolocationService.getCurrentPositionPromise().then(function(geoLocationPoint){

          geoPoint = {latitude:geoLocationPoint.coords.latitude, longitude:geoLocationPoint.coords.longitude};
          releaseInfo.bookId = $scope.selectedBook;
          releaseInfo.geoPoint= geoPoint;
          releaseInfo.bookLocationDescription = $scope.bookLocationDescription;


          //After getting the release info we release the book
          return releaseBook(releaseInfo, $scope.registrationId);

        }).then(function(result){


          bookToRelease = result;
          //After release the book we get the city where has been released to pass it FB
          $scope.setSelectedBook(result);
          return geolocationService.getCityFromGeoPoint(geoPoint.latitude, geoPoint.longitude);

        }).then(function(city){

               $scope.selectedBook.city = city;
               $scope.clicked=false;
               $rootScope.$broadcast(loadingRequestConst.Stop);
               $scope.goTo('views/reviewBook.html');

           }, function(error){


            $scope.clicked=false;
            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = error;
         });



    };
});