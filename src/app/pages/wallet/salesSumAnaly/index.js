'use strict';

var salesSumAnalyController = require('./salesSumAnaly.controller');
var salesSumAnalyHtml = require('./salesSumAnaly.html');

require('./salesSumAnaly.skin.styl');
require('./salesSumAnaly.layout.styl');

var mod = angular.module('salesSumAnaly', [])
    .controller('SalesSumAnalyController', [
        '$scope',
        'SalesSumAnalyService',
        'ValidationService',
        'SalesSumAnalyConstant',
        'timeFormatFilterFilter',
        'toastr',
        '$ngBootbox',
        'CommonService',
    	salesSumAnalyController
    ]);

module.exports = {
    module: mod,
    html: salesSumAnalyHtml,
    controller: salesSumAnalyController
};
