'use strict';

/* Services */

/**
 * DataService Module
 *
 *  A collection of services that provide a variety of back-end options for saving
 *  and retrieving data. Parse.com is Backend-as-a-Service company.
 *  They provide easy to use databases for mobile and HTML5 applications.
 */

angular.module('MockDataServices', [])

/**
 * Parse Service
 * Use Parse.com as a back-end for the application.
 */
    .factory('MockParseService', function () {
        // Initialize Parse API and objects. Please don't use this key in your own apps. It won't work anyway.


        //Create Object/Table names with capital first letter, following Parse guidelines.
        var Book = Parse.Object.extend("Book");
        var BookCollection = Parse.Collection.extend({ model: Book });
        var Action = Parse.Object.extend("Action");
        var ActionCollection = Parse.Collection.extend({ model: Action });

        /**
         * MockParseService Object
         * This is what is used by the main controller to save and retrieve data from Parse.com.
         * Moving all the Parse.com specific stuff into a service allows me to later swap it out
         * with another back-end service provider without modifying my controller much, if at all.
         */
        var MockParseService = {
            name: "Parse",

            //Sign In User
            signIn: function signIn(email, password, callback) {

               callback(true)
            },

            //Register new user
            registerNewUser: function registerNewUser(user, callback) {
                        callback(true, null);
            },

            isCurrentUser: function isCurrentUser(callback) {
                    callback(true);
            },

            getActions: function getActions(callback) {

                var results = ({ActionTypePointer:"ActionType1"});

                callback(results);

            },

            getWholeActions: function getWholeActions(callback) {
                var results = ({ActionTypePointer:"ActionType1"});

                callback(results);

            },

            getBooks: function getBooks(callback) {

                var results = ({title:"bookTitle1"},{Description:"This is the description"});

                callback(results);
            },

            registerBook: function registerBook(bookk, callback) {


                        callback(true, null);

            },

            GetBookRegistrationId: function GetBookRegistrationId(callback) {
                var result = "ASCRT6ED";

               callback(true, result);
            }
        };

        return MockParseService;
    })

    .factory('DataService', function (MockParseService, $location) {
        // Use the BackboneService by default
        var serviceToUse = MockParseService;

        return serviceToUse;
    });



