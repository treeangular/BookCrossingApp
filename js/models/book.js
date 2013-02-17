// js/models/book.js

var app = app || {};

// Book Model
// ----------
// Our basic **Book** model has `title` and `description` attributes.

app.Book = Backbone.Model.extend({

    // Default attributes for the todo
    // and ensure that each book created has `title` and `description` keys.
    defaults: {
        title: 'No title',
        description: 'No description',
        isBeingReaded: false,
    },

    // Toggle the `isBeingReaded` state of this todo item.
    toggle: function () {
        this.save({
            isBeingReaded: !this.get('isBeingReaded')
        });
    }

});