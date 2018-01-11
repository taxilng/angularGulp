'use strict';

var supplierModalController = require('./supplierModal.controller');
var supplierModalHtml = require('./supplierModal.html');

require('./supplierModal.skin.styl');
require('./supplierModal.layout.styl');

var mod = angular.module('supplierModal', [])

    .controller('SupplierModalController', ['$scope','params','toastr','ModalService','SupplierService','SupplierModalConstant','timeFormatFilterFilter','CONFIG','ValidationService','SupplyTypeMapConstant','CooperationStatusConstant','Upload','fileReader','RegularExpressionConstant',supplierModalController]);

module.exports = {
    module: mod,
    html: supplierModalHtml,
    controller: supplierModalController
};
