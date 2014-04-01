'use strict';

BookCrossingApp.controller('AddZobcCtrl', function ($scope) {


    function findLocation()
    {
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        return deferred.promise;

    }

    function registerNewZobc()
    {

        $scope.clicked=true;
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();

        return deferred.promise;

    }

	$scope.findLocation = function () {
		//TODO: Go to google maps?			
	};
	
	$scope.registerNewZobc = function (zobc) {
		//TODO: Store data in the database
		//Maybe we could send an email to the user with empty BookCrossing labels
	};
  });
