'use strict';

var investPlanConfigDetailModalController = require('./investPlanConfigDetailModal.controller');
var investPlanConfigDetailModalHtml = require('./investPlanConfigDetailModal.html');

require('./investPlanConfigDetailModal.skin.styl');
require('./investPlanConfigDetailModal.layout.styl');

var mod = angular.module('investPlanConfigDetailModal', [])
    .controller('InvestPlanConfigDetailModalController', investPlanConfigDetailModalController);

module.exports = {
    module: mod,
    html: investPlanConfigDetailModalHtml,
    controller: investPlanConfigDetailModalController
};
