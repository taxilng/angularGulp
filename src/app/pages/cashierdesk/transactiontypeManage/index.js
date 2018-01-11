'use strict';

var transactiontypeManageController = require('./transactiontypeManage.controller');
var transactiontypeManageHtml = require('./transactiontypeManage.html');

require('./transactiontypeManage.skin.styl');
require('./transactiontypeManage.layout.styl');

var mod = angular.module('transactiontypeManage', [])
    .controller('TransactiontypeManageController', [
    	'transactiontypeService',
    	'toastr',
    	'ModalService',
    	'TransactionTypeManageConstant',
            '$ngBootbox',
            'ValidationService',
    	transactiontypeManageController]);

module.exports = {
    module: mod,
    html: transactiontypeManageHtml,
    controller: transactiontypeManageController
};
