'use strict';

BookCrossingApp.controller('MyLibraryCtrl', function ($scope, $rootScope, dataService, $q, cache) {

    if($rootScope.gaPlugIn !== undefined)
        $rootScope.gaPlugIn.trackPage(function(){}, function(){alert("Error")},"MyLibrary");

    $scope.books = [];

    $scope.listView = true;
    var user;
    var id = $rootScope.currentUser.id;


    if(cache.getIsLibraryFirstTimeExecuted())
    {
        if($scope.selectedUser != null)
        {
            id = $scope.selectedUser.id;

            $rootScope.$broadcast(loadingRequestConst.Start);
            var promise = getLibraryByUserId(id)
            promise.then(function(books) {

                $rootScope.$broadcast(loadingRequestConst.Stop);
                $scope.books = books;

            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;
            });
        }
        else
        {

            var promise = cache.getCachedBooksFromMyLibrary(id);
            cache.setIsLibraryFirstTimeExecuted(false);
            promise.then(function(books) {

                $scope.books = books;

            }, function(reason)
            {
                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = ErrorConst.GenericError;

            });
        }



    }
    else
    {
        if($scope.selectedUser == null)
        {
            $scope.books = cache.getCachedBooksFromMyLibrary(id);
        }
        else
        {
            var promise = getLibraryByUserId($scope.selectedUser.id)
            promise.then(function(books) {

                $scope.books = books;

            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;
            });
        }
    }

    function updateStatus(status)
    {
        var deferred = $q.defer();
        dataService.updateStatus(status, function (isSuccess, result) {

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

    function bindToLibrary(user){
        $scope.library =
        {
            image: user.get('myPicture')== undefined ? "styles/img/user.png" : user.get('myPicture'),
            nick: user.get('nick')== undefined ? "Undefined" : user.get('nick'),
            favoriteGenre: user.get('favoriteGenre') == undefined ? "Undefined" : user.get('favoriteGenre'),
            registrations: user.get('registered') == undefined ? "0" : user.get('registered'),
            hunts:  user.get('hunted') == undefined ? "0" : user.get('hunted') ,
            comments:  user.get('comments') == undefined ? "0" : user.get('comments'),
            status:  user.get('status') == undefined ? "" : user.get('status')
        };

    }

    $scope.changeView  = function() {
        $scope.listView = !$scope.listView;
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
                    deferred.reject(result);
                }
            });

        });

        return deferred.promise;
    }

    function getLibraryByUserId(id){
        $rootScope.$broadcast(loadingRequestConst.Start);
        var deferred = $q.defer();
        dataService.getLibraryByUserId(id, function (isSuccess, results) {
            $scope.$apply(function(){
                if(isSuccess)
                {
                   //TODO: Load only first page and then use paging in the NextPage function!
                    deferred.resolve(results);
                }
                else
                {
                    deferred.reject(results);
                }
                $rootScope.$broadcast(loadingRequestConst.Stop);
            });
        });

        return deferred.promise;
    }

    if($scope.selectedUser == null)
    {
        id = $rootScope.currentUser.id;
        //Get the user from rootScope
        bindToLibrary($rootScope.currentUser);

        var promise = getUserById(id);
        promise.then(function(userLogged) {
            $rootScope.currentUser = userLogged;
            bindToLibrary(userLogged);
        }, function(reason) {

            $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
            $rootScope.MessageNotification = reason;
        });

    }
    else
    {
       id = $scope.selectedUser.id;
       bindToLibrary($scope.selectedUser);
    }

    $scope.updateUserStatus = function () {

        $rootScope.$broadcast(loadingRequestConst.Start);
            var promise = updateStatus($scope.library.status)
            promise.then(function(result) {


            }, function(reason) {

                $rootScope.TypeNotification = ErrorConst.TypeNotificationError;
                $rootScope.MessageNotification = reason;

            });
        $rootScope.$broadcast(loadingRequestConst.Stop);

    };


  });
