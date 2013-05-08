'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope) {

    $scope.library = {
        image:"styles/img/user.jpg",
        name:$scope.selectedUser,
        favoriteGenre:"Action",
        registrations: 10,
        hunts: 5,
        comments: 25,
        description: "I love sharing books with you!"
    };

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
