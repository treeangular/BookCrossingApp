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

     if(request.object.get("bookStatus") !== undefined)
     {
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
     }
      else
     {
         console.error("** request undefined");
         response.success();
     }


});

Parse.Cloud.afterSave("Suggestion", function(request){

    var Mandrill = require('mandrill');
    Mandrill.initialize(mandrillApiKey);
    //var user = request.user;
    var email = request.user.get("email");
    var suggestion = request.object.get("content");


    var htmlMSG = "";

    htmlMSG += '<html lang="en">';
    htmlMSG += '<head>';
    htmlMSG += '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">';
    htmlMSG += '<title>BookCrossingApp - Suggestion</title>';
    htmlMSG += '</head>';
    htmlMSG += '<body style="margin: 0; padding: 0; background: #bccdd9; font: normal Helvetica">';
    htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%">';
    htmlMSG += '<tr>';
    htmlMSG += '<td align="center" style="margin: 0; padding: 0; background:#bccdd9 ;padding:0">';
    htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" class="header">';
    htmlMSG += '<tr>';
    htmlMSG += '<td bgcolor="#080808" height="150" align="center">';
    htmlMSG += '<h1 style="color: #fff; margin: 0; padding: 0; line-height: 33px;"><a href="http://www.bookcrossingapp.com" target="_blank"><img src="http://www.bookcrossingapp.com/img/email_logo.gif"/></a></h1>';
    htmlMSG += '</td>';
    htmlMSG += '</tr>';
    htmlMSG += '</table><!-- header-->';
    htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" bgcolor="#ffffff">';
    htmlMSG += '<tr>';
    htmlMSG += '<td width="14" style="font-size: 0px;" bgcolor="#ffffff">&nbsp;</td>';
    htmlMSG += '<td valign="top" align="left" bgcolor="#ffffff"style="background: #fff;">';
    htmlMSG += '<table cellpadding="0" cellspacing="0" border="0"  style="color:#767676;; margin: 0; padding: 0;" class="content">';
    htmlMSG += '<tr>';
    htmlMSG += '<td style="padding: 15px 0 15px; border-bottom: 1px solid #d2b49b;"  valign="top">';
    htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px;">' + email + ',</p>';
    htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px;">' + suggestion + ',</p>';
    htmlMSG += '</td>';
    htmlMSG += '</tr>';
    htmlMSG += '</table>';
    htmlMSG += '</td>';
    htmlMSG += '<td width="16" bgcolor="#ffffff" style=" background: #fff;">&nbsp;</td>';
    htmlMSG += '</tr>';
    htmlMSG += '</table><!-- body -->';
    htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="line-height: 10px;" bgcolor="#698291" class="footer">';
    htmlMSG += '<tr>';
    htmlMSG += '<td bgcolor="#169691"  align="center" style="padding: 15px 0 10px; font-size: 11px; color:#fff; margin: 0; line-height: 1.2;" valign="top">';
    htmlMSG += '<p style="padding: 0; font-size: 11px; color:#fff; margin: 0;">Sharing books around the world.</p>';
    htmlMSG += '</td>';
    htmlMSG += '</tr>';
    htmlMSG += '</table><!-- footer-->';
    htmlMSG += '</td>';
    htmlMSG += '</tr>';
    htmlMSG += '</table>';
    htmlMSG += '</body>';
    htmlMSG += '</html>';

    Mandrill.sendEmail({
        message: {
            html: htmlMSG,
            subject: "Suggestion from " + email,
            from_email: "registration@bookcrossingapp.com",
            from_name: "BookCrossingApp suggestion",
            to: [
                {
                    email: "treeangular@gmail.com",
                    name: email
                }
            ]
        },
        async: true
    },{
        success: function(httpResponse) {
            console.log("Email sent successfully");
            console.log(httpResponse);
        },
        error: function(httpResponse) {
            console.error("Error sending email");
            console.error(httpResponse);
        }
    })

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
    var bookAverage = new Parse.Object("BookAverage");
    var queryCurrentAverage = new Parse.Query("BookAverage");
    var query = new Parse.Query("ActionType");
    query.equalTo("objectId", ActionTypesConst.Reviewed);
    var bookFromReview;
    var newAverageValue = request.object.get("rating");

    //Check if we just save released or hunted the book
    console.log("Retreiving objects...");

    //WE avoid to register an action after save a ReviewLike that has an update over Review
    if(request.object.get("comingFrom")!== "ReviewLike")
    {
        //First we get the king of ActionType
        query.first().then(function(result){

            bookFromReview = request.object.get("book");
            console.log("ActionType correctly gotten");
            action.set("actionType", result);
            action.set("book", bookFromReview);
            action.set("user", request.user);
            return action.save();

         //Then we save the action
        }).then(function(actionSaved){
        //Get the current average
                console.log("ActionType correctly saved");
                queryCurrentAverage.equalTo("book", bookFromReview);
                return queryCurrentAverage.first();

        }).then(function(currentAverage){
        //Once we have the  we calculate the new average of the book
                console.log("Found current book average");
                bookAverage = currentAverage;
                console.log("average correctly gotten");
                var newAverage = (currentAverage.get("average") + newAverageValue) / ( currentAverage.get("numberReviews") + 1 )
                bookAverage.set("average", newAverage);
                bookAverage.increment("numberReviews");
                return bookAverage.save();

        //We must save the average in the book,
        // but we put a "flag" in order to avoid the after save book on the server
        }).then(function(){

                console.log("Book average correctly updated");

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

    if(request.object.get("comingFrom") !== "Review")
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
            console.log("Retreiving objects for after save book...");

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
                var bookTitle = request.object.get("title");
                var registrationId = request.object.get("registrationId");

                console.log("Sending email for registration book " + bookTitle + " with code " + registrationId + " to user " + nick + "  with email " + email);

                var htmlMSG = "";

                htmlMSG += '<html lang="en">';
                htmlMSG += '<head>';
                htmlMSG += '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">';
                htmlMSG += '<title>BookCrossingApp - Book registration</title>';
                htmlMSG += '</head>';
                htmlMSG += '<body style="margin: 0; padding: 0; background: #bccdd9; font: normal Helvetica">';
                htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%">';
                htmlMSG += '<tr>';
                htmlMSG += '<td align="center" style="margin: 0; padding: 0; background:#bccdd9 ;padding:0">';
                htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" class="header">';
                htmlMSG += '<tr>';
                htmlMSG += '<td bgcolor="#080808" height="150" align="center">';
                htmlMSG += '<h1 style="color: #fff; margin: 0; padding: 0; line-height: 33px;"><a href="http://www.bookcrossingapp.com" target="_blank"><img src="http://www.bookcrossingapp.com/img/email_logo.gif"/></a></h1>';
                htmlMSG += '</td>';
                htmlMSG += '</tr>';
                htmlMSG += '</table><!-- header-->';
                htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" bgcolor="#ffffff">';
                htmlMSG += '<tr>';
                htmlMSG += '<td width="14" style="font-size: 0px;" bgcolor="#ffffff">&nbsp;</td>';
                htmlMSG += '<td valign="top" align="left" bgcolor="#ffffff"style="background: #fff;">';
                htmlMSG += '<table cellpadding="0" cellspacing="0" border="0"  style="color:#767676;; margin: 0; padding: 0;" class="content">';
                htmlMSG += '<tr>';
                htmlMSG += '<td style="padding: 15px 0 15px; border-bottom: 1px solid #d2b49b;"  valign="top">';
                htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px;">Hi ' + nick + ',</p>';
                htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px; ">Congratulations! Your book <strong>' + bookTitle + '</strong> was registered succesful.</p>';
                htmlMSG += '<p style="font-weight: bold; margin: 0; padding: 15px; line-height: 20px; font-size: 14px;"><span style="padding: 5px; border: #169691 2px solid;">Registration code: ' + registrationId +'</span></p><br>';
                htmlMSG += '<p style="font-weight: bold; margin: 0; padding: 0; line-height: 20px; font-size: 18px;">So now what?</p>';
                htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px;"><span style="font-size: 20px;font-weight: bold; color:#169691;">1-</span>Print the next bookCrossingApp label.</p>';
                htmlMSG += '<p style="padding-left: 60px"><a href="http://www.bookcrossingapp.com/BookCrossingApp_Label.pdf" target="_blank"><img src="http://www.bookcrossingapp.com/img/label_thumb.gif"/></a></p>';
                htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px; "><span style="font-size: 20px;font-weight: bold; color:#169691;">2-</span>Write your registration code in the label.</p>';
                htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px;"><span style="font-size: 20px;font-weight: bold; color:#169691;">3-</span>Paste the label in your book where the new user can identify it easily.</p><br>';
                htmlMSG += '<p style="font-weight: normal; margin: 0; padding: 0; line-height: 20px; font-size: 12px;">After that you are ready to release your book.  Go to the location where you want to release it using BookCrossingApp so the other bookcrossers can find it.</p>';
                htmlMSG += '</td>';
                htmlMSG += '</tr>';
                htmlMSG += '</table>';
                htmlMSG += '</td>';
                htmlMSG += '<td width="16" bgcolor="#ffffff" style=" background: #fff;">&nbsp;</td>';
                htmlMSG += '</tr>';
                htmlMSG += '</table><!-- body -->';
                htmlMSG += '<table cellpadding="0" cellspacing="0" border="0" align="center" width="100%" style="line-height: 10px;" bgcolor="#698291" class="footer">';
                htmlMSG += '<tr>';
                htmlMSG += '<td bgcolor="#169691"  align="center" style="padding: 15px 0 10px; font-size: 11px; color:#fff; margin: 0; line-height: 1.2;" valign="top">';
                htmlMSG += '<p style="padding: 0; font-size: 11px; color:#fff; margin: 0;">Sharing books around the world.</p>';
                htmlMSG += '</td>';
                htmlMSG += '</tr>';
                htmlMSG += '</table><!-- footer-->';
                htmlMSG += '</td>';
                htmlMSG += '</tr>';
                htmlMSG += '</table>';
                htmlMSG += '</body>';
                htmlMSG += '</html>';

                Mandrill.sendEmail({
                    message: {
                        html: htmlMSG,
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
                        console.log("Email sent successfully");
                        console.log(httpResponse);
                    },
                    error: function(httpResponse) {
                        console.error("Error sending email");
                        console.error(httpResponse);
                    }
                })

            }
    }

    }
});
