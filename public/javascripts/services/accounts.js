/* global angular */
var module = angular.module('accountsService', []);
// super simple service
// each function returns a promise object 
module.factory('Accounts', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/accounts.json');
        },
        create: function(todoData) {
            return $http.post('/accounts', todoData);
        },
        delete: function(id) {
            return $http.delete('/accounts/' + id);
        },
        show: function(id){
            return $http.get('/accounts/edit.json');
        },
        update: function(id) {
            return $http.put('/accounts/' + id + 'edit.json');
        }
    };
}]);