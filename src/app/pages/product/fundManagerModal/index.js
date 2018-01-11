'use strict';

var fundManagerModalController = require('./fundManagerModal.controller');
var fundManagerModalHtml = require('./fundManagerModal.html');

require('./fundManagerModal.skin.styl');
require('./fundManagerModal.layout.styl');

var mod = angular.module('fundManagerModal', [])
    .controller('FundManagerModalController', [
    	'ModalService',
    	'FundManagerService',
    	'FundManagerModalConstant',
    	'toastr',
        'params',
        'ValidationService',
    	fundManagerModalController]);

module.exports = {
    module: mod,
    html: fundManagerModalHtml,
    controller: fundManagerModalController
};
