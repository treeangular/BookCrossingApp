'use strict';
BookCrossingApp.controller('ReleaseBookCtrl', function($scope, dataService, geolocationService,$rootScope) {

    //TODO: Get Zobc around the current location
    $scope.zobcList = [
        {id:'0', name:'Are you here?'},
        {id:'112121', name:'Bar Cosmo'},
        {id:'222121', name:'Cafeteria Lola'},
        {id:'112221', name:'Libreria Central'},
        {id:'132121', name:'Biblioteca Universidad Barcelona'}
    ];

    $scope.release = function () {
        var releaseInfo = new Object();

        var geoPoint;

        geolocationService.getCurrentPosition(function (position) {
            geoPoint = {latitude:position.coords.latitude, longitude:position.coords.longitude};

            releaseInfo.bookId = $scope.selectedBook;
            releaseInfo.geoPoint= geoPoint;
            releaseInfo.bookLocationDescription = $scope.bookLocationDescription;

            dataService.releaseBook(releaseInfo,function(isSuccess)
            {
                if(isSuccess)
                {
                    $scope.goTo('views/book.html');
                }
                else
                {
                    $rootScope.ErrorMessage = "Oops . . . Please try again ina  few seconds we couldn't release the book.";
                }
            });
        });
    };
});