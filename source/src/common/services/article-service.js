(function () {
    var ArticleService = (function () {
        function ArticleService($log, $http, ServerConfig, appHttp) {
            this.$log = $log;
            this.$http = $http;
            this.appHttp = appHttp;
            this.serviceEndpoint = ServerConfig.apiUrl;
        }

        //ArticleService.prototype.getArticlesByCategoryId = function (categoryId, pageIndex, pageSize, successCallback) {
        //    var config = {
        //        method: 'GET',
        //        url: this.serviceEndpoint + "articles",
        //        params: {categoryId: categoryId, pageIndex: pageIndex, pageSize: pageSize}
        //    };
        //    this.$log.debug('getArticlesByCategoryId', config);
        //    return this.$http(config).success(function (res) {
        //        return successCallback(res);
        //    });
        //};

        ArticleService.prototype.getArticles = function (params) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "articles",
                params: params
            };
            return this.$http(config);
        };

        ArticleService.prototype.getArticleById = function (id, params) {
            var config = {
                method: 'GET',
                url: this.serviceEndpoint + "articles/" + id,
                params: params
            };
            return this.appHttp.request(config);
        };

        ArticleService.prototype.insert = function (article, successCB, errorCB) {
            var config = {
                method: 'POST',
                url: this.serviceEndpoint + "articles",
                data: article
            };
            return this.$http(config).success(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        ArticleService.prototype.update = function (id, article, successCB, errorCB) {
            var config = {
                method: 'PUT',
                url: this.serviceEndpoint + "articles/" + id,
                data: article
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        ArticleService.prototype.delete = function (id, successCB, errorCB) {
            var config = {
                method: 'DELETE',
                url: this.serviceEndpoint + "articles/" + id
            };
            return this.$http(config).then(function (res) {
                return successCB(res);
            }, function (res) {
                return errorCB(res);
            });
        };

        return ArticleService;
    })();


    angular.module('common.services')
        .factory('ArticleService', ['$log', '$http', 'ServerConfig', 'appHttp', function ($log, $http, ServerConfig, appHttp) {
            return new ArticleService($log, $http, ServerConfig, appHttp);
        }]);
})();