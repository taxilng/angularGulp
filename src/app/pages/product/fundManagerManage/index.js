'use strict';

var fundManagerManageController = require('./fundManagerManage.controller');
var fundManagerManageHtml = require('./fundManagerManage.html');

require('./fundManagerManage.skin.styl');
require('./fundManagerManage.layout.styl');

var mod = angular.module('fundManagerManage', [])
    .controller('FundManagerManageController',[
    	'FundManagerManageConstant',
    	'ModalService',
    	'FundManagerService',
    	'toastr',
    	'ValidationService',
        '$ngBootbox',
    	fundManagerManageController]);

module.exports = {
    module: mod,
    html: fundManagerManageHtml,
    controller: fundManagerManageController
};
