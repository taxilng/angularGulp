'use strict';

/* styles */
require('./index.styl');
require('./services');
require('../../bower_components/angular-i18n/angular-locale_zh-cn.js');
/* components */

var common = require('./components/common');

/* configs */
var config = require('./index.config');
var routerConfig = require('./index.router');
var runBlock = require('./index.run');
var constants = require('./index.constant');
// var main = require('./pages/main');
var mainController = require('./pages/main/main.controller');
var cfoUI = require('./components/ui');
var cfoBizUI = require('./components/bizUI');
var service = require('./services');
var mainConstant = require('./constant');
var girdService = require('./components/common/services/gird.service');

var app = angular.module('FinancialManager', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'angular-flash.service',
        'angular-flash.flash-alert-directive',
        'angular-loading-bar',
        'ui.tree',
        'ui.grid',
        'ui.grid.pagination',
        'ui.grid.selection',
        'ui.grid.exporter',
        'ngMessages',
        'ajoslin.promise-tracker',
        'ngResource',
        'ngSanitize',
        'angular-svg-round-progressbar',
        'toastr',
        'ui.router',
        'ui.bootstrap',
        'oc.lazyLoad',
        'ng-context-menu',
        'ng.ueditor',
        'ngFileUpload',
        'localytics.directives',
        'ngBootbox',
        'isteven-multi-select',
        'ngLocale',
        'ui.select2',
        'textAngular',
        common.name,
        // main.module.name,
        cfoUI.name,
        cfoBizUI.name,
        service.name,
        mainConstant.name
    ])
    .config(['$logProvider', '$httpProvider', 'toastrConfig','$ngBootboxConfigProvider',config])
    .config(['$stateProvider', '$urlRouterProvider', routerConfig])
    .run(['$rootScope', 'WizardService', 'CONFIG', 'RoleConstant',
        'PermissionService', 'uiSelect2Config','$state','$timeout',runBlock
    ])
    .constant('CONFIG', constants)
    .controller('MainController', ['$rootScope', 'PermissionService',
        'RoleConstant', '$state', 'ModalService', mainController
    ])
    .factory('GirdService', girdService);

require('./extra/mock.angular.js');

window.Mock.mockjax(angular.module('FinancialManager'));
module.exports = app;
