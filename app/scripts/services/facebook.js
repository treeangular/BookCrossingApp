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
                          alert(response.status);
                          break;
                      case 'not_authorized' || 'unknown':
                          if (response.authResponse) {

                              callback(response.status, response.authResponse);
                              alert(response.status);

                          } else {
                              console.log('Facebook login failed', response);
                          }
                          break;
                      default:
                          FB.login(function (response) {

                              if (response.authResponse) {

                                  callback(response.status, response.authResponse.userID);
                                  alert(response.status);

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

