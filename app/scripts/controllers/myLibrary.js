'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope, $rootScope, dataService, $q) {

    $scope.books = [];
    $scope.currentPage = 0;
    var user;
    var id = $rootScope.currentUser.id;

    function bindToLibrary(user)
    {
        $scope.library =
        {
            image: user.get('myPicture'),
            name: user.get('nick')== undefined ? "-" : user.get('username'),
            favoriteGenre: user.get('favoriteGenre') == undefined ? "-" : user.get('favoriteGenre'),
            registrations: user.get('registers') == undefined ? "-" : user.get('registers'),
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


    if($scope.selectedUser == null)
    {

        bindToLibrary($rootScope.currentUser);

        var promise = getUserById(id);
        promise.then(function(userLogged) {
            bindToLibrary(userLogged);
        });

    }
    else
    {
       bindToLibrary($scope.selectedUser);
    }

    $scope.getLibraryByUser= function (userId) {
        dataService.getLibraryByUserId(userId, function (isSuccess, results) {
            if(isSuccess)
            {
                    //TODO: Load only first page and then use paging in the NextPage function!
                $scope.$apply(function () {
                    $scope.books = results
                });
            }
        });
    }

    $scope.busy = false;

    $scope.nextPage  = function() {
        if ($scope.busy) return;
        $scope.busy = true;

        if (user!=null)   {
            $scope.getLibraryByUser(user.id);
            $scope.currentPage = $scope.currentPage + 1
        }
        $scope.busy = false;
    };

  });
