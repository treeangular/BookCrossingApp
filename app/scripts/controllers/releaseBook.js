'use strict';
BookCrossingApp.controller('ReleaseBookCtrl', function($scope, dataService, geolocationService, $rootScope, $q, facebookService) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"ReleaseBook");

    function releaseBook(releaseInfo, registrationId)
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        dataService.releaseBook(releaseInfo,registrationId,function(isSuccess, result)
        {
            //How do I change to another view now?!!? Locate ??
            $scope.$apply(function () {
                if(isSuccess)
                {
                    deferred.resolve(result);

                }
                else
                {
                    deferred.reject(result);

                }

            });
        });

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

    geolocationService.getCurrentPosition(function (position) {
        geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};



        if (geoPoint!=null){

            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude),
                title: "Me",
                icon:myPositionIcon
            });

            $scope.myMarkers.push(marker);

            $scope.myMap.setCenter(new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude));

        }
    });


    $scope.release = function () {
        $rootScope.gaPlugIn.trackEvent(function(){}, function(){alert("Error")}, "Button", "Click", "Release Book", 1);

        //TODO: Validate registrationId is correct, if wrong show error with notification bar
        $scope.clicked=true;
        $rootScope.$broadcast(loadingRequestConst.Start);
        var releaseInfo = new Object();

        releaseInfo.bookId = $scope.selectedBook;
        releaseInfo.geoPoint= geoPoint;
        releaseInfo.bookLocationDescription = $scope.bookLocationDescription;


        var promise = releaseBook(releaseInfo, $scope.registrationId);
        promise.then(function(result) {

            $scope.setSelectedBook(result);

            var promise2 = geolocationService.getCityFromGeopoint(geoPoint.latitude, geoPoint.longitude);


            promise2.then(function(city){

                if(typeof(FB) != 'undefined')
                {
                    alert("inside FB")
                    facebookService.share('released',result.get("title"),result.get("image"), city, function(isSuccess, result){
                        if(!isSuccess)
                        {
                            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                            $rootScope.MessageNotification = result;
                        }

                    });
                }
                $scope.goTo('views/reviewBook.html');

            }, function(error){

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = error;

            })


        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
            $scope.clicked=false;
        });
        $rootScope.$broadcast(loadingRequestConst.Stop);



    };
});