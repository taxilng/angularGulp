'use strict';
var cfoBreadcrumbHtml = require('./breadcrumb.html');
var breadcrumbController = require('./breadcrumb.controller');
module.exports = function cfoBreadcrumb($rootScope) {
    var directive = {
        restrict: 'EA',
        template: cfoBreadcrumbHtml,
        replace: true,
        controller:['$rootScope','CONFIG',breadcrumbController],
        controllerAs:'vm'
    };
    return directive;

}
