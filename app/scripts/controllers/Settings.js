'use strict';

BookCrossingApp.controller('SettingsCtrl', function ($scope,DataService, $location) {
    $scope.SignOut = function()
    {
        console.log("Going to log out from ctrl");

        //Call DataService signOut function
        DataService.signOut();

        //Back to beginning
        $location.path('/');
    };
  });
