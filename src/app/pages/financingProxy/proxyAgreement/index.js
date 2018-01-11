'use strict';

var proxyAgreementController = require('./proxyAgreement.controller');
var proxyAgreementHtml = require('./proxyAgreement.html');

require('./proxyAgreement.skin.styl');
require('./proxyAgreement.layout.styl');

var mod = angular.module('proxyAgreement', [])
    .controller('ProxyAgreementController', [
        '$scope',
        'ProxyAgreementService',
        'ModalService',
    	'ProxyAgreementConstant',
    	'timeFormatFilterFilter',
    	'toastr',
        '$ngBootbox',
    	'CommonService',
    	proxyAgreementController
    ]);

module.exports = {
    module: mod,
    html: proxyAgreementHtml,
    controller: proxyAgreementController
};
