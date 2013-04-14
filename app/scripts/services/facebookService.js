'use strict';


angular.module('BookCrossingApp')
  .factory('facebookService',[function(){
      return FB;
}]);

window.fbAsyncInit = function () {
    FB.init({
        appId: 'SOME_APP_ID_HERE', // App ID
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true,  // parse XFBML
        oauth: true
    });
};

// Load the SDK Asynchronously
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
})(document);