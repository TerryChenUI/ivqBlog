/**
 * Created by tchen on 7/9/2015.
 */
'use strict';
angular.module('common.util')
    .factory('appHttp', ['$http', '$q', function($http, $q) {
        return {
            request: function(config) {
                var deferred = $q.defer();
                $http(config).success(function(response, status) {
                    if (response.error.length > 0) {
                        return deferred.reject(response.error);
                    } else {
                        return deferred.resolve(response.data);
                    }
                }).error(function(response, status) {
                    return deferred.reject(response.error);
                });
                return deferred.promise;
            }
        };
    }
]);