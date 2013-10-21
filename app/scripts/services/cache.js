/**
 * Created with JetBrains WebStorm.
 * User: Javito
 * Date: 25/09/13
 * Time: 22:52
 * To change this template use File | Settings | File Templates.
 */
angular.module('parseCache', [])
    .provider('cache', function(){
        // internal configuration data; configured through setter function
        this.actions = [];
        this.booksFromRelease = [];
        this.booksFromMyLibrary = [];
        this.isHomeFirstTimeExecuted = true;
        this.isReleaseFirstTimeExecuted = true;
        this.isLibraryFirstTimeExecuted = true;
        this.isCacheEnable = false;
        this.cacheTime = 0;

        this.$get = function(dataService, $q, $rootScope) {

            function getActPage(pageNumber)
            {
                var deferred = $q.defer();
                dataService.getActionsForHomePage(pageNumber, function (isSuccess,results) {

                    $rootScope.$apply(function () {
                        if(isSuccess)
                        {
                            deferred.resolve(results);
                        }
                        else
                        {
                            deferred.reject(results);
                        }
                    });
                });
                return deferred.promise;
            };

            function getBooksFromRelease()
            {
                var deferred = $q.defer();
                dataService.getBooksThatCanBeReleased(function (isSuccess, results) {

                    $rootScope.$apply(function () {
                        if(isSuccess)
                        {
                            booksFromRelease = results;
                            deferred.resolve(results);
                        }
                        else
                        {
                            deferred.reject(results);
                        }
                    });

                });
                return deferred.promise;
            }

            function getLibraryByUserId(id){

                var deferred = $q.defer();

                dataService.getLibraryByUserId(id, function (isSuccess, results) {

                    $rootScope.$apply(function () {
                        if(isSuccess)
                        {
                            //TODO: Load only first page and then use paging in the NextPage function!
                            booksFromMyLibrary = results;
                            deferred.resolve(results);
                        }
                        else
                        {
                            deferred.reject(results);
                        }

                    });
                });

                return deferred.promise;
            }

            var actions = this.actions;
            var booksFromRelease = this.booksFromRelease;
            var booksFromMyLibrary = this.booksFromMyLibrary;
            var isHomeFirstTimeExecuted = this.isHomeFirstTimeExecuted;
            var isReleaseFirstTimeExecuted = this.isReleaseFirstTimeExecuted;
            var isLibraryFirstTimeExecuted = this.isLibraryFirstTimeExecuted;
            var isCacheEnable = this.isCacheEnable;
            var cacheTime = this.cacheTime;

            return {

                 getCachedActions: function() {

                    if(isHomeFirstTimeExecuted)
                    {
                        var deferred = $q.defer();
                        var promise = getActPage(0);
                        promise.then(function(alerts) {

                            actions = alerts;
                            deferred.resolve(alerts);

                        }, function(reason)
                        {
                            deferred.reject(reason);
                        });
                        setInterval(getActPage, cacheTime);
                        return deferred.promise;
                    }
                    else
                        return actions;
                },
                getCachedBooksFromRelease: function() {
                    if(isReleaseFirstTimeExecuted)
                    {
                        var deferred = $q.defer();
                        var promise = getBooksFromRelease();
                        promise.then(function(books) {

                            deferred.resolve(books);

                        }, function(reason)
                        {
                            deferred.reject(reason);
                        });
                        setInterval(getBooksFromRelease, cacheTime);
                        return deferred.promise;

                    }
                    else
                        return booksFromRelease;
                },
                getCachedBooksFromMyLibrary: function(id) {
                    if(isLibraryFirstTimeExecuted)
                    {
                        var deferred = $q.defer();
                        var promise = getLibraryByUserId(id);
                        promise.then(function(books) {

                            deferred.resolve(books);

                        }, function(reason)
                        {
                            deferred.reject(reason);
                        });
                        setInterval(getLibraryByUserId(id), cacheTime);
                        return deferred.promise;

                    }
                    else
                        return booksFromMyLibrary;
                },

                //Getters and setters for handling cache
                setIsHomeFirstTimeExecuted: function(value){
                    isHomeFirstTimeExecuted = value;
                },
                getIsHomeFirstTimeExecuted: function(){
                    return isHomeFirstTimeExecuted;
                },
                setIsReleaseFirstTimeExecuted: function(value){
                    isReleaseFirstTimeExecuted = value;
                },
                getIsReleaseFirstTimeExecuted: function(){
                    return isReleaseFirstTimeExecuted;
                },
                setIsLibraryFirstTimeExecuted: function(value){
                    isLibraryFirstTimeExecuted = value;
                },
                getIsLibraryFirstTimeExecuted: function(){
                    return isLibraryFirstTimeExecuted;
                },

                setCacheTime: function(time){
                    cacheTime = time;
                },

                setIsCacheEnable: function (value){
                    isCacheEnable = value;
                }



            }
        };
        this.setIsHomeFirstTimeExecuted = function(isHomeFirstTimeExecuted) {
            this.isHomeFirstTimeExecuted = isHomeFirstTimeExecuted;
        };
        this.setIsReleaseFirstTimeExecuted = function(isReleaseFirstTimeExecuted) {
            this.isReleaseFirstTimeExecuted = isReleaseFirstTimeExecuted;
        };
        this.setIsLibraryFirstTimeExecuted = function(isLibraryFirstTimeExecuted)
        {
            this.isLibraryFirstTimeExecuted = isLibraryFirstTimeExecuted;
        };
        this.setIsCacheEnable = function(isCacheEnable)
        {
            this.isCacheEnable = isCacheEnable;
        }
        this.setCacheTime = function(cacheTime)
        {
            this.cacheTime = cacheTime;
        }

    });


