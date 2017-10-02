/* global angular */
var module = angular.module('loginService', ['ngCookies']);
module.factory('AuthService', ['$http', '$q','$timeout','$cookieStore', function($http, $q, $timeout, $cookieStore) {

    // create user variable
    var user = null;
    
    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      login: login,
      getUser: getUser
    });
    
    function getUser(){
      return $cookieStore.get('userID');
    }

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

function login(username, password) {
  
      // Setting a cookie
      userCookie = $cookieStore.put('userID', username);
      // var userCookie = $cookies['oatmeal'];
      // Retrieving a cookie
      console.log("Username cookie is "+$cookieStore.get('userID'));

      // create a new instance of deferred
      var deferred = $q.defer();
      var identity = { username: username, password: password };

      // send a post request to the server
      $http.post('/login',
        identity)
        // handle success
        .success(function (data, status) {
          console.log("username: "+JSON.stringify(identity.username));
          console.log("password: "+JSON.stringify(identity.password));
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });
        console.log("Deferred Promise:"+JSON.stringify(deferred.promise));
      // return promise object
      return deferred.promise;

    }
}]);