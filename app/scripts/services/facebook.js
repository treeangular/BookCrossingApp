'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

      return{

          share: function shareInTimeLine(actionTypeName, bookTitle, bookImage, bookLocation,callback){

              // calling the API ...
              var obj = {
                  method: 'feed',
                  link: 'http://www.bookcrossingapp.com/',
                  picture: bookImage,
                  name: bookTitle + ' was ' + actionTypeName,
                  caption: 'In ' + bookLocation,
                  description: bookTitle + ' was ' + actionTypeName + ' in BookCrossing app'
              };


              FB.ui(obj, function(response){

                  if(response != undefined)
                  {
                      callback(true, null);
                  }
                  else
                  {
                      callback(false, ErrorConst.GenericError)
                  }

              });


          },
          login:function (callback) {

              FB.getLoginStatus(function (response) {


                  switch (response.status) {

                      case 'connected':
                          FB.api('/me', function(response) {

                              callback(true, response);

                          });

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

