'use strict';

var queryUnknownPaymentController = require('./queryUnknownPayment.controller');
var queryUnknownPaymentHtml = require('./queryUnknownPayment.html');

require('./queryUnknownPayment.skin.styl');
require('./queryUnknownPayment.layout.styl');

var mod = angular.module('queryUnknownPayment', [])
    .controller('QueryUnknownPaymentController', [
    	'$rootScope',
        '$scope',
    	'UniformMaymentService',
    	'QueryUnknownPaymentConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'ValidationService',
    	queryUnknownPaymentController
    	]);

module.exports = {
    module: mod,
    html: queryUnknownPaymentHtml,
    controller: queryUnknownPaymentController
};
