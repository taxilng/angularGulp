'use strict';

var financingProductManageController = require('./financingProductManage.controller');
var financingProductManageHtml = require('./financingProductManage.html');

require('./financingProductManage.skin.styl');
require('./financingProductManage.layout.styl');

var mod = angular.module('financingProductManage', [])
    .controller('FinancingProductManageController', [
    	'FinancingProductService',
    	'ModalService',
    	'toastr',
    	'FinanacingProductManageConstant',
    	'ValidationService',
        '$ngBootbox',
        'CommonService',
    	financingProductManageController]);

module.exports = {
    module: mod,
    html: financingProductManageHtml,
    controller: financingProductManageController
};
