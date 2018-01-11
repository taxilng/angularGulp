'use strict';

var paymentchannelManageController = require('./paymentchannelManage.controller');
var paymentchannelManageHtml = require('./paymentchannelManage.html');

require('./paymentchannelManage.skin.styl');
require('./paymentchannelManage.layout.styl');

var mod = angular.module('paymentchannelManage', [])
    .controller('PaymentchannelManageController', [
    	'PaymentChannelService',
    	'ModalService',
    	'toastr',
    	'PaymentChannelManageConstant',
            '$ngBootbox',
            'ValidationService',
    	paymentchannelManageController]);

module.exports = {
    module: mod,
    html: paymentchannelManageHtml,
    controller: paymentchannelManageController
};
