'use strict';

var supplierPaymentController = require('./supplierPayment.controller');
var supplierPaymentHtml = require('./supplierPayment.html');

require('./supplierPayment.skin.styl');
require('./supplierPayment.layout.styl');

var mod = angular.module('supplierPayment', [])
    .controller('SupplierPaymentController', [
    	'SupplierPaymentService', 
		'SupplierPaymentConstant', 
		'timeFormatFilterFilter', 
		'toastr', 
        '$ngBootbox',
		'CommonService',
    	supplierPaymentController
    ]);

module.exports = {
    module: mod,
    html: supplierPaymentHtml,
    controller: supplierPaymentController
};
