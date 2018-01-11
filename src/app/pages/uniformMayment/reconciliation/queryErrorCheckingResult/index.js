'use strict';

var queryErrorCheckingResultController = require('./queryErrorCheckingResult.controller');
var queryErrorCheckingResultHtml = require('./queryErrorCheckingResult.html');

require('./queryErrorCheckingResult.skin.styl');
require('./queryErrorCheckingResult.layout.styl');

var mod = angular.module('queryErrorCheckingResult', [])
    .controller('QueryErrorCheckingResultController', [
    	'$rootScope',
        '$scope',
    	'UniformMaymentService',
    	'QueryErrorCheckingResultConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'ValidationService',
        'CommonService',
    	 queryErrorCheckingResultController
    	]);

module.exports = {
    module: mod,
    html: queryErrorCheckingResultHtml,
    controller: queryErrorCheckingResultController
};
