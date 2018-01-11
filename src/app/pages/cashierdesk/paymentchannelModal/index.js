'use strict';

var paymentchannelModalController = require('./paymentchannelModal.controller');
var paymentchannelModalHtml = require('./paymentchannelModal.html');

require('./paymentchannelModal.skin.styl');
require('./paymentchannelModal.layout.styl');

var mod = angular.module('paymentchannelModal', [])
    .controller('PaymentchannelModalController', [
    	'$scope',
    	'params',
    	'toastr',
    	'ModalService',
    	'PaymentChannelService',
    	'BankinfoService',
        'PaymentChannelModalConstant',
        'ValidationService',
        '$q',
    	paymentchannelModalController]);

module.exports = {
    module: mod,
    html: paymentchannelModalHtml,
    controller: paymentchannelModalController
};
