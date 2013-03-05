// js/views/app.js

var app = app || {};

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#layout',

    // Our template for the line of statistics at the bottom of the app.
    //statsTemplate: _.template($('#stats-template').html()),

    labelTemplate: _.template($('#index-template').html()),

    // At initialization we bind to the relevant events on the `Books`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting books that might be saved in *localStorage*.
    initialize: function () {
        //this.input = this.$('#new-book');
        //this.allCheckbox = this.$('#toggle-all')[0];
        //this.$footer = this.$('#footer');
        console.log("Initialize for login");
        this.$layout = this.$('#layout');
               
        //this.$layout.html(this.labelTemplate({
           // completed: completed,
            //remaining: remaining
       // }));

        //window.app.Books.on('add', this.addOne, this);
        //window.app.Books.on('reset', this.addAll, this);
        //window.app.Books.on('all', this.render, this);

        //app.Books.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {
        //var hunted = app.Books.hunted().length;
        //var remaining = app.Books.remaining().length;

        this.$layout.show();
        //this.$footer.show();

        this.$layout.html(this.labelTemplate({
            signIn: completed,
            signUn: remaining
        }));

        /* 
        if (app.Books.length) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                hunted: hunted,
                remaining: remaining
            }));

        } else {
            this.$main.hide();
            this.$footer.hide();
            }*/


        //this.allCheckbox.checked = !remaining;
    },

    signIn: function () { },
    signUn: function () { }

    // Add a single book item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    /*addOne: function (book) {
        var view = new app.BookView({ model: book });
        $('#book-list').append(view.render().el);
    },

    // Add all items in the **Books** collection at once.
    addAll: function () {
        this.$('#book-list').html('');
        app.Books.each(this.addOne, this);
    }*/

});