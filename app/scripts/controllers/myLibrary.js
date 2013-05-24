'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope, $rootScope, dataService) {

    $scope.books = [];
    var user;

    user = $scope.selectedUser == null ? $rootScope.currentUser : $scope.selectedUser;

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

                    for (var i=0;i<results.length;i++)
                    {
                        var action = results[i];
                        var book = action.get('bookPointer');
                        var actionType = action.get('actionTypePointer');
                        var title = "not defined";
                        var description = "not defined";
                        var image = "not defined";

                        if (book != null)
                        {
                            title = book.get('title');
                            description = book.get('description');
                            image = book.get('image');
                        }

                        $scope.newBook = {
                            title: title,
                            image: image

                        };

                        $scope.books.push($scope.newBook);
                    }
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
