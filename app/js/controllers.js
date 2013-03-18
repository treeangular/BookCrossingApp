'use strict';

/* Controllers */
    
function SignInCtrl($scope, DataService) {

    $scope.signInUser = function (user) {
        DataService.signIn(user.Email, user.Password, function (result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                $scope.registerResult = result ? "Success" : "Failed";
            }); 
        });
    };
};
    
SignInCtrl.$inject = ['$scope', 'DataService'];

function SignUpCtrl($scope, DataService) {
        // $scope.master = {};
    $scope.registerNewUser = function (user) {
        
        DataService.registerNewUser(user, function (result) {
                //How do I change to another view now?!!? Locate ?? 
                $scope.$apply(function () {
                    $scope.registerResult = result ? "Success" : "Failed";
                });
            });
        };
};
//Dependency injection - http://stackoverflow.com/questions/11847376/angular-js-scope-error
SignUpCtrl.$inject = ['$scope', 'DataService'];

function SignCtrl() {
   /* //Check localStorge for user info.
    var dbShell = window.openDatabase("BookCrossingApp", 2, "BookCrossingApp", 1000000);
    //doLog("db was opened");
    //run transaction to create initial tables
    dbShell.transaction(setupTable, dbErrorHandler, getEntries);

    function setupTable(tx) {
        //doLog("Going to create the table if it dosent exist");
        tx.executeSql("CREATE TABLE IF NOT EXISTS dreams(id INTEGER PRIMARY KEY,title,body,updated)");
    }

    function dbErrorHandler(err) {
        //alert("DB Error: " + err.message + "\nCode=" + err.code);

        try {
            // doLog("dbErrorHandler WebSql Error: " + err.message + "\nCode=" + err.code);
        } catch (e) {
            // doLog("dbErrorHandler Parse Error: " + err);
        }
    }*/

}
//SignCtrl.$inject = [];

function MainCtrl() { }
MainCtrl.$inject = [];
