'use strict';

var dateRangeDirective = require('./dateRange.directive');

// require('./button.skin.styl');
require('./dateRange.layout.styl');

var dateRange = angular.module('dateRange', [])
    .directive('dateRange', dateRangeDirective);

module.exports = dateRange;
