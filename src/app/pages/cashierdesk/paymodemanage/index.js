'use strict';

var paymodemanageController = require('./paymodemanage.controller');
var paymodemanageHtml = require('./paymodemanage.html');

require('./paymodemanage.skin.styl');
require('./paymodemanage.layout.styl');

var mod = angular.module('paymodemanage', [])
    .controller('PaymodemanageController', [
        'CashierdeskService',
        'toastr',
        'ModalService',
        'PaymodemanageConstant',
        '$scope',
        '$ngBootbox',
        'ValidationService',
        'timeFormatFilterFilter',
        'CommonService',
        paymodemanageController]);

module.exports = {
    module: mod,
    html: paymodemanageHtml,
    controller: paymodemanageController
};
