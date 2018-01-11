'use strict';

var customerCenterController = require('./customerCenter.controller');
var customerCenterHtml = require('./customerCenter.html');

require('./customerCenter.skin.styl');
require('./customerCenter.layout.styl');

var mod = angular.module('customerCenter', [])
    .controller('CustomerCenterController', customerCenterController);

module.exports = {
    module: mod,
    html: customerCenterHtml,
    controller: customerCenterController
};
