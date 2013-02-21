// js/models/user.js

var app = app || {};

// User Model
// ----------
// Our basic **User** model has 
// User 1 . . * Action * . .1 Book
//User: 

app.Action = Backbone.Model.extend({

    // Default attributes for the todo
    // and ensure that each action created has `title` and `description` keys.
    defaults: {
        nick: 'No title',
        email: 'No description',
        pass: ''        
    },

    //Think about functions or if we need it at all

});