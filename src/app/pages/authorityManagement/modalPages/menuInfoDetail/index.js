'use strict';

var menuInfoDetailController = require('./menuInfoDetail.controller');
var menuInfoDetailHtml = require('./menuInfoDetail.html');

require('./menuInfoDetail.skin.styl');
require('./menuInfoDetail.layout.styl');

var mod = angular.module('menuInfoDetail', [])
    .controller('MenuInfoDetailController', menuInfoDetailController);

module.exports = {
    module: mod,
    html: menuInfoDetailHtml,
    controller: menuInfoDetailController
};
