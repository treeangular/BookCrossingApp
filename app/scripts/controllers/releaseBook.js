'use strict';
BookCrossingApp.controller('ReleaseBookCtrl', function($scope, dataService) {

    //TODO: Get Zobc around the current location
    $scope.zobcList = [
        {id:'0', name:'Are you here?'},
        {id:'112121', name:'Bar Cosmo'},
        {id:'222121', name:'Cafeteria Lola'},
        {id:'112221', name:'Libreria Central'},
        {id:'132121', name:'Biblioteca Universidad Barcelona'}
    ];

    $scope.release = function () {
        //TODO: Save position
    };

    $scope.findLocation = function () {
        //TODO: Use google maps to find the location
    };
});