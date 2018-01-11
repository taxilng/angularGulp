'use strict';

var financingProductModalController = require('./financingProductModal.controller');
var financingProductModalHtml = require('./financingProductModal.html');

require('./financingProductModal.skin.styl');
require('./financingProductModal.layout.styl');

var mod = angular.module('financingProductModal', [])
    .controller('FinancingProductModalController', [
    	'params',
    	'toastr',
    	'ModalService',
    	'FinancingProductService',
        'titleMapFilterFilter',
        'SupplierService',
        'ValidationService',
        '$scope',
    	financingProductModalController]);

module.exports = {
    module: mod,
    html: financingProductModalHtml,
    controller: financingProductModalController
};
