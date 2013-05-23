'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope, $rootScope, dataService) {


    var userId;
    $scope.books = [];

    if($scope.selectedUser.get('username') == undefined)
    {
        userId = $rootScope.currentUser.get('objectId')
        $scope.library =
        {
            image: $rootScope.currentUser.get('myPicture'),
            name:$rootScope.currentUser.get('nick')== undefined ? "-" : $scope.selectedUser.get('username'),
            favoriteGenre:$rootScope.currentUser.get('favoriteGenre') == undefined ? "-" : $scope.selectedUser.get('favoriteGenre'),
            registrations: $rootScope.currentUser.get('registers') == undefined ? "-" : $scope.selectedUser.get('registers'),
            hunts:  $rootScope.currentUser.get('hunts') == undefined ? "-" : $scope.selectedUser.get('hunts') ,
            comments:  $rootScope.currentUser.get('comments') == undefined ? "-" : $scope.selectedUser.get('comments'),
            description:  $rootScope.currentUser.get('status') == undefined ? "-" : $scope.selectedUser.get('status')
        };
    }
    else
    {
        userId = $scope.selectedUser.id
        $scope.library = {
            image: $scope.selectedUser.get('myPicture'),
            name:$scope.selectedUser.get('nick')== undefined ? "-" : $scope.selectedUser.get('username'),
            favoriteGenre:$scope.selectedUser.get('favoriteGenre') == undefined ? "-" : $scope.selectedUser.get('favoriteGenre'),
            registrations: $scope.selectedUser.get('registers') == undefined ? "-" : $scope.selectedUser.get('registers'),
            hunts:  $scope.selectedUser.get('hunts') == undefined ? "-" : $scope.selectedUser.get('hunts') ,
            comments:  $scope.selectedUser.get('comments') == undefined ? "-" : $scope.selectedUser.get('comments'),
            description:  $scope.selectedUser.get('status') == undefined ? "-" : $scope.selectedUser.get('status')
        };
    }

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
//                    [
//                        {id:'EbLxfEAtDf', title:'A Clockwork orange', image:'styles/img/books/a_clockwork_orange.jpg', owner: "Me", status: "Registered"},
//                        {id:'EbLxfEAtDf', title:'Lords of the Rings', image:'styles/img/books/lord_of_the_rings.jpg', owner: "Joan", status: "Hunted"},
//                        {id:'EbLxfEAtDf', title:'1Q84', image:'styles/img/books/1q84.jpg', owner: "Me", status: "Released"},
//                        {id:'EbLxfEAtDf', title:'A Clockwork orange', image:'styles/img/books/a_clockwork_orange.jpg', owner: "Marc", status: "Released"},
//                        {id:'EbLxfEAtDf', title:'Lords of the Rings', image:'styles/img/books/lord_of_the_rings.jpg', owner: "Javi", status: "Hunted"},
//                        {id:'EbLxfEAtDf', title:'1Q84', image:'styles/img/books/1q84.jpg', owner: "Me", status: "Hunted"}
//                    ];
                });
            }
        });
    }

    $scope.busy = false;

    $scope.nextPage  = function() {
        if ($scope.busy) return;
        $scope.busy = true;

        $scope.getLibraryByUser(userId);
        $scope.currentPage = $scope.currentPage + 1

        $scope.busy = false;
    };

  });
