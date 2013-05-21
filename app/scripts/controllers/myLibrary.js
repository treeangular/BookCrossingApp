'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope, $rootScope) {

    alert($scope.selectedUser.get('username'))
    if($scope.selectedUser.get('username') == undefined)
    {
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

    //Some test books. TODO: Remove them when we
    $scope.books = [
        {id:'EbLxfEAtDf', title:'A Clockwork orange', image:'styles/img/books/a_clockwork_orange.jpg', owner: "Me", status: "Registered"},
        {id:'EbLxfEAtDf', title:'Lords of the Rings', image:'styles/img/books/lord_of_the_rings.jpg', owner: "Joan", status: "Hunted"},
        {id:'EbLxfEAtDf', title:'1Q84', image:'styles/img/books/1q84.jpg', owner: "Me", status: "Released"},
        {id:'EbLxfEAtDf', title:'A Clockwork orange', image:'styles/img/books/a_clockwork_orange.jpg', owner: "Marc", status: "Released"},
        {id:'EbLxfEAtDf', title:'Lords of the Rings', image:'styles/img/books/lord_of_the_rings.jpg', owner: "Javi", status: "Hunted"},
        {id:'EbLxfEAtDf', title:'1Q84', image:'styles/img/books/1q84.jpg', owner: "Me", status: "Hunted"}
    ];
  });
