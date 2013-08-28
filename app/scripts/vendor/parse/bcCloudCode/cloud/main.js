/**
 * Created with JetBrains WebStorm.
 * User: dej
 * Date: 30/05/13
 * Time: 14:12
 * To change this template use File | Settings | File Templates.
 */

var mandrillApiKey = "B_wdVDqt9GPoofuFqKYf_w";
var ActionTypesConst =
{
    Hunted: "UIfKw8yTZQ",
    Released: "kJC954w9iO",
    Registered: "cacZr6Q9YL",
    Locked: "c8g1mW5GeK",
    Lost: "SXuWKfcmw5",
    Joined: "Rqv9aPsb8z",
    Commented: "s1sFLCZNWN",
    Reviewed: "EIDZ8WwmZK"
};

var BookStatusConst =
{
    Hunted: "LeIWbPd5vA",
    Released: "E4ERgRpVCw",
    Registered: "wXbJK5Sljm",
    Lost: "XMFkXS9NVv"
}
function getRandomString()
{
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var string_length = 4;
    var randomstring = '';

    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum + 1);
    }
    return randomstring;
}

function findRegistrationId()
{
    console.log("Enter findRegistrationId")
    var randomString = getRandomString();
    var query = new Parse.Query("Book").equalTo("registrationId", randomString);

    var promise = new Parse.Promise();

    query.find().then(function(results) {
        if (results.length == 0)
        {
            promise.resolve(randomString);
        }
        else
        {
            findRegistrationId().then(function(result) {
                promise.resolve(result);
            }, function(error) {
                promise.reject(error);
            });
        }
    }, function(error) {
        promise.reject(error);
    });

    return promise;
}
//This is used for calculating the average from a book
function CalculateAverageFromBook(bookId)
{
    var query = new Parse.Query("Review").equalTo("bookId", bookId);

    var promise = new Parse.Promise();

    query.find().then(function(results) {

        var averageResult = 0;

        for(var i=0; i < results.length; i++)
        {
            averageResult += results[i];
        }

        averageResult = averageResult/results.length;
        promise.resolve(averageResult);

    }, function(error) {
        promise.reject(error);
    });

    return promise;
}

// Use Parse.Cloud.define to define as many cloud functions as you want.
// Gets the unique cool BC identificator. The real glue of BC!
Parse.Cloud.define("GetBookId", function(request, response) {

    var promise = findRegistrationId();

    promise.then(function(result){

        console.log("successfully returned by the promise");
        response.success(result);

    }, function(error){

        console.log("error returned the promise");
        response.error(error);

    });



});

//Update book counters before saving it
Parse.Cloud.beforeSave("Book", function(request, response) {
    var bookCounterToIncerement;

    switch (request.object.get("bookStatus").id) {
        case BookStatusConst.Registered:
            bookCounterToIncerement = "registered";
            break;
        case BookStatusConst.Released:
            bookCounterToIncerement = "released";
            break;
        case BookStatusConst.Hunted:
            bookCounterToIncerement = "hunted";
            break;
        default:
            //Do nothing
    }

    request.object.increment(bookCounterToIncerement);

    response.success();

});

Parse.Cloud.afterSave("ReviewLike", function(request){

    var review = new Parse.Object("Review");
    var isLike = request.object.get("isLike")

    //Update User counters
    review = request.object.get("review");
    if(isLike)
    {
        review.increment("likeCount");
        review.set("comingFrom", "ReviewLike");
    }
    review.save(null, {
        success: function (review) {
            console.log("Like or unLike Incremented")
        },
        error: function (error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
            console.error("Insertion Error: " + error.message);
            throw "Got an error " + error.code + " : " + error.message;
        }
    });
});

Parse.Cloud.afterSave("Review", function(request){

    var user = new Parse.Object("User");
    var action = new Parse.Object("Action");
    //Need to retrieve the ActionType
    var book = new Parse.Object("Book");
    var query = new Parse.Query("ActionType");
    query.equalTo("objectId", ActionTypesConst.Reviewed);


    //Check if we just save released or hunted the book
    console.log("Retreiving objects...");

    //WE avoid to register an action after save a ReviewLike that has an update over Review
    if(request.object.get("comingFrom")!== "ReviewLike")
    {
        //First we get the king of ActionType
        query.first().then(function(result){

            console.log("ActionType correctly gotten");
            action.set("actionType", result);
            action.set("book", request.object.get("book"));
            action.set("user", request.user);
            return action.save();

         //Then we save the action
        }).then(function(){

        //Once the action is saved we calculate the new average of the book
                console.log("ActionType correctly saved");
                return CalculateAverageFromBook(request.Object.get("book").id);

        //The review has an average so after we have saved the review we calculate the new Average
        }).then(function(average){

                console.log("average correctly gotten");
                book.set("comingFrom", "Review");
                book.set("averageRate", average);
                return book.save();

        //We must save the average in the book,
        // but we put a "flag" in order to avoid the after save book on the server
        }).then(function(){

                console.log("Book correctly saved");

           }, function(error){

                // The save failed.
                // error is a Parse.Error with an error code and description.
                console.error("Insertion Error: " + error.message);
                throw "Got an error " + error.code + " : " + error.message;
        });

    }
});
Parse.Cloud.afterSave("Comment", function(request){


    var user = new Parse.Object("User");
    var action = new Parse.Object("Action");
    //Need to retrieve the ActionType
    var book = new Parse.Object("Book");
    var query = new Parse.Query("ActionType");

    //Check if we just save released or hunted the book
    console.log("Retreiving objects...");

    query.get(ActionTypesConst.Commented, {
        success: function (result){
            //Add new Action

            //Set the action with the result
            action.set("actionType", result);
            action.set("book", request.object.get("book"));
            action.set("user", request.user);

            action.save(null, {
                success: function (action) {

                },
                error: function (error) {
                    // The save failed.
                    // error is a Parse.Error with an error code and description.
                    console.error("Insertion Error: " + error.message);
                    //throw "Got an error " + error.code + " : " + error.message;
                }
            });
        },
        error: function (error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
            console.error("Insertion Error: " + error.message);
            throw "Got an error " + error.code + " : " + error.message;
        }
    });



    //Update User counters
    user = request.user;
    user.increment("comments");
    user.save(null, {
        success: function (user) {
            console.log("comments of the user incremented")
        },
        error: function (error) {
            // The save failed.
            // error is a Parse.Error with an error code and description.
            console.error("Insertion Error: " + error.message);
            throw "Got an error " + error.code + " : " + error.message;
        }
    });
});
//Adds an action based on the new book status
//Updates user counters
Parse.Cloud.afterSave("Book", function (request) {

    if(request.object.get("comingFrom")!== "Review")
    {
        var bookStatus = request.object.get("bookStatus").id;

        //Need to retrieve the ActionType
        var action = new Parse.Object("Action");
        var query = new Parse.Query("ActionType");
        var user = new Parse.Object("User");
        var tracking = Parse.Object("Tracking");

        var actionTypeId;
        var userCounterToIncerement;

        switch (request.object.get("bookStatus").id) {
            case BookStatusConst.Registered:
                actionTypeId = ActionTypesConst.Registered;
                userCounterToIncerement = "registered";
                break;
            case BookStatusConst.Released:
                actionTypeId = ActionTypesConst.Released;
                userCounterToIncerement = "released";
                break;
            case BookStatusConst.Hunted:
                actionTypeId = ActionTypesConst.Hunted;
                userCounterToIncerement = "hunted";
                break;
            default:
                actionTypeId = "";
        }

        if(actionTypeId != "")
        {
            //Check if we just save released or hunted the book
            console.log("Retreiving objects...");

            query.get(actionTypeId, {
                success: function (result){
                    //Add new Action

                    //Set the action with the result
                    action.set("actionType", result);
                    action.set("book", request.object);
                    action.set("user", request.user);

                    action.save(null, {
                        success: function (action) {
                            // The action was saved successfully.
                        },
                        error: function (error) {
                            // The save failed.
                            // error is a Parse.Error with an error code and description.
                            console.error("Insertion Error: " + error.message);
                            //throw "Got an error " + error.code + " : " + error.message;
                        }
                    });

                    //Update User counters
                    user = request.user;
                    if(userCounterToIncerement != "")
                    {
                        user.increment(userCounterToIncerement);}

                    user.save(null, {
                        success: function (user) {
                            console.log("registers of the user incremented")
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

            //Save tracking if the book have been released
            if(actionTypeId == ActionTypesConst.Released)
            {
                console.log("It is a release going to create the Tracking record ");

                //Set the new tracking record
                tracking.set("releasedBy", request.object.get("ownedBy"));
                tracking.set("releasedAt", request.object.get("releasedAt"));
                tracking.set("releasedAtDescription", request.object.get("releasedAtDescription"));
                tracking.set("book", request.object);

                tracking.save(null, {
                    success: function (tracking) {
                        // The object was saved successfully.
                        console.log("Tracking record was saved successfully." );
                    },
                    error: function (error) {
                        // The save failed.
                        // error is a Parse.Error with an error code and description.
                        console.log("Error tracking.save: " + error.code + " " + error.message);
                    }
                });
            }

            //Send email after registration
            if(actionTypeId == ActionTypesConst.Registered)
            {
            var Mandrill = require('mandrill');
            Mandrill.initialize(mandrillApiKey);
                //var user = request.user;
                var nick = request.user.get("nick");
                var email = request.user.get("email");
                console.error("email of registering user: " + email);
                var bookTitle = request.object.get("title");
                var registrationId = request.object.get("registrationId");

                var htmlMSG = "";
                htmlMSG += '<html><head><meta http-equiv="content-type" content="text/html;charset=utf-8" /><title></title></head><body>';
                htmlMSG += '<div>Hi ' + nick + ' <br> This is the code that makes the magic of BookCrossing possible. Up to you, write, label or serigraph the code in the first pages, whatever it works but make sure other users will be able to find it and easily read the code.<br>   </div>';
                htmlMSG += '<br> Registration code: <h3><b> ' + registrationId + '</b><h3>';
                htmlMSG += '</body></html>'

                Mandrill.sendEmail({
                    message: {
                        html: htmlMSG,
                        //text: "Hi " + nick + ", This is the code that makes the magic of BookCrossing possible. Up to you, write, label or serigraph the code in the first pages, whatever it works but make sure other users will be able to find it and easily read the code." + registrationId,
                        subject: "BookCrossingApp Registration code for " + bookTitle,
                        from_email: "registration@bookcrossingapp.com",
                        from_name: "BookCrossingApp Registration code",
                        to: [
                            {
                                email: email,
                                name: nick
                            }
                        ]
                    },
                    async: true
                },{
                    success: function(httpResponse) {
                        console.log(httpResponse);
                        response.success("Email sent!");
                    },
                    error: function(httpResponse) {
                        console.error(httpResponse);
                        response.error("Uh oh, something went wrong");
                    }
                })

            }
    }

    }
});
