'use strict';


angular.module('facebookProvider', [])
  .factory('facebookService',function($rootScope, $q){

        var myFakeUser = {
            name : "Marcos12",
            fbId : "333498h4",
            id: "2121",
            email : "jasci121212@gmail.com",
            favoriteSongs: ['yesterday', 'help'],
            talks : function(){alert("hi there, my na8me is " + this.name)}
        };

        var share = function shareInTimeLine(actionTypeName, bookTitle, bookImage, bookLocation,callback)
        {
            var deferred = $q.defer();

            if(typeof(FB) != 'undefined')
            {
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
                        $rootScope.$apply(function () {
                        deferred.resolve(response);
                        });
                    }
                    else
                    {

                        $rootScope.$apply(function () {
                            deferred.reject(ErrorConst.GenericError);
                        });
                    }

                });
            }
            else
            {
                deferred.resolve();
            }

            return deferred.promise;
        }

      return{



          share: share,

          login:function (callback) {


              callback(true, myFakeUser);

              /*
               FB.getLoginStatus(function (response) {

                   switch (response.status) {

                       case 'connected':

                           FB.logout(function (response, callback) {
                               if (response)
                               {
                                   alert("logout success");
                                   FB.login(
                                       function(response) {
                                           if (response.authResponse) {

                                               alert("login connecting!!");
                                               FB.api('/me', function(response) {

                                                   alert(response.email);
                                                   callback(true, response);

                                               });

                                           } else {

                                               callback(false, ErrorConst.UserLoginError)

                                           }
                                       },
                                       { scope: "email, publish_actions" }
                                   );
                               }
                               else
                               {


                               }
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
               }, true);  */
          },
          logout:function () {

              FB.logout(function (response, callback) {
                  if (response) {

                      callback(true);
                      //$rootScope.$broadcast('fb_logout_succeded');
                  } else {

                      callback(false);
                      $rootScope.$broadcast('fb_logout_failed');
                  }
              });
          }

      };

});

