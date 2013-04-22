'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

      return{

          login:function (callback) {
              FB.getLoginStatus(function (response) {
                  switch (response.status) {
                      case 'connected':
                          //$rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                          callback(response.status);
                          break;
                      case 'not_authorized' || 'unknown':
                          if (response.authResponse) {

                              callback(response.status, response.authResponse);

                          } else {
                              console.log('Facebook login failed', response);
                          }
                          break;
                      default:
                          FB.login(function (response) {

                              if (response.authResponse) {

                                  callback(response.status, response.authResponse.userID);

                              } else {
                                  $rootScope.$broadcast('fb login failed');
                              }
                          });
                          break;
                  }
              }, true);
          },
          logout:function () {
              FB.logout(function (response) {
                  if (response) {
                      $rootScope.$broadcast('fb_logout_succeded');
                  } else {
                      $rootScope.$broadcast('fb_logout_failed');
                  }
              });
          }

      };

});

window.fbAsyncInit = function () {
    FB.init({
        appId:'160779410752321',
        channelUrl :'http://localhost.com:8080/BookCrossingApp/app/#/channel.html',
        status:true,
        cookie:true,
        xfbml:true
    });
};

(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
