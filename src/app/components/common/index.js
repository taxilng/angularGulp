'use strict';

/* services */
var CommonService = require('./services');

/* ui-directives */
var echart = require('./directives/ui-directives/echart.directive');
var compileTemplate = require('./directives/ui-directives/compileTemplate.directive');
var permission = require('./directives/ui-directives/permission.directive');
var amount = require('./directives/ui-directives/amount.directive');
/* validation-directives */

/* filters */
var currencyFormat = require('./filters/currencyFormat.filter');
var titleMapFilter = require('./filters/titleMap.filter');
var timeFormatFilter = require('./filters/timeFormat.filter');
var percentFilter = require('./filters/percentFormat.filter');

/* styles */
// require('/styles/common.styl');
// require('./styles/fonts.styl');
// require('./variable.styl');

var common = angular.module('app.common', [CommonService.name]);

common
    .directive('echart', echart)
    .directive('compileTemplate', ['$compile', '$parse', compileTemplate])
    .directive('permission',['PermissionService',permission])
    .directive('amount',['$filter', 'toastr', 'ValidationService',amount])
    .filter('titleMapFilter', titleMapFilter)
    .filter('timeFormatFilter', timeFormatFilter)
    .filter('percentFilter', ['$filter',percentFilter])
    .filter('currencyFormat', currencyFormat);

module.exports = common;
