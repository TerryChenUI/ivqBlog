'use strict';
angular.module('common.config', []);
angular.module('common.directives', []);
angular.module('common.filters', []);
angular.module('common.services', ['common.config', 'common.util']);
angular.module('common.util', []);
angular.module('app.templates', []);
angular.module('app.home', []);
angular.module('app.nav', []);
angular.module('app.article', ['ui.bootstrap', 'common.services']);

let app = angular.module('app', [
    'angular-loading-bar',
    'ngCookies',
    'ngSweetAlert',
    'ui.router',
    'ui.router.metatags',
    'ui.bootstrap',
    'common.config',
    'common.directives',
    'common.filters',
    'common.services',
    'common.util',
    'app.templates',
    'app.home',
    'app.nav',
    'app.article'
]);

angular.module('app')
    .config(['cfpLoadingBarProvider', (cfpLoadingBarProvider) => {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 500;
    }]);

app.controller('AppCtrl', ['$rootScope', '$sce', 'PackageInfo', ($rootScope, $sce, PackageInfo) => {
    $rootScope.packageInfo = PackageInfo;
    $rootScope.copysymbol = '&copy;';
    $rootScope.copysymbol = $sce.trustAsHtml($rootScope.copysymbol);
    $rootScope.author = 'by' + $rootScope.packageInfo.author + '.';
    $rootScope.record = '粤ICP备16012938号-1'
}]);

app.run(['$rootScope', '$state', '$stateParams', '$cookies', 'MetaTags', ($rootScope, $state, $stateParams, $cookies, MetaTags) => {
    $rootScope.metaTags = MetaTags;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    let globals = $cookies.getObject('globals');
    if (globals && globals.currentUser) {
        $rootScope.currentUser = globals.currentUser.data;
    }
}]);