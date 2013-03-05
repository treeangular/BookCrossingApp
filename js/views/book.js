// js/views/book.js

var app = app || {};

// Book Item View
// --------------

// The DOM element for a book item...
app.BookView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'body',
    //className: ".labelBookButton",

    // Cache the template function for a single item.
    template: _.template($('#label-template').html()),
    templateAccepted: _.template($('#labelAccepted-template').html()),

    // The DOM events specific to an item.
    events: {
        "click input[type=button]": "generateUniqueLabel"
        //'click #labelBookButton': 'generateUniqueLabel',
        //'keypress labelBookButton': 'generateUniqueLabel',
        //'blur .edit': 'close'
    },

    // The BookView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Book** and a **BookView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
        this.model.on('change', this.render, this);
    },

    generateUniqueLabel: function () {
        alert("click on ");
        this.$el.html(this.templateAccepted(this.model.toJSON()));
        console.debug("WTF!");
        //this.laberRegistration = 

    },

    // Re-renders the book item to the current state of the model and
    // updates the reference to the book's edit input within the view.
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function () {
        this.$el.addClass('editing');
        this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the book.
    close: function () {
        var value = this.input.val().trim();

        if (value) {
            this.model.save({ title: value });
        }

        this.$el.removeClass('editing');
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function (e) {
        if (e.which === ENTER_KEY) {
            this.close();
        }
    }
});