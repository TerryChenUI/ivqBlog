'use strict';
angular.module('common.config', []);
angular.module('common.util', []);
angular.module('common.directives', []);
angular.module('common.services', ['common.config', 'common.util']);
angular.module('app.templates', []);
angular.module('app.home', []);
angular.module('app.nav', []);
angular.module('app.article', ['ui.bootstrap', 'common.services']);

var app = angular.module('app', [
    'ui.router',
    'ui.router.metatags',
    'ui.bootstrap',
    'common.directives',
    'common.config',
    'common.util',
    'common.services',
    'app.templates',
    'app.home',
    'app.nav',
    'app.article'
]);

app.controller('AppCtrl', ['$rootScope', function ($rootScope) {
    $rootScope.currentYear = new Date().getFullYear();
}]);

function runBlock($rootScope, MetaTags) {
    $rootScope.MetaTags = MetaTags;
}

app.run(['$rootScope', 'MetaTags', runBlock]);