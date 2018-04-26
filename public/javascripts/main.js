/* global angular */
var myApp = angular.module('myApp', ['ngRoute', 'AuthService']);

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../partials/home.html',
      access: { restricted: false, admin: false }
    })
    .when('/admin', {
      templateUrl: '../partials/admin.html',
      access: { restricted: false, admin: false }
    })
    .when('/users', {
      templateUrl: '../partials/users.html',
      access: { restricted: true, admin: true }
    })
    .when('/accounts', {
      templateUrl: '../partials/accounts.html',
      access: { restricted: true, admin: true }
    })
    .when('/accounts/new', {
      templateUrl: '../partials/accounts.new.html',
      access: { restricted: true, admin: true }
    })
    // the :accountID is now available to the controller
    .when('/accounts/edit/:accountID', {
      templateUrl: '../partials/accounts.edit.html',
      access: { restricted: true, admin: true }
    })
    .when('/accounts/view/:accountID', {
      templateUrl: '../partials/accounts.view.html',
      access: { restricted: true, admin: true }
    })
    .when('/analytics', {
      templateUrl: '../partials/analytics.html',
      access: { restricted: true, admin: true }
    })
    .when('/todos', {
      templateUrl: '../partials/todos.html',
      access: { restricted: true, admin: false }
    })
    .when('/todos/edit/:todo_id', {
      templateUrl: '../partials/todos.html',
      access: { restricted: true, admin: false }
    })
    .when('/login', {
      templateUrl: '../partials/login.html',
      access: { restricted: false, admin: false }
    })
    .when('/signup', {
      templateUrl: '../partials/signup.html',
      access: { restricted: false, admin: false }
    })
    .when('/profile', {
      templateUrl: '../partials/profile.html',
      access: { restricted: true, admin: false }
    })
    // .when('/blog', {
    //   templateUrl: '../partials/blog.html',
    //   access: { restricted: false, admin: false }
    // })
    // .when('/experiences/edit/:experience_id', {
    //   access: { restricted: true, admin: false }
    // })
    .when('/profile/edit/:profileID', {
      templateUrl: '../partials/profile.edit.html',
      access: { restricted: true, admin: false }
    })
    .when('/logout', {
      controller: 'logoutController',
      access: { restricted: false, admin: false }
    })
    .otherwise({
      redirectTo: '/',
      access: { restricted: false, admin: false }
    });
});

myApp.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function(event, next, current) {
      try {
        // restricted:true forces login in order to access route
        if (next && next.$$route && next.$$route.access.restricted) {
          if (!AuthService.isLoggedIn()) {
            $rootScope.$evalAsync(function() {
              $location.path('/login');
            });
          }
        }
        if (next && next.$$route && next.$$route.access.admin) {
          if (!AuthService.isAdmin()) {
            $rootScope.$evalAsync(function() {
              $location.path('/admin');
            });
          }
        }
      }
      catch (e) {
        // if access access.restricted is undefined
      }
    }); 
});
