'use strict';
angular.module('common.config', []);
angular.module('common.util', []);
angular.module('common.directives', []);
angular.module('common.services', ['common.config', 'common.util']);
angular.module('app.admin.templates', []);
angular.module('app.admin.common', ['common.services']);
angular.module('app.admin.layout', ['common.services']);
angular.module('app.admin.content', ['common.services']);

var appAdmin = angular.module('app.admin', [
    'ngCookies',
    'ngFileUpload',
    'ngTasty',
    'ngSweetAlert',
    'ncy-angular-breadcrumb',
    'ui.router',
    'common.services',
    'common.directives',
    'common.config',
    'common.util',
    'app.admin.templates',
    'app.admin.common',
    'app.admin.layout',
    'app.admin.content'
]);

appAdmin.run(['$rootScope', '$window', '$location', '$cookieStore', '$http', function($rootScope, $window, $location, $cookieStore, $http){
    //pagination setting
    $rootScope.paginationSetting = {
        'count': 15,
        'page': 1,
        'sortBy': '',
        'sortOrder': ''
    };

    //cookie
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if($window.location.href.indexOf('login') > -1){
            return;
        }
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            //$window.location.href = 'login.html'
        }
    });
}]);

appAdmin.controller("AppAdminCtrl", ["$scope", "$window", "AuthenService", function ($scope, $window, AuthenService) {
    //$scope.logout = function(){
    //    AuthenService.clearCredentials();
    //    $window.location.href = "login.html";
    //}
}]);
