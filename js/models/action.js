// js/models/action.js

var app = app || {};

// Action Model
// ----------
// Our basic **Action** model has 
// User 1 . . * Action * . .1 Book
//Action: actionId, userId, bookId, actionType[Share,Hunt,Comment,Label], description,location, ZOBC

app.Action = Backbone.Model.extend({

    // Default attributes for the todo
    // and ensure that each action created has `title` and `description` keys.
    defaults: {
        title: 'No title',
        description: 'No description',
        actionType: '',
        location: '',
        ZOBC: ''
    },

    //Think about functions - When do we create the actions and what do we need form it besides

});