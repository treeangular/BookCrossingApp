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
                queryFormat = search + '&orderBy=relevance';
                //alert(queryFormat);
            }

            try{

            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/books/v1/volumes',
                params: {q: queryFormat},
                cache: false
            }).
                success(function(data, status) {

                    alert("is success");
                    if(data.totalItems > 0)
                    {
                        alert("data.totalItems: " + data.totalItems);
                        //TODO: make sure we have 4 items to iterate!
                        for (var i=0;i<4;i++)
                        {
                            //TODO: Add isbn, remove books without image,
                            var book = {};
                            book.title = data.items[i].volumeInfo.title;
                            book.description = data.items[i].volumeInfo.description;
                            book.language = data.items[i].accessInfo.country;
                            book.subtitle = data.items[i].volumeInfo.subtitle;
                            book.authors = data.items[i].volumeInfo.authors;
                            book.image = data.items[i].volumeInfo.imageLinks === undefined ? "": data.items[i].volumeInfo.imageLinks.thumbnail ;
                            //book.isbn = data.items[i].volumeInfo.industryIdentifiers === undefined ? "" : data.items[i].volumeInfo.industryIdentifiers[1].identifier;
                            book.publisher = data.items[i].volumeInfo.publisher;
                            book.publishedDate = data.items[i].volumeInfo.publishedDate;

                            books.push(book);

                        }

                         callback(true, books);
                     }
                    else
                    {
                        alert("is else success");
                        try
                        {
                            alert(status);
                            alert(data);
                            callback(false, ErrorConst.IsbnNotFound);
                        }
                        catch(ex)
                        {

                            alert("Catch error: " + ex);
                        }
                    }
                }).
                error(function(data, status) {

                    alert("is error");
                    try
                    {
                        alert(status);
                        alert(data);
                        callback(false, ErrorConst.GenericError);
                    }
                    catch(ex)
                    {
                        alert("Catch error: " + ex);
                    }
                });

            }
            catch(ex)
            {alert("Outter catch says: " + ex.message);}
        }
    };
}]);
