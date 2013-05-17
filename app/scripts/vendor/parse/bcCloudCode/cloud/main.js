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
    //hev: In order to insert a object in a Action class
    //I need to retrieve the ActionType
    var action = new Parse.Object("Action");
    var query = new Parse.Query("ActionType");

    console.log("Retreiving objects...");
    //hev: We know that the objectId for "Ha subido" is cacZr6Q9YL so give me the activity type with
    // ObjectId cacZr6Q9YL
    query.get("cacZr6Q9YL", {
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

        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            console.error("Error trying to get the ActivityType");
        }
    });
});

Parse.Cloud.afterSave("Action", function (request) {

    var BookStatus = Parse.Object.extend("BookStatus");
    var Book = Parse.Object.extend("Book");
    var bookRequested = new Book();

    var actionType = request.object.get("actionTypePointer").id;
    var bookId = request.object.get("bookPointer").id;

    bookRequested.id = bookId;
    console.log("before fetch book.id " + bookRequested.id);
    var newBookStatus;

    bookRequested.fetch({
        success: function (book) {

            console.log("actionType " + actionType);

            //ReleaseBook
            if(actionType == "kJC954w9iO")
            {
                //E4ERgRpVCw => BookStatus Released
                newBookStatus = "E4ERgRpVCw";
                book.increment("released");
            }
            //HuntBook
            else if(actionType == "UIfKw8yTZQ")
            {
                //LeIWbPd5vA => BookStatus Hunted
                newBookStatus = "LeIWbPd5vA";
                book.increment("hunted");
            }
            //Lost
            else if(actionType == "SXuWKfcmw5")
            {
                //XMFkXS9NVv => BookStatus Lost
                newBookStatus = "XMFkXS9NVv";
            }
            else
            {
                console.log("Error: No ActionType under ReleaseBook | HuntBook | Lost something has went wrong!");
            }

            console.log("newBookStatus" + newBookStatus);

            book.set("bookStatus", new BookStatus({id: newBookStatus}));


            console.log("book.id " + book.id);
            //console.log("book.isValid() " + book.isValid());
            //console.log("book.bookStatus " + book.get("bookStatus").id);
            //console.log("book.description " + book.get("description"));

            book.save(null,{
                success: function(data) {
                    console.log("Book Status updated to: " +newBookStatus);
                },
                error: function (data,error) {
                    // error is a Parse.Error with an error code and description.
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            console.log("Error: " + error.code + " " + error.message);
        }

    });
});
