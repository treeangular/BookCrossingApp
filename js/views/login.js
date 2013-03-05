// js/views/login.js

var app = app || {};

// The DOM element for a book item...
app.LoginView = Backbone.View.extend({

    el: $("#layout"),

    labelTemplate: _.template($('#index-template').html()),

    initialize: function () {
        console.log("Initialize for login");
    },

    render: function () {

    }

});