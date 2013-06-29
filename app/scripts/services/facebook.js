'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

      return{

          share: function shareInTimeLine(action, callback){

              // calling the API ...
              var obj = {
                  method: 'feed',
                  redirect_uri: 'YOUR URL HERE',
                  link: 'https://developers.facebook.com/docs/reference/dialogs/',
                  picture: 'http://fbrell.com/f8.jpg',
                  name: 'Facebook Dialogs',
                  caption: 'Reference Documentation',
                  description: 'Using Dialogs to interact with people.'
              };


              FB.ui(obj, function(response){

                  if(response != undefined)
                  {
                      callback(true, null);
                  }

              });


          },
          login:function (callback) {

              FB.getLoginStatus(function (response) {

                  switch (response.status) {
                      case 'connected':

                          callback(true, null);

                          break;
                      case 'not_authorized' || 'unknown':
                          if (response.authResponse) {

                              callback(false, ErrorConst.UserNotAuthorized);


                          } else {
                              console.log('Facebook login failed', response);
                          }
                          break;
                      default:

                          FB.login(
                              function(response) {
                                  if (response.authResponse) {

                                      FB.api('/me', function(response) {

                                          callback(true, response);

                                      });

                                  } else {

                                      callback(false, ErrorConst.UserLoginError)

                                  }
                              },
                              { scope: "email, publish_actions" }
                          );
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

