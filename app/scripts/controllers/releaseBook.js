'use strict';
BookCrossingApp.controller('ReleaseBookCtrl', function($scope, dataService) {

    //TODO: Get Zobc around the current location
    $scope.zobcList = [
        {id:'0', name:'OBZC around you'},
        {id:'112121', name:'Bar Cosmo'},
        {id:'222121', name:'Cafeteria Lola'},
        {id:'112221', name:'Libreria Central'},
        {id:'132121', name:'Biblioteca Universidad Barcelona'}
    ];

    $scope.release = function () {
        //TODO: Use google maps to find the location
    };

    $scope.findLocation = function () {
        //TODO: Use google maps to find the location
    };
});