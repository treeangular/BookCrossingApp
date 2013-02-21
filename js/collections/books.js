// js/collections/books.js

var app = app || {};

// Book Collection
// ---------------

// The collection of books is backed by *localStorage* instead of a remote
// server.
var BookList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: app.Book,

    // Save all of the book items under the `"books"` namespace.
    //localStorage: new Backbone.LocalStorage('books-backbone'),

    // Filter down the list of all book items that are hunted right now.
  /*  hunted: function () {
        return this.filter(function (book) {
            return book.get('isHunted');
        });
    },

    // Filter down the list to only book items that are not being readed.
    remaining: function () {
        return this.without.apply(this, this.isHunted());
    },

    // We keep the Books in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    // Books are sorted by their original insertion order.
    comparator: function (book) {
        return book.get('order');
    }*/
});

// Create our global collection of **Books**.
app.Books = new BookList();