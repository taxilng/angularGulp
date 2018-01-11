'use strict';

var cashierdeskCenterController = require('./cashierdeskCenter.controller');
var cashierdeskCenterHtml = require('./cashierdeskCenter.html');

require('./cashierdeskCenter.skin.styl');
require('./cashierdeskCenter.layout.styl');

var mod = angular.module('cashierdeskCenter', [])
    .controller('CashierdeskCenterController', [
        'toastr',
        'MenuTreeService',
        'EventBusService',
        '$state',
        cashierdeskCenterController
    ]);

module.exports = {
    module: mod,
    html: cashierdeskCenterHtml,
    controller: cashierdeskCenterController
};
