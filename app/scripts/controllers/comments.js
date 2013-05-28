BookCrossingApp.controller('CommentsCtrl', function ($scope, $rootScope, dataService) {

    $scope.comments = [];
    $scope.addComment = "";

    //Mock data
    var user = {
        id:"uctPK4BZ3r",
        image: "styles/img/user.jpg",
        nick: "Marc"
    };

    $scope.comments = [
        {content: "This book is wonderfull!",user: user, time: "12 days"},
        {content: "I couldn't find this book!",user: user, time: "2 day"},
        {content: "I couldn't find this book!",user: user, time: "1 day"},
        {content: "I couldn't find this book!",user: user, time: "8 min"},
        {content: "Really boring... I didn't finish it",user: user, time: "1 min"}
    ];

    $scope.addNewComment = function()
    {
        $scope.newcomment = {content: $scope.addComment,user: user, time: "1 sec"};
        $scope.comments.push($scope.newcomment)
        $scope.addComment = "";
    };


});
