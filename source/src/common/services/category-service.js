(function () {
    var CategoryService = (function () {
        function CategoryService($log, $http, ServerConfig, appHttp) {
            this.$log = $log;
            this.$http = $http;
            this.appHttp = appHttp;
            this.serviceEndpoint = ServerConfig.apiUrl;
        }

        CategoryService.prototype.getCategories = function (params) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "categories",
                params: params
            };
            return this.$http(config);
        };

        CategoryService.prototype.getAllCategories = function () {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "categories/all"
            };
            return this.appHttp.request(config);
        };

        CategoryService.prototype.getCategoryById = function (id) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "categories/" + id
            };
            return this.appHttp.request(config);
        };

        CategoryService.prototype.insertCategory = function (category, successCB, errorCB) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "categories",
                data: category
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            });
        };

        CategoryService.prototype.updateCategory = function (id, category, successCB, errorCB) {
            var config = {
                method: 'PUT',
                url: this.serviceEndpoint + "categories/" + id,
                data: category
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            });
        };

        CategoryService.prototype.deleteCategory = function (id, successCB, errorCB) {
            var config = {
                method: 'DELETE',
                url: this.serviceEndpoint + "categories/" + id
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            });
        };

        return CategoryService;
    })();


    angular.module('common.services')
        .factory('CategoryService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
            return new CategoryService($log, $http, ServerConfig, appHttp);
        }]);

})();