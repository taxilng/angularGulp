'use strict';

var wealthCenterController = require('./wealthCenter.controller');
var wealthCenterHtml = require('./wealthCenter.html');

require('./wealthCenter.skin.styl');
require('./wealthCenter.layout.styl');

var mod = angular.module('wealthCenter', [])
    .controller('WealthCenterController', wealthCenterController);

module.exports = {
    module: mod,
    html: wealthCenterHtml,
    controller: wealthCenterController
};
