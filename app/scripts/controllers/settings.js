'use strict';

BookCrossingApp.controller('SettingsCtrl', function ($scope, dataService, $location, facebookService, $rootScope) {
    $scope.SignOut = function()
    {
        console.log("Going to log out from ctrl");

        //Call DataService signOut function
        dataService.signOut();

        if($rootScope.currentUser.get("fbId") != undefined)
            facebookService.logout();

        //Back to beginning
        $location.path('/');
    };

    $scope.GoToUpdateProfile = function()
    {
        $location.path('/SignUpDetails');
    };
  });
