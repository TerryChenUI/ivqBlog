## ivqBlog
转向做全职前端差不多一年的时间了，其中学习了构建工具grunt，gulp，angularjs，coffeescript，less，sass，自己想要做全栈开发，所以自学了mongodb，nodejs，express后端开发。
这个博客是对前段时间的学习做一个总结，整理需求，架构，开发，测试，部署大概花了一个半月的时间，代码水平是入门级别。

线上地址：~~http://www.ivqblog.com/~~ (已和谐)

项目源码：https://github.com/TerryChenUI/ivqBlog
 
### 系统环境和部署
 
* 环境版本：
* NodeJS：v0.12.2
* Express：4.0
* MongoDB：3.04
* bower：1.72
* gulp：3.9
 
#### 安装
MongoDB官网下载后，修改ivqBlog\scripts\mongodb目录下的配置项，安装MongoDB服务并启动。
创建ivqBlog数据库，创建users数据表，并且导入ivqBlog\db\users.json数据，账号和密码都为admin。
webui和www目录下执行npm run prebuild安装相关包。
 
#### 启动
在webui目录下执行gulp命令即可启动项目。
 
### 项目架构
本项目采用前后端开发分离的方式。根据gulp任务配置，会将webui编译到www目录下，分为开发版本和产品版本。
组件开发，模块包含模板html，sass样式，js脚本，单元测试spec，自动化测试等。
 
### 任务配置
具体可查看build相关配置。
#### dev
* copy
* 编译sass文件为css
* 编译模板文件html为angularjs模块
* 动态为index.html，admin/index.html，admin/login.html 注入css文件，js文件
 
#### prod
* copy
* 编译sass文件为css
* 合并并压缩css和js
* 编译模板文件html为angularjs模块
* 动态为index.html，admin/index.html，admin/login.html 注入css文件，js文件
 
#### default
* dev
* nodemon启动express
* watch sass，html，js文件
* browser-sync，设置proxy端口与express的保持一致，自动打开浏览器
 
#### debug
* dev
* watch sass，html，js文件
* browser-sync，设置proxy端口与express的保持一致，自动打开浏览器
 
### 身份验证
nodejs使用jwt-simple生成token输出到客户端，根据这个token作身份验证，相关使用请查看以下链接。
* http://www.sitepoint.com/using-json-web-tokens-node-js/
* https://www.npmjs.com/package/jwt-simple
* https://cnodejs.org/topic/53c652bfc9507b404446ee40
 
### 调试
使用webstrom调试nodejs，如下图配置，执行gulp debug即可调试。

