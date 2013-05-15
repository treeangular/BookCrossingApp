// Use Parse.Cloud.define to define as many cloud functions as you want.
// Gets the unique cool BC identificator. The real glue of BC!
Parse.Cloud.define("gottenBookId", function(request, response) {
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

    //Logic based on the ActionType we are performing on the Book
    var BookStatus = Parse.Object.extend("BookStatus");
    var Book = Parse.Object.extend("Book");
    var book = new Book();

    var actionType = request.object.get("actionTypePointer").id;
    var bookId = request.object.get("bookPointer").id;

    var queryBook = new Parse.Query("Book");
    var newBookStatus;

    //console.log("actionType: " + actionType);
    //console.log("bookId: " + bookId);

    //First is to get the book we need to update the BookStatus
    queryBook.get(bookId,{
        success: function (gottenBook) {


            //ReleaseBook
            if(actionType == "kJC954w9iO")
            {
                //E4ERgRpVCw => BookStatus Released
                newBookStatus = "E4ERgRpVCw";
            }
            //HuntBook
            else if(actionType == "UIfKw8yTZQ")
            {
                //LeIWbPd5vA => BookStatus Hunted
                newBookStatus = "LeIWbPd5vA";
            }
            //Lost
            else if(actionType == "SXuWKfcmw5")
            {
                //XMFkXS9NVv => BookStatus Lost
                newBookStatus = "XMFkXS9NVv";
            }

            console.log("newBookStatus: " + newBookStatus);
            book.id = bookId;
            book.set("bookStatus", new BookStatus({id: newBookStatus}));
            gottenBook.set("bookStatus", new BookStatus({id: newBookStatus}));

            console.log("book.id: " + book.id);
            console.log("book.get(bookStatus) " + book.get("bookStatus").id);

//            gottenBook.save();
//            book.save();
            gottenBook.save(null,{
                success: function(data) {
                    console.log("Bookstatus updated");
                },
                error: function (data,error) {
                    // error is a Parse.Error with an error code and description.
                    console.log("Error: " + error.code + " " + error.message);
                }
            });

            book.save(null,{
                success: function(data) {
                    console.log("Bookstatus updated");
                },
                error: function (data,error) {
                    // error is a Parse.Error with an error code and description.
                    console.log("Error: " + error.code + " " + error.message);
                }
            });

            //console.log("bookStatus: " + gottenBook.get("bookStatus"));



        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
            //console.error("Error trying to get the Book from BookPointer: " + bookPointer);
            console.log("Error queryBook.get(bookId:" + bookId + " "+ error.code + " " + error.message);
        }

    });









});