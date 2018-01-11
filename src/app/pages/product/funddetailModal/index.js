'use strict';

var funddetailModalController = require('./funddetailModal.controller');
var funddetailModalHtml = require('./funddetailModal.html');

require('./funddetailModal.skin.styl');
require('./funddetailModal.layout.styl');

var mod = angular.module('funddetailModal', [])
    .controller('FunddetailModalController', ['params', 'toastr', 'ModalService', 'FundProductService','ValidationService','FundProductModalConstant','titleMapFilterFilter','$scope','SupplierService','FundConstant','FundManagerService',funddetailModalController]);

module.exports = {
    module: mod,
    html: funddetailModalHtml,
    controller: funddetailModalController
};
