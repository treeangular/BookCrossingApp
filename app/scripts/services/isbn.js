'use strict';

var GOOGLE_API_KEY = "AIzaSyDOqjp9dDPPie0hv4zcJidjxpEAKjFJv50";
var ISBNDB_API_KEY = "WCUOZ296";

angular.module('isbnProvider', [])

    .factory('isbnService', ['$http',function($http){

    // Public API here
    return {

//        getIsbnDbInfo: function getIsbnDbInfo(title, isbn) {
//            var book ={};
//
//          $http({
//              method: 'GET',
//              url: 'http://isbndb.com/api/books.xml?access_key=WCUOZ296&index1=isbn&value1=0596002068',
//              data: book,
//              params: {title: title, isbn: isbn},
//              headers: {
//                  'Accept': 'application/xml'
//              },
//              transformResponse: function(data) {
//                  var json = x2js.xml_str2json( data );
//                  return json;
//              },
//              cache: false
//          }).
//              success(function(data, status) {
//                alert("book.Title")
//              }).
//              error(function(data, status) {
//                  alert("Error");
//              });
//        },

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
                       if(data.totalItems > 0)
                       {
                            book.title = data.items[0].volumeInfo.title;
                            book.description = data.items[0].volumeInfo.description;
                            book.language = data.items[0].accessInfo.country;
                            book.subtitle = data.items[0].volumeInfo.subtitle;
                            book.authors = data.items[0].volumeInfo.authors;
                            book.image = data.items[0].volumeInfo.imageLinks.thumbnail;
                            book.isbn = isbn;
                           callback(true, book);
                       }
                    else
                       {
                           callback(false, ErrorConst.IsbnNotFound)
                       }

                }).
                error(function(data, status) {

                    callback(false, ErrorConst.GenericError);
                });
        }
    };
}]);
