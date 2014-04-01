'use strict';

angular.module('mapsProvider', [])
    .factory('mapsService', ['$http',function($http){

        // Public API here
        return {
            getGoogleBookInfo: function getGoogleBookInfo(isbn, callback) {
                var book ={};
                var queryFormat;

                if(isbn != null)
                {
                    queryFormat = "isbn:" + isbn;
                }

                $http({
                    method: 'GET',
                    url: 'https://www.googleapis.com/books/v1/volumes',
                    params: {q: queryFormat},
                    cache: false
                }).
                    success(function(data, status) {

                        book.title = data.items[0].volumeInfo.title;
                        book.description = data.items[0].volumeInfo.description;
                        book.language = data.items[0].accessInfo.country;
                        book.subtitle = data.items[0].volumeInfo.subtitle;
                        book.authors = data.items[0].volumeInfo.authors;
                        book.image = data.items[0].volumeInfo.imageLinks.thumbnail;
                        book.isbn = isbn;

                        callback(book);
                    }).
                    error(function(data, status) {

                        callback(null);
                    });
            }
        };
    }]);
