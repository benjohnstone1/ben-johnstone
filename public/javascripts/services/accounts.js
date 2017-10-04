/* global angular */
angular.module('myApp').factory('AccountsService', ['$http',
    function($http) {
        return {
            get: function() {
                return $http.get('/accounts.json');
            },
            create: function(accountData) {
                return $http.post('/accounts', accountData);
            },
            delete: function(id) {
                return $http.delete('/accounts/' + id);
            },
            show: function(id) {
                return $http.get('/accounts/edit.json');
            },
            update: function(id) {
                return $http.put('/accounts/' + id + 'edit.json');
            }
        };
    }
]);