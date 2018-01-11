'use strict';

var fundProductManageController = require('./fundProductManage.controller');
var fundProductManageHtml = require('./fundProductManage.html');

require('./fundProductManage.skin.styl');
require('./fundProductManage.layout.styl');

var mod = angular.module('fundProductManage', [])
    .controller('FundProductManageController', [
    	'FundProductService',
    	'ModalService',
    	'toastr',
    	'FundProductManageConstant',
    	'ValidationService',
        '$ngBootbox',
        'CommonService',
        '$q',
    	fundProductManageController]);

module.exports = {
    module: mod,
    html: fundProductManageHtml,
    controller: fundProductManageController
};
