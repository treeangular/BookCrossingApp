/**
 * Created with JetBrains WebStorm.
 * User: hev
 * Date: 24/05/13
 * Time: 14:12
 * To change this template use File | Settings | File Templates.
 */

var ActionTypesConst =
{
    Hunted: "UIfKw8yTZQ",
    Released: "kJC954w9iO",
    Registered: "cacZr6Q9YL",
    Locked: "c8g1mW5GeK",
    Lost: "SXuWKfcmw5",
    Joined: "Rqv9aPsb8z"
};

var BookStatusConst =
{
    Hunted: "LeIWbPd5vA",
    Released: "E4ERgRpVCw",
    Registered: "wXbJK5Sljm",
    Lost: "XMFkXS9NVv"
}


// Use Parse.Cloud.define to define as many cloud functions as you want.
// Gets the unique cool BC identificator. The real glue of BC!
Parse.Cloud.define("GetBookId", function(request, response) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    response.success(randomstring);
});

Parse.Cloud.afterSave("Book", function (request) {
    //Only add the action for a new registered book. For Release & hunt we save an action that triggers this after save also.
    if(request.object.get("bookStatus").id == BookStatusConst.Registered)
    {

        //hev: In order to insert a object in a Action class
        //I need to retrieve the ActionType
        var action = new Parse.Object("Action");
        var query = new Parse.Query("ActionType");
        var user = new Parse.Object("User");



        //Check if we just save released or hunted the book

        console.log("Retreiving objects...");

        query.get(ActionTypesConst.Registered, {
            success: function (result) {

                //Set the action with the result
                action.set("actionTypePointer", result);

                //var description = actionType.get("Description")
                //console.log("After getting the objects:" + description);

                action.set("bookPointer", request.object);
                action.set("userPointer", request.user);

                action.save(null, {
                    success: function (book) {
                        // The object was saved successfully.
                    },
                    error: function (error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.error("Insertion Error: " + error.message);
                        throw "Got an error " + error.code + " : " + error.message;
                    }
                });

                user = request.user;
                user.increment("registers");

                user.save(null, {

                    success: function (user) {

                        console.debug("registers of the user incremented");

                    },
                    error: function (error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.error("Insertion Error: " + error.message);
                        throw "Got an error " + error.code + " : " + error.message;
                    }

                });

            },
            error: function (object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
                console.error("Error trying to get the ActivityType");
            }
        });
    }
    //If the book status is released or hunted do nothing on the book.
    else
    {
        console.log("Nothing to do for book with bookStatus" + request.object.get("bookStatus").id);
    }
});

Parse.Cloud.afterSave("Action", function (request) {

    var BookStatus = Parse.Object.extend("BookStatus");
    var Book = Parse.Object.extend("Book");
    var bookRequested = new Book();


    var actionType = request.object.get("actionTypePointer").id;
    var bookId = request.object.get("bookPointer").id;
    var user = request.object.get("userPointer");

    bookRequested.id = bookId;
    console.log("before fetch book.id " + bookRequested.id);
    var newBookStatus;

    bookRequested.fetch({
        success: function (book) {
            //Update the book only in case we come from a release or hunt.
            var isBookToBeSaved = true;
            console.log("actionType " + actionType);

            //ReleaseBook
            if(actionType == ActionTypesConst.Released)
            {
                newBookStatus = BookStatusConst.Released;
                book.increment("released");

            }
            //HuntBook
            else if(actionType == ActionTypesConst.Hunted)
            {

                newBookStatus = BookStatusConst.Hunted;
                book.increment("hunted");
                user.increment("hunts");
            }
            //Lost
            else if(actionType == ActionTypesConst.Lost)
            {
                newBookStatus = BookStatusConst.Lost;
            }
            else
            {
                isBookToBeSaved = false;
                console.log("Error: No ActionType under ReleaseBook | HuntBook - we were just registering them");
            }

            if(isBookToBeSaved) {
                console.log("newBookStatus" + newBookStatus);
                console.log("book.id " + book.id);
                //console.log("book.isValid() " + book.isValid());
                //console.log("book.bookStatus " + book.get("bookStatus").id);
                //console.log("book.description " + book.get("description"));
                book.set("bookStatus", new BookStatus({id: newBookStatus}));

                book.save(null,{
                    success: function(data) {
                        console.log("Book Status updated to: " +newBookStatus);
                    },
                    error: function (data,error) {
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });
                user.save(null,{
                    success: function(data) {
                        console.log("User hunted books updated");
                    },
                    error: function (data,error) {
                        // error is a Parse.Error with an error code and description.
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });
            }
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            console.log("Error: " + error.code + " " + error.message);
        }

    });
});
