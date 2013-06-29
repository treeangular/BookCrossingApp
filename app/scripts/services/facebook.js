'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

      return{

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
                          alert(response.status);
                          FB.login(
                              function(response) {
                                  if (response.authResponse) {

                                      alert(response.authResponse);

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

