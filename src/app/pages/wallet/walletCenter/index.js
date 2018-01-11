'use strict';

var walletCenterController = require('./walletCenter.controller');
var walletCenterHtml = require('./walletCenter.html');

require('./walletCenter.skin.styl');
require('./walletCenter.layout.styl');

var mod = angular.module('walletCenter', [])
    .controller('WalletCenterController', walletCenterController);

module.exports = {
    module: mod,
    html: walletCenterHtml,
    controller: walletCenterController
};
