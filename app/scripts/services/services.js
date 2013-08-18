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

var KmToLookAroundUserPositionForMap = 500;

angular.module('dataServices', [])

/**
 * Parse Service com as a back-end for the application.
 */
    .factory('parseService', function ($q) {
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
        var Review = Parse.Object.extend("Review");
        var ReviewLike = Parse.Object.extend("ReviewLike");
        var ApplicationVersion = Parse.Object.extend("ApplicationVersion");

        var ActionCollection = Parse.Collection.extend({ model: Action });
        var LocalizeFile = Parse.Object.extend("LocalizeFiles");

        function updateBookKilometers(book,point1, point2){

            var numberOfKilometersSoFar;

            if(book.get("kilometers")== undefined)
            {

                numberOfKilometersSoFar = point1.kilometersTo(point2);
            }
            else
            {
                numberOfKilometersSoFar= book.get("kilometers") + point1.kilometersTo(point2);

            }

            return numberOfKilometersSoFar;

        }

        function saveBook(book, registrationId, releaseInfo, kilometers){
            var deferred = $q.defer();

            var Book = Parse.Object.extend("Book");
            var BookStatus = Parse.Object.extend("BookStatus");

            if(book.get('registrationId') === registrationId)
            {
                var book = new Book({id: releaseInfo.bookId});

                book.fetch().then(function(book){

                    book.set("releasedAt", new Parse.GeoPoint({latitude:releaseInfo.geoPoint.latitude, longitude:releaseInfo.geoPoint.longitude}));
                    book.set("releasedAtDescription", releaseInfo.bookLocationDescription);
                    book.set("kilometers", kilometers);
                    book.set("bookStatus", new BookStatus({id: BookStatusConst.Released}));
                    book.set("ownedBy", Parse.User.current());

                    return book.save();

                }).then(function(book){

                        deferred.resolve(book);

                    }, function(error){

                        deferred.reject(error);
                    });
            }
            return deferred.promise;
        }

        var releaseBook = function releaseBook(releaseInfo, registrationId){

            var deferred = $q.defer();
            var bookFromParse;

            var query = new Parse.Query(Book);

            //First we get the book to release
            query.equalTo("objectId", releaseInfo.bookId);

            query.first().then(function(book){

                //if has been released more that one time we get the last position
                // to calculate the kilometers
                bookFromParse = book;
                if(book.get("released") >= 1)
                {
                    var trackingQuery = new Parse.Query(Tracking);
                    query.equalTo("book", book);
                    query.descending("createdAt");
                    return trackingQuery.first();
                }
                else
                {
                    return undefined;
                }

                //once the tracking point has been gotten we will update
            }).then(function(tracking){

                if(tracking !== undefined)
                {
                    var point1 = tracking.get("releasedAt");
                    var point2 = bookFromParse.get("releasedAt");
                    var kilometers = updateBookKilometers(book, point1, point2);
                    return saveBook(bookFromParse, registrationId, releaseInfo, kilometers);
                }
                //if it is the first time we don't calculate the km we simply save the book
                else
                {
                    return saveBook(bookFromParse, registrationId, releaseInfo);
                }

            }).then(function(book){

               deferred.resolve(book);

               }, function(error){

               deferred.reject(error);

            });

            return deferred.promise;


        };

        /**
        * ParseService Object
        * This is what is used by the main controller to save and retrieve data from Parse.com.
        * Moving all the Parse.com specific stuff into a service allows me to later swap it out 
        * with another back-end service provider without modifying my controller much, if at all.
        */
        var parseService = {
            name: "Parse",

            checkApplicationVersion: function checkApplicationVersion(callback)
            {
                var query = new Parse.Query(ApplicationVersion);
                query.descending("createdAt");
                query.first({
                    success: function (applicationVersion) {

                        callback(true, applicationVersion)
                    },
                    error: function (data,error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    }
                });

            },
        //<editor-fold description="ReviewLike">

            addLikeToReview: function addLikeToReview(book, reviewId, isLike, callback)
            {

                var reviewFound;
                var query = new Parse.Query(Review);

                // Include the post data with each comment
                query.equalTo("objectId", reviewId);

                query.first().then(function (review) {

                        reviewFound = review;
                        var queryReviewLike = new Parse.Query(ReviewLike);

                        queryReviewLike.equalTo("review", review);
                        queryReviewLike.equalTo("user", Parse.User.current());

                        return queryReviewLike.first();

                }).then(function(reviewLike){


                     var reviewLike = new ReviewLike();

                     reviewLike.set("review", reviewFound);
                     reviewLike.set("isLike", isLike)
                     reviewLike.set("user", Parse.User.current());
                     reviewLike.set("book", book);

                     return reviewLike.save();


                    }).then(function(result){

                        callback(true, result);

                    },  function (error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    })
            },

            getReviewLike: function getReviewLike(userId, bookId, callback)
            {
                var query = new Parse.Query(ReviewLike);

                var book = new Book();
                book.id = bookId;
                var user = new User();
                user.id = userId;
                // Include the post data with each comment
                query.equalTo("book", book);
                query.equalTo("user", user);

                query.find({
                    success: function (reviewLikes) {

                        callback(true, reviewLikes)
                    },
                    error: function (data,error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    }
                });

            },

            //</editor-fold>

        //<editor-fold description="Comments">

        getCommentsByBookId: function getCommentsByBookId(bookId, callback){

            var query = new Parse.Query(Comment);

            var book = new Book();
            book.id = bookId;

            // Include the post data with each comment
            query.equalTo("book", book);
            query.include("user");
            query.descending("createdAt");

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

        //<editor-fold description="Review">

            getReviewsFromBookId: function getReviewsFromBookId(bookId, callback)
            {
                var query = new Parse.Query(Review);

                var book = new Book();
                book.id = bookId;

                // Include the post data with each comment
                query.equalTo("book", book);
                query.include("user");
                query.descending("createdAt");


                query.find({
                    success: function (reviews) {
                        // Comments now contains the last ten comments, and the "post" field
                        // has been populated. For example:
                        callback(true, reviews);
                    },
                    error: function (data,error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.GenericError);
                    }
                });
            },

            addReviewToBook: function addReviewToBook(reviewToRegister, callback)
            {
                var query = new Parse.Query(Book);


                // Include the post data with each comment
                query.equalTo("objectId", reviewToRegister.book.id);

                query.first({
                    success: function (booka) {

                        var review = new Review();

                        review.set("reviewText", reviewToRegister.reviewText);
                        review.set("book", booka);
                        review.set("user", Parse.User.current());
                        review.set("rating", reviewToRegister.rating);
                        review.set("likeCount", 0);
                        review.set("unLikeCount", 0);

                        review.save(null, {
                            success: function (review) {
                                // The object was saved successfully.
                                callback(true, review);
                            },
                            error: function (review, error) {
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

        //<editor-fold description="Sign">


            //Register new user
            registerNewUserFromFB: function registerNewUserFromFB(user, callback) {
                var newUser = new Parse.User();
                //Basic info
                newUser.set("nick", user.name);
                newUser.set("email", user.email);
                newUser.set("username", user.email);
                newUser.set("password", "123456");
                newUser.set("fbId", user.id);
                newUser.set("myPicture", 'http://graph.facebook.com/' + user.id + '/picture');
                newUser.set("language", user.language);

                //user counters
                newUser.set("registered", 0);
                newUser.set("released", 0);
                newUser.set("hunted", 0);
                newUser.set("comments", 0);
                //Social and interesting info
                newUser.set("status", "");
                newUser.set("gender", user.gender);
                newUser.set("genere", "");
                newUser.set("birth", "");

                newUser.signUp(null, {
                    success: function (userr) {
                        // Hooray! Let them use the app now.

                        callback(true, null);
                    },
                    error: function (userr, error) {
                        // Show the error message somewhere and let the user try again.

                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, ErrorConst.UserNotRegisteredCorrectly);
                    }
                });
            },
            //Sign In User
            signIn: function signIn(email, password, callback) {

                Parse.User.logIn(email.toLowerCase(), password, {
                    success: function (user) {
                        // Do stuff after successful login.
                        callback(true, user);
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
                newUser.set("nick", createRandomNick());
                newUser.set("password", user.Password);
                newUser.set("email", user.Email.toLowerCase());
                newUser.set("username", user.Email.toLowerCase());
                newUser.set("language", user.language);
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
                currentUser.set("birthday", user.birthday);
                //currentUser.set("myPicture", user.myPicture);

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

            uploadPicture : function uploadPicture(parseFile,callback)
            {
                parseFile.save().then(function() {
                    //The file has been saved to Parse.
                    //Lets associate the file with the user
                    var currentUser = Parse.User.current();

                    currentUser.set("myPicture",parseFile._url);
                    currentUser.set("myFile",parseFile);

                    currentUser.save().then(function(){
                            callback(true);
                        }
                        , function(error) {
                            // The file either could not be read, or could not be saved to Parse.
                            console.log("Error: " + error.code + " " + error.message)
                            callback(false,error);
                        });

                }, function(error) {
                    // The file either could not be read, or could not be saved to Parse.
                    console.log("Error: " + error.code + " " + error.message)
                    callback(false,error);
                });
            },

        //</editor-fold>

        //<editor-fold description="User">
            updateStatus: function updateStatus(newStatus, callback){

                //The file has been saved to Parse.
                //Lets associate the file with the user
                var currentUser = Parse.User.current();

                currentUser.set("status",newStatus);

                currentUser.save().then(function(){

                        callback(true, currentUser);
                    }
                    , function(error) {

                        callback(false, ErrorConst.GenericError);
                    });

            },

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
            getUserByFbId: function getUserByFbId(userFbId, callback)
            {
                var query = new Parse.Query(User);
                query.equalTo("fbId", userFbId);



                query.find({
                    success: function (result) {
                        if(result.length > 0)
                        {

                            callback(true, result[0]);

                        }
                        else
                        {

                            callback(true, null);
                        }
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
                var actionType3 = new ActionType();
                actionType3.id = ActionTypesConst.Reviewed;
                var actionType4 = new ActionType();
                actionType4.id = ActionTypesConst.Commented;
                qAction.containedIn("actionType",[actionType, actionType2, actionType3, actionType4]);

                //qAction.notContainedIn("user",[Parse.User.current()]);

                // Include the post data with each comment
                qAction.include("book");
                qAction.include(["book.bookStatus"]);
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
                    book.set("kilometers", 0);
                    book.set("averageRate", 0);
                    book.set("registeredBy", Parse.User.current());
                    book.set("bookStatus", new BookStatus({id: BookStatusConst.Registered}));
                    book.set("ownedBy", Parse.User.current());

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
                releaseBook: releaseBook,

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

                     qBook.withinKilometers("releasedAt", geoPoint, KmToLookAroundUserPositionForMap)

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
                     qBook.include("bookStatus");

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

                    qTracking.find({
                        success: function (tracking) {
                            callback(true, tracking);
                        },
                        error: function (tracking, error) {
                            console.log("Error: " + error.code + " " + error.message)
                            callback(false, ErrorConst.GenericError);
                        }
                    });
                }

                //</editor-fold>
    };

        return parseService;
    })

.factory('dataService', function (parseService, $location) {
    // Use the BackboneService by default
    var serviceToUse = parseService;

    return serviceToUse;
});



