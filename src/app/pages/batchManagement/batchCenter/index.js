'use strict';

var batchCenterController = require('./batchCenter.controller');
var batchCenterHtml = require('./batchCenter.html');

require('./batchCenter.skin.styl');
require('./batchCenter.layout.styl');

var mod = angular.module('batchCenter', [])
    .controller('BatchCenterController', [
    	'toastr',
        'MenuTreeService',
        'EventBusService',
        '$state',
    	batchCenterController
    	]);

module.exports = {
    module: mod,
    html: batchCenterHtml,
    controller: batchCenterController
};
