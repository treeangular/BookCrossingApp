'use strict';

/* Controllers */
    
function SignInCtrl($scope, DataService, $location) {

    $scope.signInUser = function (user) {
        DataService.signIn(user.Email, user.Password, function (result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                $scope.registerResult = result ? "Success" : "Failed";

                if (result) {
                    $scope.registerResult = "Success";
                    $location.path('/main');
                } else {
                    $scope.registerResult = "Fail!";
                    $location.path('/');
                }

            }); 
        });
    };
};
    
SignInCtrl.$inject = ['$scope', 'DataService', '$location'];

function SignUpCtrl($scope, DataService, $location) {
        // $scope.master = {};
    $scope.registerNewUser = function (user) {
        
        DataService.registerNewUser(user, function (result) {
                //How do I change to another view now?!!? Locate ?? 
                $scope.$apply(function () {
                    $scope.registerResult = result ? "Success" : "Failed";
                });
            if (result) {
                $scope.registerResult = "Success";
                $location.path('/main');
            }
            else {
                $scope.registerResult = "Fail!";
                $location.path('/');
            }
        });
        };
};
//Dependency injection - http://stackoverflow.com/questions/11847376/angular-js-scope-error
SignUpCtrl.$inject = ['$scope', 'DataService', '$location'];

function SignCtrl($scope, DataService, $location) {

    DataService.isCurrentUser(function(result) {
        if (result) {
            $location.path('/main');
        }
        else {
            $location.path('/');
        }

    });
}
SignUpCtrl.$inject = ['$scope', 'DataService', '$location'];

function MainCtrl() { }
MainCtrl.$inject = [];
