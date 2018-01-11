'use strict';

var uniformMaymentCenterController = require('./uniformMaymentCenter.controller');
var uniformMaymentCenterHtml = require('./uniformMaymentCenter.html');

require('./uniformMaymentCenter.skin.styl');
require('./uniformMaymentCenter.layout.styl');

var mod = angular.module('uniformMaymentCenter', [])
    .controller('UniformMaymentCenterController', [
    	'toastr',
        'MenuTreeService',
        'EventBusService',
        '$state',
    	uniformMaymentCenterController]);

module.exports = {
    module: mod,
    html: uniformMaymentCenterHtml,
    controller: uniformMaymentCenterController
};
