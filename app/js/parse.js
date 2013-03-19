var currentUser;
var PARSE_APP_ID = "UVlewktikiK5VltsryjmuxJKyKICSgjcRNNulfFj";
var PARSE_JS_ID = "g8pBOeam9isU4txJuWzewaPZJOYhMYcuTzRe5E9f";

function initParse() {
    Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);
}

function savedreamToDB(dream, cb) {
    if (online) {
        //NEW DREAM => INSERT
        if (dream.id == "") {
            doLog("Going to record dream online");
            var DreamObject = Parse.Object.extend("dream");
            var dreamObject = new DreamObject();
            dreamObject.setACL(new Parse.ACL(Parse.User.current()));
            dreamObject.save(
                { title: dream.title, description: dream.body }, {
                    success: function (object) {
                        alert("yay! it worked");
                    }
                });
        }
        else {//UPDATE
            // Create the object.
            var Dream = Parse.Object.extend("dream");
            var dreamToUpdate = new Dream();

            dreamToUpdate.id = dream.id;
            //dreamToUpdate.set("title", dream.title);
            //dreamToUpdate.set("description", dream.body);

            doLog("Going to update dream in the PARSE cloud");
            dreamToUpdate.save(null, {
                success: function (dreamToUpdate) {
                    // Now let's update it with some new data. In this case, only cheatMode and score
                    // will get sent to the cloud. playerName hasn't changed.
                    dreamToUpdate.set("title", dream.title);
                    dreamToUpdate.set("description", dream.body);
                    dreamToUpdate.save();
                }
            });
        }

    }
    else {
        doLog("Going to record dream offLine");
        //Sometimes you may want to jot down something quickly....
        if (dream.title == "") dream.title = "[No Title]";
        dbShell.transaction(function (tx) {
            if (dream.id == "") tx.executeSql("insert into dreams(title,body,updated) values(?,?,?)", [dream.title, dream.body, new Date()]);
            else tx.executeSql("update dreams set title=?, body=?, updated=? where id=?", [dream.title, dream.body, new Date(), dream.id]);
        }, dbErrorHandler, cb);
    }
}

//I handle getting entries from the db
function getEntries() {
    if (online) {
        doLog("Going to get entries from Parse");
        var DreamObject = Parse.Object.extend("dream");

        var query = new Parse.Query(DreamObject).ascending("updatedAt");
        query.find({
            success: function (results) {
                renderParseEntries(results);
            },
            error: dbErrorHandler
        });

    }
    else {
        doLog("get entries");
        dbShell.transaction(function (tx) {
            tx.executeSql("select id, title, body, updated from dreams order by updated desc", [], renderEntries, dbErrorHandler);
        }, dbErrorHandler);
    }
}

function getDreamById(id) {
    doLog("going to get getDreamById by id : " + id);
    var DreamObject = Parse.Object.extend("dream");
    var query = new Parse.Query(DreamObject);

    query.get(id, {
        success: function (result) {
            $("#dreamId").val(result.id);
            $("#dreamTitle").val(result.get("title"));
            $("#dreamBody").val(result.get("description"));
            $("#editFormSubmitButton").removeAttr("disabled");
        },
        error: dbErrorHandler
    });
}

function logIn(username, password) {
    Parse.User.logIn(username, password, {
        success: function (user) {

            $.mobile.changePage("main.html", { transition: "slide" });

        },
        error: function (user, error) {
            console.log("ERROR!");
            console.dir(error);
            dbErrorHandler(error);
            $("#loginstatus").html(error.message).addClass("errorDiv");
            //rtv = false;
        }
    });
}

function SignUp(username, password, email) {
    doLog("SignUp");

    //try to register with Parse and see if it works.
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    $("#regstatus").html("<b>Registering user...</b>");

    user.signUp(null, {
        success: function (user) {
            $.mobile.changePage("main.html", { transition: "slide" });
        },
        error: function (user, error) {

            console.log("ERROR!");
            console.dir(error);
            dbErrorHandler(error);
            $("#regstatus").html(error.message).addClass("errorDiv");
        }
    });
}

function AmIalreadyLoggedIn() {
    var rtv = false;
    currentUser = Parse.User.current();

    if (currentUser) {
        rtv = true;
        SetCurrentUser(currentUser);
    }

    return rtv;
}

function SetCurrentUser(user) {
    currentUser = user;
}