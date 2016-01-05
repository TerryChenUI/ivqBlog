'use strict';
angular.module('common.config', []);
angular.module('common.directives', []);
angular.module('common.services', ['common.config', 'common.util']);
angular.module('common.util', []);
angular.module('app.templates', []);
angular.module('app.home', []);
angular.module('app.nav', []);
angular.module('app.article', ['ui.bootstrap', 'common.services']);

var app = angular.module('app', [
    'ui.router',
    'ui.router.metatags',
    'ui.bootstrap',
    'common.config',
    'common.directives',
    'common.services',
    'common.util',
    'app.templates',
    'app.home',
    'app.nav',
    'app.article'
]);

app.controller('AppCtrl', ['$rootScope', 'PackageInfo', function ($rootScope, PackageInfo) {
    $rootScope.packageInfo = PackageInfo;
}]);

function runBlock($rootScope, MetaTags) {
    $rootScope.MetaTags = MetaTags;
}

app.run(['$rootScope', 'MetaTags', runBlock]);