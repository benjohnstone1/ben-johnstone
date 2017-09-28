/* global angular */
var module = angular.module('loginService',[]);
module.factory('User', ['$http', '$q', function($http, $q){
    
    var _identity = undefined;
    return{
        identity: function(setIdentity){
         // this function returns the current _identity if defined; otherwise, it retrieves it from the HTTP endpoint
            if (setIdentity){
                _identity = setIdentity;
                return;
            }
            var deferred = $q.defer();
            
            if (angular.isDefined(_identity)){
                deferred.resolve(_identity);
                return deferred.promise;
            }
            
            $http.get('/login')
                .success(function(result){
                    _identity = result;
                    deferred.resolve(_identity);
                })
                .error(function(result){
                    _identity = undefined;
                    deferred.reject();
                });
                return deferred.promise;
        }
    };

}]);