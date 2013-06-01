BookCrossingApp.controller('CommentsCtrl', function ($scope, $rootScope, dataService, $q) {

    $scope.comments = [];
    $scope.addComment = "";

    function getComments(bookId)
    {

        var deferred = $q.defer();
        dataService.getCommentsByBookId(bookId, function (isSuccess, results) {

            $scope.$apply(function(){
                if(isSuccess)
                {
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

    function saveComment(comment)
    {
        var deferred = $q.defer();
        dataService.addCommentToBook(comment, function (isSuccess, result) {

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

    var promise = getComments($scope.selectedBook.id)
    promise.then(function(comments) {
        $scope.comments = comments;
    });

    $scope.addNewComment = function()
    {
        var comment = [];

        comment.comment = $scope.content
        comment.book = $scope.selectedBook;

        var promise = saveComment(comment)
        promise.then(function(comment) {
            $scope.comments.push(comment)
            $scope.addComment = "";
        });


    };


});
