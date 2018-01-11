'use strict';

var proxyAgreementDetailModalController = require('./proxyAgreementDetailModal.controller');
var proxyAgreementDetailModalHtml = require('./proxyAgreementDetailModal.html');

require('./proxyAgreementDetailModal.skin.styl');
require('./proxyAgreementDetailModal.layout.styl');

var mod = angular.module('proxyAgreementDetailModal', [])
    .controller('ProxyAgreementDetailModalController', proxyAgreementDetailModalController);

module.exports = {
    module: mod,
    html: proxyAgreementDetailModalHtml,
    controller: proxyAgreementDetailModalController
};
