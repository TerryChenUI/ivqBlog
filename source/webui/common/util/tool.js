'use strict';
angular.module('common.util')
    .factory('Tool', ['$window', function ($window) {
        return {
            trimSameProperties: function (initial, modified) {
                var that = this;
                $.each(modified, function (name) {
                    if (initial.hasOwnProperty(name) && _.isObject(modified[name])) {
                        that.trimSameProperties(initial[name], modified[name]);
                    } else if (modified[name] == initial[name]) {
                        delete modified[name];
                    }
                    if (_.isObject(modified[name]) && _.isEmpty(modified[name])) {
                        delete modified[name];
                    }
                });
                return modified;
            },
            deepCopy: function (source) {
                return $.extend(true, {}, source);
            },
            convertTime: function (originTime, format) {
                if (_.isUndefined(format)) {
                    format = 'YYYY-MM-DD HH:mm:ss';
                }
                return moment(originTime).format(format);
            },
            relativeTime: function (originTime) {
                return moment(originTime).fromNow();
            },
            transformArticleUrl: function (data) {
                var url = "http://" + $window.location.host + "/post/" + data.category.route + "/" + data._id;
                data.content = data.content.replace('{#url#}', '<a href="' + url + '" target="_self" title="' + url + '">' + url + '</a>');
                return data;
            },
            getArticleTpl: function () {
                return '<p style="white-space: normal;"><strong>前言</strong></p><p style="white-space: normal;">    前言内容</p><p style="white-space: normal;"><br/></p><h3 style="white-space: normal;"><strong>标题1</strong></h3><p>    内容1</p><p><br/></p><h3 style="white-space: normal;"><strong>标题2</strong></h3><p style="white-space: normal;">    内容2</p><p><br/></p><h3 style="white-space: normal;"><strong>标题3</strong></h3><p style="white-space: normal;">    内容3</p><p><strong><br/></strong></p><p><strong>关于作者：</strong></p><ul class=" list-paddingleft-2" style="width: 887.301px; white-space: normal;"><li><p><span style="margin: 0pt; padding: 0pt; line-height: 19px;">TerryChen，前端开发，移动开发，Nodejs等</span></p></li><li><p><span style="margin: 0pt; padding: 0pt; line-height: 19px;">blog:&nbsp;<a href="http://www.ivqblog.com" target="_self" title="http://www.ivqblog.com">http://www.ivqblog.com</a></span></p></li><li><p><span style="margin: 0pt; padding: 0pt; line-height: 19px;">email: terrychen.ui@outlook.com</span></p></li><br/></ul><p><strong>转载请标明出处<strong style="white-space: normal;">：</strong></strong></p><p>  {#url#}<br/><br/></p>';
            }
        };
    }]
)
;