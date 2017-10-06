/* global angular */
//=======================   Init Application =================================
var module = angular.module('AuthService', ['ngCookies']);

//=======================  Accounts Service =================================
module.factory('AccountsService', ['$http',
    function($http) {
        return {
            get: function() {
                return $http.get('/accounts');
            },
            create: function(accountData) {
                return $http.post('/accounts', accountData);
            },
            delete: function(id) {
                return $http.delete('/accounts/' + id);
            },
            showEditPage: function(id) {
                return $http.get('/accounts/edit/'+id);
            },
            update: function(id,accountData) {
                return $http.post('/accounts/edit/' + id, accountData);
            }
        };
    }
]);

//=======================  Todos Service =================================
module.factory('TodosService', ['$http',
    function($http) {
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
        };
    }
]);

//=======================  Auth Service =================================
module.factory('AuthService', ['$http', '$q', '$timeout', '$cookieStore',
    function($http, $q, $timeout, $cookieStore) {
        // create user variable
        var user = null;
        // return available functions for use in the controllers
        return ({
            isLoggedIn: isLoggedIn,
            login: login,
            getUser: getUser,
            getProfile: getProfile,
            deleteUser: deleteUser,
            signup: signup,
            logout: logout,
            getUserStatus: getUserStatus,
        });

        function getUserStatus() {
            return $http.get('/profile')
                // handle success
                .success(function(data) {
                    if (data.status) {
                        user = true;
                    }
                    else {
                        user = false;
                    }
                })
                // handle error
                .error(function(data) {
                    user = false;
                });
        }

        function logout() {
            // create a new instance of deferred
            var deferred = $q.defer();
            // send a get request to the server
            $http.get('/logout')
                // handle success
                .success(function(data) {
                    user = false;
                    deferred.resolve();
                })
                // handle error
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });
            // return promise object
            return deferred.promise;
        }

        function signup(username, password, fname, lname) {
            
            // Setting a cookie
            $cookieStore.put('userID', username);
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/signup', { username: username, password: password, fname: fname, lname: lname })
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        deferred.resolve();
                    }
                    else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        }

        function deleteUser(id) {
            return $http.delete('/profile/' + id);
        }

        function getProfile() {
            return $http.get('/profile.json');
        }

        function getUser() {
            return $cookieStore.get('userID');
        }

        function isLoggedIn() {
            if (user) {
                return true;
            }
            else {
                return false;
            }
        }

        function login(username, password) {

            // Setting a cookie
            $cookieStore.put('userID', username);

            // create a new instance of deferred
            var deferred = $q.defer();
            var identity = { username: username, password: password };

            // send a post request to the server
            $http.post('/login',
                    identity)
                // handle success
                .success(function(data, status) {
                    if (status === 200 && data.status) {
                        user = true;
                        deferred.resolve();
                    }
                    else {
                        user = false;
                        deferred.reject();
                    }
                })
                // handle error
                .error(function(data) {
                    user = false;
                    deferred.reject();
                });
            return deferred.promise;
        }
    }
]);
