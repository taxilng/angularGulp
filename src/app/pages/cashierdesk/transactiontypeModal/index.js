'use strict';

var transactiontypeModalController = require('./transactiontypeModal.controller');
var transactiontypeModalHtml = require('./transactiontypeModal.html');

require('./transactiontypeModal.skin.styl');
require('./transactiontypeModal.layout.styl');

var mod = angular.module('transactiontypeModal', [])
    .controller('TransactiontypeModalController', [
    	'$scope', 
    	'params', 
    	'toastr', 
    	'ModalService',
    	'transactiontypeService',
    	'CashierdeskService',
        'BankinfoService',
        'TransactionTypeModalConstant',
        'ValidationService',
    	transactiontypeModalController]);

module.exports = {
    module: mod,
    html: transactiontypeModalHtml,
    controller: transactiontypeModalController
};
