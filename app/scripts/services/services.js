'use strict';

/* Services */

/**
 * DataService Module
 *
 *  A collection of services that provide a variety of back-end options for saving
 *  and retrieving data. Parse.com is Backend-as-a-Service company.
 *  They provide easy to use databases for mobile and HTML5 applications.
 */

var PARSE_APP_ID = "MyXalB83PFKV15BOPSO2lKBBzkYeyLKGNYsNI5DS"; //"khg4ef8Mks6oP2AjjVlvYHnoEIzLnsaW7Tb23jow";
var PARSE_JS_ID = "7pNuZLzLEArqUc2BlQNmDgD5HMVL4l3G9ZIKP3Qr"; //"8KZKpONdEWQZNBteRkJWCtBks3YxuO55THQhQ7qI";
var PARSE_REST_API_KEY = "2iGS4EL4QHE2l50Kq7Xryd1TUGfc4h0AEk5xgDOZ";

angular.module('dataServices', [])

/**
 * Parse Service com as a back-end for the application.
 */
    .factory('parseService', function ($http) {
        // Initialize Parse API and objects. Please don't use this key in your own apps. It won't work anyway.



        //Create Object/Table names with capital first letter, following Parse guidelines.
        var Book = Parse.Object.extend("Book");
        var BookStatus = Parse.Object.extend("BookStatus");
        var User = Parse.Object.extend("User")
        var BookCollection = Parse.Collection.extend({ model: Book });
        var Action = Parse.Object.extend("Action");
        var ActionType = Parse.Object.extend("ActionType");
        var Comment = Parse.Object.extend("Comment");
        var Tracking = Parse.Object.extend("Tracking");

        var ActionCollection = Parse.Collection.extend({ model: Action });
        var LocalizeFile = Parse.Object.extend("LocalizeFiles");

        /**
        * ParseService Object
        * This is what is used by the main controller to save and retrieve data from Parse.com.
        * Moving all the Parse.com specific stuff into a service allows me to later swap it out 
        * with another back-end service provider without modifying my controller much, if at all.
        */
        var parseService = {
            name: "Parse",

        //<editor-fold description="Comments">

        getCommentsByBookId: function getCommentsByBookId(bookId, callback){

            var query = new Parse.Query(Comment);

            var book = new Book();
            book.id = bookId;

            // Include the post data with each comment
            query.equalTo("book", book);
            query.include("user");

            query.find({
                success: function (comments) {
                    // Comments now contains the last ten comments, and the "post" field
                    // has been populated. For example:
                    callback(true, comments);
                },
                error: function (data,error) {
                    // The save failed.
                    // error is a Parse.Error with an error code and description.
                    console.log("Error: " + error.code + " " + error.message);
                    callback(false, ErrorConst.GenericError);
                }
            });
        },

        addCommentToBook: function addCommentToBook(commentToRegister, callback)
        {

            var query = new Parse.Query(Book);

            // Include the post data with each comment
            query.equalTo("objectId", commentToRegister.book.id);

            query.find({
                success: function (books) {

                    var comment = new Comment();

                    comment.set("content", commentToRegister.content);
                    comment.set("book", books[0]);
                    comment.set("user", Parse.User.current());

                    var newAcl = new Parse.ACL(Parse.User.current());
                    newAcl.setPublicReadAccess(true);
                    comment.setACL(newAcl);

                    comment.save(null, {
                        success: function (comment) {
                            // The object was saved successfully.
                            callback(true, comment);
                        },
                        error: function (comment, error) {
                            // The save failed.
                            // error is a Parse.Error with an error code and description.
                            console.log("Error: " + error.code + " " + error.message);
                            callback(false, ErrorConst.GenericError);
                        }
                    });


                },
                error: function (data,error) {
                    // The save failed.
                    // error is a Parse.Error with an error code and description.
                    console.log("Error: " + error.code + " " + error.message);
                    callback(false, ErrorConst.BookNotFound);
                }
            });


        },

        //</editor-fold>

        //<editor-fold description="Facebook">
            //SignIn a Fb user
            fbSignIn: function fbSignIn(callback){

               Parse.FacebookUtils.logIn("email", {
                    success: function(user) {
                        if (!user.existed()) {

                            //if the user does not exists we have to created it
                            callback(true, null);

                        }
                         else {

                            //if the user exists redirect
                           callback(true, user);
                        }
                    },
                    error: function(user, error) {
                        callback(false);
                    }
               });
            },
            updateUserProfileFromFb: function updateUserProfileFromFb(user, callback)
            {
                //Get current user
                var currentUser = Parse.User.current();

                currentUser.set("nick", user.username);
                currentUser.set("gender", user.gender);
                currentUser.set("email", user.email);
                currentUser.set("username", user.username);
                currentUser.set("myPicture", 'http://graph.facebook.com/' + user.fbId + '/picture');
                currentUser.set("facebookId", user.fbId);

                currentUser.save(null, {
                    success: function (user) {
                        // Hooray! Let them use the app now.
                        callback(true, null);
                    },
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        //alert("Error: " + error.code + " " + error.message);
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    }
                });
            },
        //</editor-fold>

        //<editor-fold description="Sign">
            //Sign In User
            signIn: function signIn(email, password, callback) {

                Parse.User.logIn(email.toLowerCase(), password, {
                    success: function (user) {
                        // Do stuff after successful login.
                        callback(true);
                    },
                    error: function (user, error) {
                        // The login failed. Check error to see why.
                        // alert("Error: " + error.code + " " + error.message);
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    }
                });
            },

            signOut: function signOut() {
                Parse.User.logOut();
                console.log("UserLogged out . . .");
            },

            //Register new user
            registerNewUser: function registerNewUser(user, callback) {
                var newUser = new Parse.User();
                //Basic info
                newUser.set("username", createRandomNick());
                newUser.set("password", user.Password);
                newUser.set("email", user.Email.toLowerCase());
                //user counters
                newUser.set("registered", 0);
                newUser.set("released", 0);
                newUser.set("hunted", 0);
                newUser.set("comments", 0);
                //Social and interesting info
                newUser.set("status", "");
                newUser.set("gender", "");
                newUser.set("genere", "");
                newUser.set("birth", "");

                newUser.signUp(null, {
                    success: function (userr) {
                        // Hooray! Let them use the app now.
                        callback(true, null);
                    },
                    error: function (userr, error) {
                        // Show the error message somewhere and let the user try again.
                        //alert("Error: " + error.code + " " + error.message);
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.UserNotRegisteredCorrectly);
                    }
                });
            },

            updateUserProfile: function updateUserProfile(user, callback) {
                //Get current user
                var currentUser = Parse.User.current();

                currentUser.set("nick", user.nick);
                currentUser.set("gender", user.gender);
                currentUser.set("favoriteGenre", user.favoriteGenre);
                //currentUser.set("myPictureFile", user.myPictureFile);

                currentUser.save(null, {
                    success: function (user) {
                        // Hooray! Let them use the app now.
                        callback(true, null);
                    },
                    error: function (user, error) {
                        // Show the error message somewhere and let the user try again.
                        //alert("Error: " + error.code + " " + error.message);
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.UserNotUpdatedCorrectly);
                    }
                });
            },
        //</editor-fold>

        //<editor-fold description="User">
            isCurrentUser: function isCurrentUser(callback) {
                var currentUser = Parse.User.current();
                if (currentUser) {
                    // do stuff with the user
                    console.log("currentUser" + currentUser.id);
                    callback(true, currentUser);
                } else {
                    // show the signup or login page
                    callback(false, ErrorConst.GenericError);
                }

            },

            //Need the data of the current user getting form LocalStorage first if possible.
            getCurrentUser: function getCurrentUser(callback)
            {
                var currentUser = Parse.User.current();

                callback(currentUser);
            },

            getUserById: function getUserById(userId, callback)
            {
                var query = new Parse.Query(User);
                query.equalTo("objectId", userId);

                query.find({
                    success: function (result) {
                        if(result.length > 0)
                         callback(true, result[0]);
                        else
                            callback(true, ErrorConst.UserNotFound);
                    },
                    error: function (user,error) {

                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    }
                });


            },
        //</editor-fold>

        //<editor-fold description="Actions">

            getActionsForHomePage: function  getActionsForHomePage(pageNumber, callback)
            {
                var qAction = new Parse.Query(Action);
                var recordsPerPage = 10;

                qAction.limit(recordsPerPage);
                qAction.skip(pageNumber*recordsPerPage);
                // Retrieve the most recent ones
                qAction.descending("createdAt");

                var actionType = new ActionType();
                actionType.id = ActionTypesConst.Released;
                var actionType2 = new ActionType();
                actionType2.id = ActionTypesConst.Hunted;
                qAction.containedIn("actionType",[actionType, actionType2]);

                //qAction.notContainedIn("user",[Parse.User.current()]);

                // Include the post data with each comment
                qAction.include("book");
                qAction.include("user");
                qAction.include("actionType");

                qAction.find({
                    success: function (actions) {
                        callback(true, actions);
                    },
                    error: function (actions, error) {
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    }
                });

            },


            getLibraryByUserId: function getLibraryByUserId(userId, callback){

                var qBook = new Parse.Query(Book);

                var user = new User();
                user.id = userId;

                // Retrieve the most recent ones
                qBook.descending("createdAt");
                qBook.equalTo('registeredBy', user);
                // Include the post data with each comment
                qBook.include("user");
                qBook.include("bookStatus");


                qBook.find({
                    success: function (books) {
                        // Comments now contains the last ten comments, and the "post" field
                        // has been populated. For example:
                        callback(true, books);

                    },
                    error: function (error) {
                        callback(false, ErrorConst.GenericError);
                    }
                });
            },

            //</editor-fold>

        //<editor-fold description="Book">
                getBooks: function getBooks(callback) {

                    // Instantiate a petition collection
                    var books = new BookCollection();

                    // Use Parse's fetch method (a modified version of backbone.js fetch) to get all the petitions.
                    books.fetch({
                        success: function (results) {
                            // Send the petition collection back to the caller if it is succesfully populated.
                            callback(true, results);
                        },
                        error: function (results, error) {
                            console.log("Error: " + error.code + " " + error.message);
                            callback(false, ErrorConst.GenericError);
                        }
                    });
                },


                getBookById: function getBookById(id, callback)
                {
                    var query = new Parse.Query(Book);

                    // Include the post data with each comment
                    query.equalTo("objectId", id);

                    query.find({
                        success: function (books) {
                            // Comments now contains the last ten comments, and the "post" field
                            // has been populated. For example:
                            if(books.length > 0)
                                callback(true, books[0]);
                            else
                                callback(false, ErrorConst.BookNotFound);
                        },
                        error: function (data,error) {
                            // The save failed.
                            // error is a Parse.Error with an error code and description.
                            console.log("Error: " + error.code + " " + error.message);
                            callback(false, ErrorConst.GenericError);
                        }
                    });

                },

                registerBook: function registerBook(bookk, callback) {

                    var book = new Book();

                    book.set("title", bookk.title);
                    book.set("description", bookk.description);
                    book.set("registrationId", bookk.registrationId);
                    book.set("image", bookk.image);
                    book.set("authors", bookk.authors);
                    book.set("isbn", bookk.isbn);
                    book.set("hunted", 0);
                    book.set("released", 0);
                    book.set("registeredBy", Parse.User.current());
                    book.set("bookStatus", new BookStatus({id: BookStatusConst.Registered}));
                    book.set("ownedBy", Parse.User.current());

                    var newAcl = new Parse.ACL(Parse.User.current());
                    newAcl.setPublicReadAccess(true);
                    book.setACL(newAcl);

                    book.save(null, {
                        success: function (book) {
                            // The object was saved successfully.
                            callback(true, null);
                        },
                        error: function (book, error) {
                            // The save failed.
                            // error is a Parse.Error with an error code and description.
                            console.log("Error: " + error.code + " " + error.message);
                            callback(false, ErrorConst.GenericError);
                        }
                    });
                },

                releaseBook: function releaseBook(releaseInfo, callback)
                {
                    var book = new Book({id: releaseInfo.bookId});

                    book.fetch({
                        success: function (book)
                        {
                            book.set("releasedAt", new Parse.GeoPoint({latitude:releaseInfo.geoPoint.latitude, longitude:releaseInfo.geoPoint.longitude}));
                            book.set("releasedAtDescription", releaseInfo.bookLocationDescription);
                            book.set("bookStatus", new BookStatus({id: BookStatusConst.Released}));
                            book.set("ownedBy", Parse.User.current());

                            book.save(null, {
                                success: function (book) {
                                    // The object was saved successfully, lets update the status
                                    callback(true, null);
                                },
                                error: function (data,error) {
                                    // The save failed.
                                    // error is a Parse.Error with an error code and description.
                                    console.log("Error: " + error.code + " " + error.message);
                                    callback(false, ErrorConst.GenericError);
                                }
                            });
                        } ,
                        error: function (object, error) {
                            // The object was not retrieved successfully.
                            // error is a Parse.Error with an error code and description.
                            console.log("Error: " + error.code + " " + error.message);
                            callback(false, ErrorConst.GenericError);
                        }
                    });
                },

                huntBook: function huntBook(registrationId, callback)
                {
                    var qBook = new Parse.Query(Book);
                    qBook.equalTo("registrationId", registrationId);
                    qBook.include("bookStatus");

                    qBook.first({
                        success: function (book)
                        {
                            if(book != undefined)
                            {

                                if(book.get("bookStatus") != BookStatusConst.Hunted)
                                {
                                    book.set("bookStatus", new BookStatus({id: BookStatusConst.Hunted}));
                                    book.set("ownedBy", Parse.User.current());

                                    book.save(null, {
                                        success: function (book) {
                                            // The object was saved successfully, lets update the status
                                            callback(true, book);
                                        },
                                        error: function (data,error) {
                                            // The save failed.
                                            // error is a Parse.Error with an error code and description.
                                            console.log("Error: " + error.code + " " + error.message);
                                            callback(false, ErrorConst.GenericError);
                                        }
                                    });
                                }
                                else
                                {
                                    callback(false, ErrorConst.BookAlreadyHunted);
                                }
                            }
                            else
                            {
                                callback(false, ErrorConst.BookNotFound);
                            }

                        },
                        error: function (object, error) {
                            // The object was not retrieved successfully.
                            // error is a Parse.Error with an error code and description.
                            console.log("Error: " + error.code + " " + error.message);
                            callback(false, ErrorConst.GenericError);
                        }
                    });
                },

                getBookRegistrationId: function GetBookRegistrationId(callback)
                {

                    Parse.Cloud.run('GetBookId', {}, {
                        success: function (result) {
                            callback(true, result);
                        },
                        error: function (error) {
                            callback(false, ErrorConst.GenericError);
                        }
                    });
                },

                getBooksThatCanBeReleased: function GetBookThatCanBeReleased(callback)
                {
                    //Get the Actions related to this books ordered chronologically
                    var qBook = new Parse.Query(Book);

                    //Only Released actions of others books. (Also Lost ones?)
                    var bookStatus = new BookStatus();
                    bookStatus.id = BookStatusConst.Registered;
                    var bookStatus2 = new BookStatus();
                    bookStatus2.id = BookStatusConst.Hunted;
                    qBook.containedIn("bookStatus",[bookStatus,bookStatus2]);

                    //Book that I am the one that made the last action on it.
                    qBook.equalTo("ownedBy", Parse.User.current());

                    //Do we need to order them?
                    qBook.descending("createdAt");

                    // Include the post data with each comment
                    qBook.include("user");
                    //qAction.include("actionType");

                    qBook.find({
                        success: function (books) {
                            callback(true,books);
                        },
                        error: function (actions, error) {
                            console.log("Error: " + error.code + " " + error.message);
                            callback(false, ErrorConst.GenericError);
                        }
                    });

                },

                getBooksForMap: function  getBooksForMap(geoPoint, callback)
                {
                     //Get the Actions related to this books ordered chronologically
                     var qBook = new Parse.Query(Book);

                     qBook.withinKilometers("releasedAt", geoPoint, 20)

                     //Only Released actions of others books. (Also Lost ones?)
                     var bookStatus = new BookStatus();
                     bookStatus.id = BookStatusConst.Released;
                     qBook.equalTo("bookStatus",bookStatus);

                     //Book not belongs to me - do we need that one?
                     qBook.notEqualTo("ownedBy", Parse.User.current());

                     //Do we need to order them?
                     qBook.descending("createdAt");

                     // Include the post data with each comment
                     qBook.include("user");

                     qBook.find({
                         success: function (books) {
                             callback(true, books);
                         },
                         error: function (actions, error) {
                             console.log("Error: " + error.code + " " + error.message)
                             callback(false, ErrorConst.GenericError);
                         }
                     });
                },

                getTrackingForBook: function  getTrackingForBook(book, callback)
                {
                    //Get the tracking of the releases of the book
                    var qTracking = new Parse.Query(Tracking);

                    qTracking.equalTo("book", book);

                    qTracking.descending("createdAt");

                    // Include
                    //qTracking.include("user");

                    qTracking.find({
                        success: function (tracking) {
                            callback(true, tracking);
                        },
                        error: function (tracking, error) {
                            console.log("Error: " + error.code + " " + error.message)
                            callback(false, ErrorConst.GenericError);
                        }
                    });
                },

                //</editor-fold>

        uploadPicture: function uploadPicture(user,callback)
        {
                    var serverUrl = 'https://api.parse.com/1/files/' + user.Nick ;



                    $http({
                        method: 'POST',
                        url: serverUrl,
                        data: user.myPicture,
                        headers: {'X-Parse-Application-Id': PARSE_APP_ID,
                            'X-Parse-REST-API-Key': PARSE_REST_API_KEY,
                            'Content-Type': 'text/plain'
                        }
                    }).success(function(data, status, headers, config) {
                            alert("File available at: " + data.url);
                            console.log("File available at: " + data.url);

                            var currentUser = Parse.User.current();

                            currentUser.set("myPicture", data.url);

                            currentUser.save(null, {
                                success: function (user) {
                                    // Hooray! Let them use the app now.
                                    callback(true, null);
                                },
                                error: function (user, error) {
                                    // Show the error message somewhere and let the user try again.
                                    //alert("Error: " + error.code + " " + error.message);
                                    console.log("Error: " + error.code + " " + error.message);
                                    callback(false, error);
                                }
                            });
    //                        var url = data.url;
    //                        currentUser.put("myPicture", {
    //                            name: url.substring(url.lastIndexOf('/') + 1),
    //                            url: url,
    //                            __type: "File"
    //                        });
    //                        currentUser.save();
                            callback(true,data);

                        }).error(function(data, status, headers, config) {
    //                        var obj = jQuery.parseJSON(data);
    //                        alert(obj.error);
                            //alert("Fucking error ");
                            console.log("fuckign error");// + data);
                            callback(false,null);
                        });

                }
    };

        return parseService;
    })

.factory('dataService', function (parseService, $location) {
    // Use the BackboneService by default
    var serviceToUse = parseService;

    return serviceToUse;
});


window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({
        appId:'160779410752321',
        channelUrl :'http://localhost.com:8080/BookCrossingApp/app/#/channel.html',
        status:true,
        cookie:true,
        xfbml:true
    });
};

(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));




