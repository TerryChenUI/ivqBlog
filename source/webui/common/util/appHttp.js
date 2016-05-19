'use strict';
angular.module('common.util')
    .factory('appHttp', ['$http', '$q', ($http, $q) => {
        return {
            request: (config) => {
                let deferred = $q.defer();
                $http(config).success((response, status) => {
                    if (response.errors != null) {
                        deferred.reject(response);
                    } else {
                        deferred.resolve(response);
                    }
                }).error((response, status) => {
                    deferred.reject(response.errors);
                });
                return deferred.promise;
            }
        };
    }
    ]);