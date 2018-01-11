'use strict';

var queryPaymentOrderSummaryController = require('./queryPaymentOrderSummary.controller');
var queryPaymentOrderSummaryHtml = require('./queryPaymentOrderSummary.html');

require('./queryPaymentOrderSummary.skin.styl');
require('./queryPaymentOrderSummary.layout.styl');

var mod = angular.module('queryPaymentOrderSummary', [])
    .controller('QueryPaymentOrderSummaryController', [
    	'$rootScope',
        '$scope',
    	'UniformMaymentService',
    	'QueryPaymentOrderSummaryConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'ObjectDataConstant',
        'ValidationService',
        'CommonService',
    	queryPaymentOrderSummaryController
    	]);

module.exports = {
    module: mod,
    html: queryPaymentOrderSummaryHtml,
    controller: queryPaymentOrderSummaryController
};
