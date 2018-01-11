'use strict';

var salesDetailAnalyController = require('./salesDetailAnaly.controller');
var salesDetailAnalyHtml = require('./salesDetailAnaly.html');

require('./salesDetailAnaly.skin.styl');
require('./salesDetailAnaly.layout.styl');

var mod = angular.module('salesDetailAnaly', [])
    .controller('SalesDetailAnalyController', [
        '$scope',
    	'SalesDetailAnalyService',
        'ProductNameListService',
        'FundProductService',
        'ValidationService',
        'SalesDetailAnalyConstant',
        'timeFormatFilterFilter',
        'toastr',
        '$ngBootbox',
        'CommonService',
    	salesDetailAnalyController
    ]);

module.exports = {
    module: mod,
    html: salesDetailAnalyHtml,
    controller: salesDetailAnalyController
};
