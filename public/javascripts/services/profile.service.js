/* global angular */
var module = angular.module('loginService', []);
// super simple service
// each function returns a promise object 
module.factory('User', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/profile.json');
        }
    };
}]);