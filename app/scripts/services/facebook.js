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
                      user.myPicture = response.picture;
                      user.fbId = response.id;

                      callback(user);


              });
          }

      };

});