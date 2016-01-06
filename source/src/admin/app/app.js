'use strict';
angular.module('common.config', []);
angular.module('common.directives', []);
angular.module('common.interceptors', []);
angular.module('common.services', ['common.config', 'common.util']);
angular.module('common.util', []);
angular.module('app.admin.templates', []);
angular.module('app.admin.common', ['common.services']);
angular.module('app.admin.layout', ['common.services']);
angular.module('app.admin.content', ['common.services']);
angular.module('app.admin.setting', ['common.services']);

var appAdmin = angular.module('app.admin', [
    'ngCookies',
    'ngFileUpload',
    'ng.ueditor',
    'ngTasty',
    'ngSweetAlert',
    'ncy-angular-breadcrumb',
    'ui.router',
    'common.config',
    'common.directives',
    'common.interceptors',
    'common.services',
    'common.util',
    'app.admin.templates',
    'app.admin.common',
    'app.admin.layout',
    'app.admin.content',
    'app.admin.setting'
]);

appAdmin.run(['$rootScope', '$window', '$location', '$cookies', '$http', function ($rootScope, $window, $location, $cookies, $http) {
    //pagination setting
    $rootScope.paginationSetting = {
        'count': 15,
        'page': 1,
        'sortBy': '',
        'sortOrder': ''
    };

    //cookie
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.token;
    }
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if ($window.location.href.indexOf('login') > -1) {
            return;
        }
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            //$window.location.href = 'login.html';
        }
    });

}]);

appAdmin.controller('AppAdminCtrl', ['$rootScope', '$scope', '$window', 'PackageInfo', function ($rootScope, $scope, $window, PackageInfo) {
    $rootScope.packageInfo = PackageInfo;
}]);
