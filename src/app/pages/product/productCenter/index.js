'use strict';

var productCenterController = require('./productCenter.controller');
var productCenterHtml = require('./productCenter.html');

require('./productCenter.skin.styl');
require('./productCenter.layout.styl');

var mod = angular.module('productCenter', [])
    .controller('ProductCenterController', [
    	'toastr',
        'MenuTreeService',
        'EventBusService',
        '$state',
    	productCenterController]);

module.exports = {
    module: mod,
    html: productCenterHtml,
    controller: productCenterController
};
