BookCrossingApp.controller('CommentsCtrl', function ($scope, $rootScope, dataService, $q) {

    $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"comment.html");


    $scope.comments = [];
    $scope.addComment = "";


    function getComments(bookId)
    {

        $rootScope.$broadcast(loadingRequestConst.Start);
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

        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        comment.book = $scope.selectedBook;
        dataService.addCommentToBook(comment, function (isSuccess, result) {

            $scope.$apply(function(){
                if(isSuccess)
                {
                    deferred.resolve(result);
                }
                else
                {
                    deferred.reject(result);
                }
            });

        });

        return deferred.promise;

    }

    var promise = getComments($scope.selectedBook.id)
    promise.then(function(comments) {
        $scope.comments = comments;
        $rootScope.$broadcast(loadingRequestConst.Stop);
    }, function(reason) {

        $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
        $rootScope.MessageNotification = reason;
    });

    $scope.addNewComment = function(comment)
    {
            $scope.clicked = true;
            var promise = saveComment(comment)
            promise.then(function(comment) {

                $scope.comments.push(comment)
                $scope.content = "";
                $rootScope.$broadcast(loadingRequestConst.Stop);
                $scope.clicked = false;
            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;
            });

    };


});
