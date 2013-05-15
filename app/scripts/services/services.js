'use strict';

/* Services */

/**
 * DataService Module
 *
 *  A collection of services that provide a variety of back-end options for saving
 *  and retrieving data. Parse.com is Backend-as-a-Service company.
 *  They provide easy to use databases for mobile and HTML5 applications.
 */

var PARSE_APP_ID = "bqfSO3dVttG65a8CIkC1SdqC0CCqiqYsp1EfsjL8"; //"khg4ef8Mks6oP2AjjVlvYHnoEIzLnsaW7Tb23jow";
var PARSE_JS_ID = "50VsxVt1NAKOhpuTK8JD37aklHvkT0V7QxBbVPxl"; //"8KZKpONdEWQZNBteRkJWCtBks3YxuO55THQhQ7qI";
var PARSE_REST_API_KEY = "hidmjl0Amo0SQHTJyftdqWC8LMPbtsb9sFJRReVe";

angular.module('dataServices', [])

/**
 * Parse Service com as a back-end for the application.
 */
    .factory('parseService', function ($http) {
        // Initialize Parse API and objects. Please don't use this key in your own apps. It won't work anyway.

        try {




        } catch (e) {
            console.log(e);
        }

        //Create Object/Table names with capital first letter, following Parse guidelines.
        var Book = Parse.Object.extend("Book");
        var BookCollection = Parse.Collection.extend({ model: Book });
        var Action = Parse.Object.extend("Action");
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

            //Sign In User
            signIn: function signIn(email, password, callback) {

                Parse.User.logIn(email, password, {
                    success: function (user) {
                        // Do stuff after successful login.
                        callback(true);
                    },
                    error: function (user, error) {
                        // The login failed. Check error to see why.
                       // alert("Error: " + error.code + " " + error.message);
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false);
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

                newUser.set("username", user.Email);
                newUser.set("password", user.Password);
                newUser.set("email", user.Email);

                newUser.signUp(null, {
                    success: function (userr) {
                        // Hooray! Let them use the app now.
                        callback(true, null);
                    },
                    error: function (userr, error) {
                        // Show the error message somewhere and let the user try again.
                        //alert("Error: " + error.code + " " + error.message);
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, error);
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
                        callback(false, error);
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
                        callback(false, error);
                    }
                });
            },

            isCurrentUser: function isCurrentUser(callback) {
                var currentUser = Parse.User.current();
                if (currentUser) {
                    // do stuff with the user
                    callback(true);
                } else {
                    // show the signup or login page
                    callback(false);
                }

            },

            //Need the data of the current user getting form LocalStorage first if possible.
            getCurrentUser: function getCurrentUser(callback)
            {
                var currentUser = Parse.User.current();
                //Not quite sure why I need to do that but I figure out I cannot not really get the user object without
                var userObject = new Object();

                userObject.nick =  Parse.User.current().get("nick");
                userObject.gender =  currentUser.attributes.gender;
                userObject.favoriteGenre = currentUser.attributes.favoriteGenre;

                callback(userObject);
            },

            getActions: function getActions(callback) {
                var actions = new ActionCollection();

                actions.fetch({

                    success: function (results) {

                        callback(results);
                    },

                    error: function (results, error) {
                        alert("Collection Error: " + error.message);
                    }
                });
            },

            getWholeActions: function getWholeActions(callback) {
                var query = new Parse.Query(Action);

                // Retrieve the most recent ones
                query.descending("createdAt");

                // Only retrieve the last ten
                query.limit(10);

                // Include the post data with each comment
                query.include("bookPointer");
                query.include("userPointer");
                query.include("actionTypePointer");


                query.find({
                    success: function (actions) {
                        // Comments now contains the last ten comments, and the "post" field
                        // has been populated. For example:
                        callback(actions);

                    }
                });

            },

            getActionsPage: function getActionsPage(pageNumber, callback) {
                var recordsPerPage = 10;
                var query = new Parse.Query(Action);

                // Retrieve the most recent ones
                query.descending("createdAt");

                // Only retrieve the last ten
                query.limit(recordsPerPage);
                query.skip(pageNumber*recordsPerPage);

                // Include the post data with each comment
                query.include("bookPointer");
                query.include("userPointer");
                query.include("actionTypePointer");


                query.find({
                    success: function (actions) {
                        // Comments now contains the last ten comments, and the "post" field
                        // has been populated. For example:
                        callback(actions);

                    }
                });

            },

            getBooks: function getBooks(callback) {

                // Instantiate a petition collection
                var books = new BookCollection();

                // Use Parse's fetch method (a modified version of backbone.js fetch) to get all the petitions.
                books.fetch({
                    success: function (results) {
                        // Send the petition collection back to the caller if it is succesfully populated. 
                        callback(results);
                    },
                    error: function (results, error) {
                        alert("Collection Error: " + error.message);
                    }
                });
            },

            getBookByIsbnAndOwnerId: function getBookByIsbnAndOwnerId(isbn, ownerId, callback)
            {
                var query = new Parse.Query(Book);

                // Include the post data with each comment
                query.include("ownerRelation.objectId");
                query.equalTo("isbn", isbn);
                query.equalTo("ownerId", ownerId);

                query.find({
                    success: function (actions) {
                        // Comments now contains the last ten comments, and the "post" field
                        // has been populated. For example:
                        callback(actions);

                    }
                });

            },

            getBookById: function getBookById(id, callback)
            {
                var query = new Parse.Query(Book);

                // Include the post data with each comment
                query.equalTo("objectId", id);

                query.find({
                    success: function (book) {
                        // Comments now contains the last ten comments, and the "post" field
                        // has been populated. For example:
                        callback(book);

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
                var newAcl = new Parse.ACL(Parse.User.current());
                newAcl.setPublicReadAccess(true);
                book.setACL(newAcl);
                //TODO hev: make sure a user does not upload two books with the same title

                book.save(null, {
                    success: function (book) {
                        // The object was saved successfully.
                        callback(true, null);
                    },
                    error: function (book, error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false, error);
                    }
                });
            },

            releaseBook: function releaseBook(releaseInfo, callback)
            {
                var Book = Parse.Object.extend("Book");
                var ActionType = Parse.Object.extend("ActionType");
                var User = Parse.Object.extend("User");

                var action = new Action();
                var currentUser = Parse.User.current();

                action.set("place", new Parse.GeoPoint({latitude:releaseInfo.geoPoint.latitude, longitude:releaseInfo.geoPoint.longitude}));
                action.set("bookLocationDescription", releaseInfo.bookLocationDescription);

                action.set("bookPointer", new Book({id: releaseInfo.bookId}));// { __type: "Pointer", className: "Book", objectId: releaseInfo.bookId });

                //TODO: How do we get this ActionTypes? Hardcoded, getting ti every time. It has a static nature, why to call again??
                //download it once at the begining? LS?

                action.set("actionTypePointer",new ActionType({id: "kJC954w9iO"})); //{ __type: "Pointer", className: "ActionType", objectId: "kJC954w9iO" });

                //TODO: Do we need the userPointer since we have the ACL?
                action.set("userPointer", new User({id: Parse.User.current().id})); //{ __type: "Pointer", className: "User", objectId: Parse.User.current().id });

                var newAcl = new Parse.ACL(currentUser);
                newAcl.setPublicReadAccess(true);
                action.setACL(newAcl);

                action.save(null, {
                    success: function (data) {
                        // The object was saved successfully, lets update the status
                        //TODO: Should we do that in cloude code? After Action saved?! Most likely for the released hunted loop

                        callback(true);
                    },
                    error: function (data,error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false);
                    }
                });

            },

            getBookRegistrationId: function GetBookRegistrationId(callback) {

                Parse.Cloud.run('GetBookId', {}, {
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function (error) {
                        callback(false, error);
                    }
                });
            },

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




