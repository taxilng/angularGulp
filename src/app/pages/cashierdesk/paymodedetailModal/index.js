'use strict';

var paymodedetailModalController = require('./paymodedetailModal.controller');
var paymodedetailModalHtml = require('./paymodedetailModal.html');

require('./paymodedetailModal.skin.styl');
require('./paymodedetailModal.layout.styl');

var mod = angular.module('paymodedetailModal', [])
    .controller('PaymodedetailModalController', [
    	'params',
    	'toastr',
    	'ModalService',
    	'CashierdeskService',
            '$filter',
            'titleMapFilterFilter',
    	paymodedetailModalController]);

module.exports = {
    module: mod,
    html: paymodedetailModalHtml,
    controller: paymodedetailModalController
};
