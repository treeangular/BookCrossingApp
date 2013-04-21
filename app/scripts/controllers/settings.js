'use strict';

BookCrossingApp.controller('SettingsCtrl', function ($scope, dataService, $location) {
    $scope.SignOut = function()
    {
        console.log("Going to log out from ctrl");

        //Call DataService signOut function
        dataService.signOut();

        //Back to beginning
        $location.path('/');
    };
  });
