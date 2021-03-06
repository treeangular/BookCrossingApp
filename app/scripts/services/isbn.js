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

        getGoogleBookInfo: function getGoogleBookInfo(search, callback) {

            var queryFormat;
            var books = [];
            
            if(search != null)
            {
                queryFormat = search;
            }

            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/books/v1/volumes',
                params: {q: queryFormat, orderBy: "relevance", maxResults: 20},
                cache: false
            }).
                success(function(data, status) {


                    if(data.items.length > 0)
                    {
                        //TODO: make sure we have 4 items to iterate!
                        var max = Math.min(20, data.items.length);

                        for (var i=0;i<max;i++)
                        {
                            if(data.items[i].volumeInfo.imageLinks !== undefined)
                            {
                                //TODO: Add isbn, remove books without image,
                                var book = {};
                                book.title = data.items[i].volumeInfo.title;
                                book.description = data.items[i].volumeInfo.description;
                                book.language = data.items[i].accessInfo.country;
                                book.subtitle = data.items[i].volumeInfo.subtitle;
                                book.authors = data.items[i].volumeInfo.authors;
                                book.image = data.items[i].volumeInfo.imageLinks === undefined ? "": data.items[i].volumeInfo.imageLinks.thumbnail ;
                                book.isbn = data.items[i].volumeInfo.industryIdentifiers === undefined ? "" : data.items[i].volumeInfo.industryIdentifiers[0].identifier;
                                book.publisher = data.items[i].volumeInfo.publisher;
                                book.publishedDate = data.items[i].volumeInfo.publishedDate;

                                books.push(book);
                            }

                        }

                         callback(true, books);
                     }
                    else
                    {
                      callback(false, ErrorConst.IsbnNotFound);
                    }
                }).
                error(function(data, status) {

                    callback(false, ErrorConst.GenericError);

                });


        }
    };
}]);
