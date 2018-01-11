'use strict';

var fundProductModalController = require('./fundProductModal.controller');
var fundProductModalHtml = require('./fundProductModal.html');

require('./fundProductModal.skin.styl');
require('./fundProductModal.layout.styl');

var mod = angular.module('fundProductModal', [])
    .controller('FundProductModalController', [
        'params',
        'toastr',
        'ModalService',
        'FundProductService',
        'ValidationService',
        'FundProductModalConstant',
        '$timeout',
        '$scope',
        'titleMapFilterFilter',
        'FundManagerService',
        '$timeout',
        '$scope',
        'SupplierService',
        'CommonService',
        'FundConstant',
        fundProductModalController
    ]);

module.exports = {
    module: mod,
    html: fundProductModalHtml,
    controller: fundProductModalController
};
