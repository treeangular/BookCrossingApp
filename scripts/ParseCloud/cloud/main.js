
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
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

Parse.Cloud.afterSave("book", function(request) {
	var action = new Action();

    action.set("Action", "BookRegistered");
    action.set("BookId", request.object.get("title"));
    action.set("UserId", request.user);

    action.save(null, {
        success: function(book) {
                // The object was saved successfully.
                //callback(true,null);
                },
        error: function(error) {
                // The save failed.
                // error is a Parse.Error with an error code and description.
                throw "Got an error " + error.code + " : " + error.message;
                }
    });
});
