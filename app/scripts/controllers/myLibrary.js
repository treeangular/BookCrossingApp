'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope, $rootScope, dataService) {

    $scope.books = [];
    var user;

    var id = $rootScope.currentUserId;

    if($scope.selectedUser == null)
    {
        dataService.getUserById(id, function (isSuccess, result) {
            if(isSuccess)
            {
                user = result;
            }
        });
        alert(user.get("nick"))
    }
    else
    {
        user = $scope.selectedUser;
    }

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

        $scope.getLibraryByUser(user.id);
        $scope.currentPage = $scope.currentPage + 1

        $scope.busy = false;
    };

  });
