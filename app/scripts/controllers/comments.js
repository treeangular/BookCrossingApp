BookCrossingApp.controller('CommentsCtrl', function ($scope, $rootScope, dataService) {

    $scope.comments = [];

    //Mock data
    var user = {
        id:"XABDASDS",
        image: "/styles/img/user.jpg",
        nick: "Marc"
    };

    $scope.comments = [
    {content: "This book is wonderfull!",user: user, time: "1 sec"},
    {content: "I couldn't find this book!",user: user, time: "5 min"},
    {content: "Really boring... I didn't finish it",user: user, time: "12 days"}
    ];

});
