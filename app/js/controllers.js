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
        
        DataService.registerNewUser(user, function (isResult,result) {
                //How do I change to another view now?!!? Locate ?? 
                $scope.$apply(function () {
                    $scope.registerResult = isResult ? "Success" : result;
                });
            if (isResult) {
                //$scope.registerResult = "Success";
                $location.path('/main');
            }
            else {
                $scope.registerResult = "Fail!";
                //$location.path('/');
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


function MainCtrl($scope, DataService, $location)
{
    
    //$scope.bookList = function() {
        
            // Call the service and fetch the list of signatures that match the given petition ID
            DataService.getBooks(function (results) {
                $scope.$apply(function () {
                    // Apply the results to the signatureList model so it will refresh the table in the view
                    $scope.bookList = results;
                });
            });
       
    //};
}
MainCtrl.$inject = ['$scope', 'DataService'];

function AddBookCtrl($scope, DataService, $location) {

    $scope.registerNewBook = function (book) {
        DataService.registerBook(book, function (isResult, result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                $scope.registerResult = isResult ? "Success" : result;
            });
            if (isResult) {
                //$scope.registerResult = "Success";
                $location.path('/main');
            }
            else {
                $scope.registerResult = "Fail!";
                //$location.path('/');
            }
        });
    };

}
AddBookCtrl.$inject = ['$scope', 'DataService', '$location'];

