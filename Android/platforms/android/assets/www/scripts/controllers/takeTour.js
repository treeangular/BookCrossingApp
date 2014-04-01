'use strict';

BookCrossingApp.controller('TakeTourCtrl', function ($scope,$rootScope, $location) {
    $rootScope.option = "register";
    $scope.option1 = "register";
    $scope.option2 = "find";

    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"Take a Tour");

    $scope.SharingStep1Class = 'step1Selected stepLeft';
    $scope.SharingStep2Class = 'step2 stepMiddle';
    $scope.SharingStep3Class = 'step3 stepRight';

    $scope.FindingStep1Class = 'step1Selected stepLeft';
    $scope.FindingStep2Class = 'step2 stepRight';

    $scope.stepSharing = 1;
    $scope.stepFinding=1;

    $scope.goToScreenShot = function(option)
    {
        if (option==1){
            $rootScope.option = $scope.option1;
        }
        else{
            $rootScope.option = $scope.option2;
        }
        $location.path('/ScreenShots');
    }


    $scope.selectSharingStep = function(number)
    {
        $scope.stepSharing=number;
        if (number==1){
            $scope.option1 = "register";
            $scope.SharingStep1Class = 'step1Selected stepLeft';
            $scope.SharingStep2Class = 'step2 stepMiddle';
            $scope.SharingStep3Class = 'step3 stepRight';
        }
        else if (number==2){
            $scope.option1 = "release";
            $scope.SharingStep1Class = 'step1 stepLeft';
            $scope.SharingStep2Class = 'step2Selected stepMiddle';
            $scope.SharingStep3Class = 'step3 stepRight';
        }
        else if (number==3){
            $scope.option1 = "follow";
            $scope.SharingStep1Class = 'step1 stepLeft';
            $scope.SharingStep2Class = 'step2 stepMiddle';
            $scope.SharingStep3Class = 'step3Selected stepRight';
        }
    }

    $scope.selectFindingStep = function(number)
    {
        $scope.stepFinding=number;
        if (number==1){
            $scope.option2 = "find";
            $scope.FindingStep1Class = 'step1Selected stepLeft';
            $scope.FindingStep2Class = 'step2 stepRight';
        }
        else if (number==2){
            $scope.option2 = "hunt";
            $scope.FindingStep1Class = 'step1 stepLeft';
            $scope.FindingStep2Class = 'step2Selected stepRight';
        }
    }
});
