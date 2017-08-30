var module = angular.module('todoService', []);
// super simple service
// each function returns a promise object 
module.factory('Todos', ['$http', function($http) {
	return {
		get: function() {
			return $http.get('/todos.json');
		},
		create: function(todoData) {
			return $http.post('/todos', todoData);
		},
		delete: function(id) {
			return $http.delete('/todos/' + id);
		}
	}
}]);