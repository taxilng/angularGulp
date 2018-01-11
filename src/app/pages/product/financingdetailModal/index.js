'use strict';

var financingdetailModalController = require('./financingdetailModal.controller');
var financingdetailModalHtml = require('./financingdetailModal.html');

require('./financingdetailModal.skin.styl');
require('./financingdetailModal.layout.styl');

var mod = angular.module('financingdetailModal', [])
    .controller('FinancingdetailModalController', [
    	'params', 
    	'toastr', 
    	'ModalService', 
    	'FinancingProductService',
    	'titleMapFilterFilter',
        'SupplierService',
    	financingdetailModalController]);

module.exports = {
    module: mod,
    html: financingdetailModalHtml,
    controller: financingdetailModalController
};
