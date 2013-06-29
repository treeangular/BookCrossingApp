'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope){

      return{

          share: function shareInTimeLine(actionTypeName, bookTitle, callback){

              // calling the API ...
              var obj = {
                  method: 'feed',
                  link: 'https://www.bookcrossingapp.com/',
                  picture: 'http://fbrell.com/f8.jpg',
                  name: actionTypeName +' '+ bookTitle,
                  caption: 'Reference Documentation',
                  description: 'Book ' + actionTypeName + ' in BookCrossing app'
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

                  alert(response.status);
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

