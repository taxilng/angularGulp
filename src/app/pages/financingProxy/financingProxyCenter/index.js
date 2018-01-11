'use strict';

var financingProxyCenterController = require('./financingProxyCenter.controller');
var financingProxyCenterHtml = require('./financingProxyCenter.html');

require('./financingProxyCenter.skin.styl');
require('./financingProxyCenter.layout.styl');

var mod = angular.module('financingProxyCenter', [])
    .controller('FinancingProxyCenterController', financingProxyCenterController);

module.exports = {
    module: mod,
    html: financingProxyCenterHtml,
    controller: financingProxyCenterController
};
