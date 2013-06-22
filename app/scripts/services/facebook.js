'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

      return{

          login:function (callback) {
              FB.getLoginStatus(function (response) {
                  switch (response.status) {
                      case 'connected':
                          //$rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                          alert("connected");
                          callback(response.status);

                          break;
                      case 'not_authorized' || 'unknown':
                          if (response.authResponse) {

                              alert("not autho");
                              callback(response.status, response.authResponse);


                          } else {
                              console.log('Facebook login failed', response);
                          }
                          break;
                      default:
                          alert("default");
                          FB.login(function (response) {

                              if (response.authResponse) {

                                  alert("login!");
                                  callback(response.status, response.authResponse.userID);


                              } else {
                                  alert("login failed!");
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

