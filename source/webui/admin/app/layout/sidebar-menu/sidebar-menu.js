'use strict';
angular.module('app.admin.layout')
    .directive('sidebarMenu', () => {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            templateUrl: 'app/layout/sidebar-menu/sidebar-menu.tpl.html',
            controller: ['$rootScope', '$scope', '$location', ($rootScope, $scope, $location) => {
                $scope.tabs = [
                    {
                        "title": "首页",
                        "route": "home",
                        "icon": "fa-home",
                        "active": false,
                        "expanded": false,
                        "childs": []
                    },
                    {
                        "title": "内容管理",
                        "route": "article, tag, category, comment",
                        "icon": "",
                        "active": false,
                        "expanded": false,
                        "childs": [
                            {
                                "title": "类别管理",
                                "route": "category",
                                "icon": "",
                                "active": false
                            },
                            {
                                "title": "标签管理",
                                "route": "tag",
                                "icon": "",
                                "active": false
                            },
                            {
                                "title": "文章管理",
                                "route": "article",
                                "icon": "",
                                "active": false
                            },
                            {
                                "title": "评论管理",
                                "route": "comment",
                                "icon": "",
                                "active": false
                            }
                        ]
                    },
                    {
                        "title": "设置管理",
                        "route": "account, site",
                        "icon": "",
                        "active": false,
                        "expanded": false,
                        "childs": [
                            {
                                "title": "账号设置",
                                "route": "account",
                                "icon": "",
                                "active": false
                            },
                            {
                                "title": "网站设置",
                                "route": "site",
                                "icon": "",
                                "active": false
                            }
                        ]
                    }
                ];

                $scope.initTabs = () => {
                    let path = $location.url();
                    $scope.tabs = angular.forEach($scope.tabs, (tab) => {
                        tab.active = path.indexOf(tab.route) > -1 ? true : false;
                        return angular.forEach(tab.childs, (child) => {
                            if (path.indexOf(child.route) > -1) {
                                tab.active = true;
                                child.active = true;
                            } else {
                                child.active = false;
                            }
                            return tab;
                        });
                    });
                };

                $scope.expandTab = (selectedTab) => {
                    $scope.tabs = angular.forEach($scope.tabs, (tab) => {
                        if (selectedTab == tab) {
                            tab.expanded = !tab.expanded;
                            tab.active = !tab.active;
                        } else {
                            tab.active = false;
                        }
                        return tab;
                    });
                };

                $rootScope.$on('$stateChangeSuccess', () => {
                    $scope.initTabs();
                });
            }]
        };
    });