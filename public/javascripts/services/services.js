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
                return $http.get('/accounts/edit/' + id);
            },
            update: function(id, accountData) {
                return $http.post('/accounts/edit/' + id, accountData);
            }
        };
    }
]);

//=======================  Todos Service =================================
module.factory('UsersService', ['$http',
    function($http) {
        return {
            get: function() {
                return $http.get('/users');
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
            getTodo: function(id) {
                return $http.get('/todos/edit/' + id);
            },
            create: function(todoData) {
                return $http.post('/todos', todoData);
            },
            delete: function(id) {
                return $http.delete('/todos/' + id);
            },
            update: function(id, todo) {
                return $http.post('/todos/edit/' + id, todo);
            }
        };
    }
]);

//=======================  Auth Service =================================
module.factory('AuthService', ['$http', '$q', '$timeout', '$cookieStore',
    function($http, $q, $timeout, $cookieStore) {
        // create user variable
        var user = null;
        var admin = null;
        // return available functions for use in the controllers
        return ({
            isLoggedIn: isLoggedIn,
            login: login,
            getUser: getUser,
            getProfile: getProfile,
            deleteUser: deleteUser,
            signup: signup,
            logout: logout,
            isAdmin: isAdmin,
            getUserStatus: getUserStatus,
            editUser: editUser,
        });

        function editUser(id, user) {
            return $http.post('/profile/edit/' + id, user);
        }

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
                    admin = false;
                    deferred.resolve();
                    $cookieStore.put('userID', '');
                    alert("Successfully Logged Out");
                })
                // handle error
                .error(function(data) {
                    user = false;
                    admin = false;
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
                        console.log("deferred is" + JSON.stringify(deferred));
                        // this is { promise: {} }
                        deferred.resolve();
                    }
                    else {
                        console.log('Error posting user');
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

        function isAdmin() {
            if (admin) {
                return true;
            }
            else {
                return false;
            }
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
                        admin = data.admin;
                        deferred.resolve();
                    }
                    else {
                        user = false;
                        admin = false;
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
