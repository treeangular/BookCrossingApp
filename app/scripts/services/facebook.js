'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

      return{

          login1: function(callback)
          {
                  FB.login(
                      function(response) {

                          if (response.session) {
                              alert('logged in');
                          } else {
                              alert('not logged in');
                              alert(response.session.toString());
                          }
                      }
                  );

          },
          login:function (callback) {

              FB.getLoginStatus(function (response) {
                  alert(response.status);
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

                          FB.login(function (response) {

                                alert(response);
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

