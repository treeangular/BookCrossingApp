'use strict';

/* Controllers */

function SignInCtrl($scope) {
    
    var PARSE_APP_ID = "khg4ef8Mks6oP2AjjVlvYHnoEIzLnsaW7Tb23jow";
    var PARSE_JS_ID = "8KZKpONdEWQZNBteRkJWCtBks3YxuO55THQhQ7qI";

    function initParse() {
        Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);
    }

    //this should be done in starting =>Actually if this fails for us is like being offline
    //Should be online a $rootScope property so we can check it at any time?!
    initParse();

    $scope.signInUser = function () {
        Parse.User.logIn($scope.userEmail, $scope.userPassword, {
            success: function() {
                //location(#/main);
                //$.mobile.changePage("main.html", { transition: "slide" });
                $scope.$apply(function() {
                    $scope.registerResult = "Register was succesful for user" + email;
                });
            },
            error: function(error) {
                //Desired functionallyty
                /*
                Show error - Go to mode offline - Go back to login page
                */
                $scope.registerResult = "Error: " + error.code + " " + error.message + ". Getting into offline mode => No new user can be added at this moment.";
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };
   

}


//SignInCtrl.$inject = [];

function SignUpCtrl($scope) {
   // $scope.master = {};
    
    //this should be done in starting =>Actually if this fails for us is like being offline
    //Should be online a $rootScope property so we can check it at any time?!
    initParse();


    $scope.signUpUser = function(user) {
       // $scope.master = angular.copy(user);
        $scope.registerResult = "Register was succesful for user" + user.email;
    };
    
    $scope.registerNewUser = function () {
        var newUser = new Parse.User();
        newUser.save({
            email: $scope.userEmail,
            password: $scope.userPassword
        }, {
            success: function (registersuccess) {
                $scope.$apply(function () {
                    $scope.registerResult = "Register was succesful for user" + email;
                });
            },
            error: function (error) {
                //Desired functionallyty
                /*
                Show error - Go to mode offline - Go back to login page
                */
                $scope.registerResult = "Error: " + error.code + " " + error.message + ". Getting into offline mode => No new user can be added at this moment.";
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };


}
//Dependency injection - http://stackoverflow.com/questions/11847376/angular-js-scope-error
//SignUpCtrl.$inject = ['$scope'];

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
