'use strict';
angular.module('common.util')
    .factory('appHttp', ['$http', '$q', function($http, $q) {
        return {
            request: function(config) {
                var deferred = $q.defer();
                $http(config).success(function(response, status) {
                    if (response.error != null) {
                        deferred.reject(response.error);
                    } else {
                        deferred.resolve(response);
                    }
                }).error(function(response, status) {
                    deferred.reject(response.error);
                });
                return deferred.promise;
            }
        };
    }
]);