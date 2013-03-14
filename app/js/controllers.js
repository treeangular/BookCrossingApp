'use strict';

/* Controllers */

function SignInCtrl() {}
SignInCtrl.$inject = [];

function SignUpCtrl($scope) {

    
   // $scope.master = {};
    
    $scope.signUserUp = function() {
        //$scope.master = angular.copy(user);
       // console.write(user);
        console.write("End of signUserUp");
    };

}
SignUpCtrl.$inject = [];

function SignCtrl() { }
SignCtrl.$inject = [];

function MainCtrl() { }
MainCtrl.$inject = [];
