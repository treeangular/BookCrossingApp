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
        this.cacheTime = 6000;

        this.$get = function(dataService, $q) {

            function getActPage(pageNumber)
            {

                var deferred = $q.defer();
                dataService.getActionsForHomePage(pageNumber, function (isSuccess,results) {

                        if(isSuccess)
                        {
                            actions = results;
                            deferred.resolve(results);

                            // send notification a request has started
                        }
                        else
                        {
                            deferred.reject(results);
                        }
                });
                return deferred.promise;
            };

            function getBooksFromRelease()
            {
                var deferred = $q.defer();

                dataService.getBooksThatCanBeReleased(function (isSuccess, results) {

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

                return deferred.promise;
            }

            function getLibraryByUserId(id){

                var deferred = $q.defer();
                dataService.getLibraryByUserId(id, function (isSuccess, results) {

                        if(isSuccess)
                        {
                            //TODO: Load only first page and then use paging in the NextPage function!
                            deferred.resolve(results);
                            booksFromMyLibrary = results;


                        }
                        else
                        {
                            deferred.reject(results);
                        }

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

                getCacheTime: function(){

                    return cacheTime;
                },

                getCachedActions: function() {

                    if(isHomeFirstTimeExecuted)
                    {
                        var promise = getActPage();
                        promise.then(function(alerts) {

                            return alerts;

                        }, function(reason)
                        {
                            return reason;
                        });
                        setInterval(getActPage, 6000);
                    }
                    else
                        return actions;
                },
                getCachedBooksFromRelease: function() {
                    if(isReleaseFirstTimeExecuted)
                    {
                        var promise = getBooksFromRelease();
                        promise.then(function(books) {

                            return books;

                        }, function(reason)
                        {
                            return reason;
                        });
                        setInterval(getBooksFromRelease, 6000);
                    }
                    else
                        return booksFromRelease;
                },
                getCachedBooksFromMyLibrary: function(id) {
                    if(isLibraryFirstTimeExecuted)
                    {
                        var promise = getLibraryByUserId(id);
                        promise.then(function(books) {

                            return books;

                        }, function(reason)
                        {
                            return reason;
                        });
                        setInterval(getLibraryByUserId(id), 6000);
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
        this.setCacheEnable = function(isCacheEnable)
        {
            this.isCacheEnable = isCacheEnable;
        }
        this.setCacheTime = function(cacheTime)
        {
            this.cacheTime = cacheTime;
        }

    });


