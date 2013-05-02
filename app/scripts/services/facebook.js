'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

        return{

          getUserInfo:function (callback) {

              var user={};


              FB.api('/me', function(response) {

                      user.username = response.username;
                      user.email = response.email;
                      user.gender = response.gender;
                      user.myPictureFile = response.picture;
                      user.fbId = response.id;

                      callback(user);


              });
          },
          logout:function () {
              FB.logout(function (response) {
                  if (response) {
                      $rootScope.$broadcast('fb_logout_succeded');
                  } else {
                      $rootScope.$broadcast('fb_logout_failed');
                  }
              });
          },

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
          }

      };

});