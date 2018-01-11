'use strict';

var paymentchanneldetailModalController = require('./paymentchanneldetailModal.controller');
var paymentchanneldetailModalHtml = require('./paymentchanneldetailModal.html');

require('./paymentchanneldetailModal.skin.styl');
require('./paymentchanneldetailModal.layout.styl');

var mod = angular.module('paymentchanneldetailModal', [])
    .controller('PaymentchanneldetailModalController', ['params', 'toastr', 'ModalService', 'PaymentChannelService', 'BankinfoService', 'PaymentChannelModalConstant', 'ValidationService','titleMapFilterFilter',paymentchanneldetailModalController]);

module.exports = {
    module: mod,
    html: paymentchanneldetailModalHtml,
    controller: paymentchanneldetailModalController
};
