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
//var PARSE_REST_API_KEY = "CYIfNsDlxO1pDea17LxzEjzDn9E9ZQLbzk5oaigg";


angular.module('DataServices', [])

/**
 * Parse Service
 * Use Parse.com as a back-end for the application.
 */
    .factory('ParseService', function () {
        // Initialize Parse API and objects. Please don't use this key in your own apps. It won't work anyway.

        try {
            Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);
        } catch (e) {
            console.log(e);
        }

        //Create Object/Table names with capital first letter, following Parse guidelines.
        var Book = Parse.Object.extend("Book");
        var BookCollection = Parse.Collection.extend({ model: Book });
        var Action = Parse.Object.extend("Action");
        var ActionCollection = Parse.Collection.extend({ model: Action });

        /**
        * ParseService Object
        * This is what is used by the main controller to save and retrieve data from Parse.com.
        * Moving all the Parse.com specific stuff into a service allows me to later swap it out 
        * with another back-end service provider without modifying my controller much, if at all.
        */
        var ParseService = {
            name: "Parse",

            //Sign In User
            signIn: function signIn(email, password, callback) {

                Parse.User.logIn(email, password, {
                    success: function (user) {
                        // Do stuff after successful login.
                        callback(true);
                    },
                    error: function (user, error) {
                        // The login failed. Check error to see why.
                        alert("Error: " + error.code + " " + error.message);
                        console.log("Error: " + error.code + " " + error.message);
                        callback(false);
                    }
                });
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
                        alert("Error: " + error.code + " " + error.message);
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

            registerBook: function registerBook(bookk, callback) {

                var book = new Book();

                book.set("title", bookk.title);
                book.set("description", bookk.Description);
                book.set("registrationId", bookk.RegistrationId);
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
                        callback(false, error);
                    }
                });
            },

            GetBookRegistrationId: function GetBookRegistrationId(callback) {

                Parse.Cloud.run('GetBookId', {}, {
                    success: function (result) {
                        callback(true, result);
                    },
                    error: function (error) {
                        callback(false, error);
                    }
                });


            }
        };

        return ParseService;
    })

.factory('DataService', function (ParseService, $location) {
    // Use the BackboneService by default
    var serviceToUse = ParseService;

    return serviceToUse;
});



