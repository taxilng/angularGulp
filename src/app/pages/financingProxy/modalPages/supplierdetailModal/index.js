'use strict';

var supplierdetailModalController = require('./supplierdetailModal.controller');
var supplierdetailModalHtml = require('./supplierdetailModal.html');

require('./supplierdetailModal.skin.styl');
require('./supplierdetailModal.layout.styl');

var mod = angular.module('supplierdetailModal', [])
    .controller('SupplierdetailModalController', ['$scope','params','toastr','ModalService','SupplierService','SupplierModalConstant','timeFormatFilterFilter','CONFIG','SupplyTypeMapConstant','titleMapFilterFilter','CooperationStatusConstant',supplierdetailModalController]);

module.exports = {
    module: mod,
    html: supplierdetailModalHtml,
    controller: supplierdetailModalController
};
