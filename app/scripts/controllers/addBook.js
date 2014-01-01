'use strict';

BookCrossingApp.controller('AddBookCtrl', function ($scope, dataService, $location, isbnService, $rootScope, $q) {

    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){},"AddBook");


    $scope.addNewBook = function () {
        $scope.goTo("views/addBlankBook.html");
    };

    $scope.book = {
        isbn:"",
        description: "",
        image: null,
        title:"",
        authors: null
    };

    function findBook(isbn)
    {
        var deferred = $q.defer();

        isbnService.getGoogleBookInfo(isbn, function(isSuccess, result){

            if(isSuccess)
            {

                deferred.resolve(result);

            }
            else
            {
                deferred.reject(result);

            }
        });

        return deferred.promise;

    }

	$scope.findBook = function () {

        if ($scope.isbn != null)
        {
            $scope.clicked=true;
            $rootScope.$broadcast(loadingRequestConst.Start);
            var promise = findBook($scope.isbn)
            promise.then(function(results) {

                $scope.books = results;
                $scope.clicked=false;
                $rootScope.$broadcast(loadingRequestConst.Stop);


            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;
                $scope.clicked=false;
                $rootScope.$broadcast(loadingRequestConst.Stop);
            });
		}
	};

    $scope.goToRegiter = function(selectedBook){
        $scope.setFoundBook(selectedBook);
        $scope.goTo("views/registerBook.html");
    };

});




