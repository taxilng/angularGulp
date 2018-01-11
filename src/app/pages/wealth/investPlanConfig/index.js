'use strict';

var investPlanConfigController = require('./investPlanConfig.controller');
var investPlanConfigHtml = require('./investPlanConfig.html');

require('./investPlanConfig.skin.styl');
require('./investPlanConfig.layout.styl');

var mod = angular.module('investPlanConfig', [])
    .controller('InvestPlanConfigController', [
        'InvestPlanConfigService',
        'ModalService',
        'InvestPlanConfigConstant',
        'toastr',
        '$ngBootbox',
        'CommonService',
    	investPlanConfigController
    ]);

module.exports = {
    module: mod,
    html: investPlanConfigHtml,
    controller: investPlanConfigController
};
