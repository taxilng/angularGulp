'use strict';

var investPlanConfigModalController = require('./investPlanConfigModal.controller');
var investPlanConfigModalHtml = require('./investPlanConfigModal.html');

require('./investPlanConfigModal.skin.styl');
require('./investPlanConfigModal.layout.styl');

var mod = angular.module('investPlanConfigModal', [])
    .controller('InvestPlanConfigModalController', investPlanConfigModalController);

module.exports = {
    module: mod,
    html: investPlanConfigModalHtml,
    controller: investPlanConfigModalController
};
