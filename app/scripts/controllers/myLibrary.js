'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope, $rootScope, dataService, $q) {

    $scope.books = [];
    $scope.currentPage = 0;
    var user;
    var id = $rootScope.currentUser.id;

    function bindToLibrary(user){
        $scope.library =
        {
            image: user.get('myPicture'),
            name: user.get('nick')== undefined ? "-" : user.get('username'),
            favoriteGenre: user.get('favoriteGenre') == undefined ? "-" : user.get('favoriteGenre'),
            registrations: user.get('registered') == undefined ? "-" : user.get('registered'),
            hunts:  user.get('hunts') == undefined ? "-" : user.get('hunts') ,
            comments:  user.get('comments') == undefined ? "-" : user.get('comments'),
            description:  user.get('status') == undefined ? "-" : user.get('status')
        };

    }
    function getUserById(id){
        var deferred = $q.defer();
        dataService.getUserById(id, function (isSuccess, result) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(result);
                }
                else
                {
                    deferred.reject();
                }
            });

        });

        return deferred.promise;
    }
    function getLibraryByUserId(id){
        var deferred = $q.defer();
        dataService.getLibraryByUserId(id, function (isSuccess, results) {
            $scope.$apply(function(){
                if(isSuccess)
                {
                                    //TODO: Load only first page and then use paging in the NextPage function!
                    deferred.resolve(results);

                }
                else
                {
                    deferred.reject();
                }
            });
        });

        return deferred.promise;
    }

    if($scope.selectedUser == null)
    {
        id = $rootScope.currentUser.id;
        //Get the user from rootScope
        bindToLibrary($rootScope.currentUser);

        var promise = getUserById(id);
        promise.then(function(userLogged) {
            $rootScope.currentUser = userLogged;
            bindToLibrary(userLogged);
        });

    }
    else
    {
       id = $scope.selectedUser.id;
       bindToLibrary($scope.selectedUser);
    }



    $scope.busy = false;

    $scope.nextPage  = function() {
        if ($scope.busy) return;

            $scope.busy = true;
            var promise = getLibraryByUserId(id)
            promise.then(function(books) {
                $scope.books = books;
            });
            $scope.currentPage = $scope.currentPage + 1
            $scope.busy = false;
    };

  });
