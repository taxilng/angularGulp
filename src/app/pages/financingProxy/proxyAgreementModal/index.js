'use strict';

var proxyAgreementModalController = require('./proxyAgreementModal.controller');
var proxyAgreementModalHtml = require('./proxyAgreementModal.html');

require('./proxyAgreementModal.skin.styl');
require('./proxyAgreementModal.layout.styl');

var mod = angular.module('proxyAgreementModal', [])
    .controller('ProxyAgreementModalController', proxyAgreementModalController);

module.exports = {
    module: mod,
    html: proxyAgreementModalHtml,
    controller: proxyAgreementModalController
};
