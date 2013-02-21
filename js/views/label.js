// js/views/label.js

var app = app || {};

// Actio label (a book) View
// --------------


// The DOM element for label...
app.LabelView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template($('#lable-template').html()),

    // The DOM events specific to an item.
    events: {
        'click labelBookSubmitButton': 'generateBookLabel'
        
    },

    // The LabelView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Book** and a **BookView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
        this.model.on('change', this.render, this);
    },

    // Re-renders the book item to the current state of the model and
    // updates the reference to the book's edit input within the view.
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    generateBookLabel: function () {

        


    }

});