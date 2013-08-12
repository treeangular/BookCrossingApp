'use strict';

BookCrossingApp.controller('TakeTourCtrl', function ($scope,$rootScope) {

    $rootScope.gaPlugIn.trackPage(function(){}, function(){},"Take a Tour");

    $scope.SharingStep1Class = 'step1Selected stepLeft';
    $scope.SharingStep2Class = 'step2 stepMiddle';
    $scope.SharingStep3Class = 'step3 stepRight';

    $scope.FindingStep1Class = 'step1Selected stepLeft';
    $scope.FindingStep2Class = 'step2 stepRight';

    $scope.stepSharing = 1;
    $scope.stepFinding=1;


    $scope.selectSharingStep = function(number)
    {
        $scope.stepSharing=number;
        if (number==1){
            $scope.SharingStep1Class = 'step1Selected stepLeft';
            $scope.SharingStep2Class = 'step2 stepMiddle';
            $scope.SharingStep3Class = 'step3 stepRight';
        }
        else if (number==2){
            $scope.SharingStep1Class = 'step1 stepLeft';
            $scope.SharingStep2Class = 'step2Selected stepMiddle';
            $scope.SharingStep3Class = 'step3 stepRight';
        }
        else if (number==3){
            $scope.SharingStep1Class = 'step1 stepLeft';
            $scope.SharingStep2Class = 'step2 stepMiddle';
            $scope.SharingStep3Class = 'step3Selected stepRight';
        }
    }

    $scope.selectFindingStep = function(number)
    {
        $scope.stepFinding=number;
        if (number==1){
            $scope.FindingStep1Class = 'step1Selected stepLeft';
            $scope.FindingStep2Class = 'step2 stepRight';
        }
        else if (number==2){
            $scope.FindingStep1Class = 'step1 stepLeft';
            $scope.FindingStep2Class = 'step2Selected stepRight';
        }
    }
});
