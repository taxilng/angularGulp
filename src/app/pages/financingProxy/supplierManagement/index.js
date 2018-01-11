'use strict';

var supplierManagementController = require('./supplierManagement.controller');
var supplierManagementHtml = require('./supplierManagement.html');

require('./supplierManagement.skin.styl');
require('./supplierManagement.layout.styl');

var mod = angular.module('supplierManagement', [])
    .controller('SupplierManagementController', ['SupplierManagementConstant','SupplierService','timeFormatFilterFilter','$ngBootbox','ValidationService','toastr','ModalService','CommonService',supplierManagementController]);

module.exports = {
    module: mod,
    html: supplierManagementHtml,
    controller: supplierManagementController
};
