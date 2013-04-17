'use strict';

BookCrossingApp.controller('SignInCtrl', function ($scope, DataService, $location) {
    $scope.isVisible = false;
	$scope.close = function() {
                     $scope.isVisible = false;
                };
				
    $scope.signInUser = function (user) {
        DataService.signIn(user.Email, user.Password, function (result) {
            //How do I change to another view now?!!? Locate ?? 
            $scope.$apply(function () {
                $scope.registerResult = result ? "Success" : "Failed";
				$scope.isVisible = false;

                if (result) {
                    $scope.registerResult = "Success";
                    $location.path('/Main');
                } else {
                    $scope.registerResult = "Fail!";
					$scope.ErrorMessage = "User or password invalid!";
					$scope.isVisible = true;
					$location.path('/');
                }

            });
        });
    };
});
