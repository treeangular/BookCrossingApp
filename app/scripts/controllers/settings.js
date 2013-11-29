'use strict';

BookCrossingApp.controller('SettingsCtrl', function ($scope, dataService, $location, facebookService, $rootScope) {
    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"Settings");

    $scope.SendSuggestion = function()
    {
        $scope.goTo('views/suggestion.html')
    }
    $scope.SignOut = function()
    {
        console.log("Going to log out from ctrl");

        //Call DataService signOut function
        dataService.signOut();

        if(typeof(FB) !== "undefined")
            if($rootScope.currentUser.get("fbId") != undefined)
                facebookService.logout();

        //Back to beginning
        $location.path('/');
    };

    $scope.GoToUpdateProfile = function()
    {
        $location.path('/SignUpDetails');
    };

    $scope.GoToTakeTour = function()
    {
        $location.path('/TakeTour');
    };
  });
