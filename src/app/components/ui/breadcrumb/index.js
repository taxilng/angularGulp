'use strict';

var breadcrumbDirective = require('./breadcrumb.directive');

require('./breadcrumb.layout.styl');
var breadcrumb = angular.module('breadcrumb',[])
    .directive('cfoBreadcrumb', ['$rootScope',breadcrumbDirective]);

module.exports = breadcrumb;
