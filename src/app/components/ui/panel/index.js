'use strict';

var panelDirective = require('./panel.directive');

require('./panel.layout.styl');
require('./panel.skin.styl');

var panel = angular.module('panel', [])
    .directive('cfoPanel', panelDirective);

module.exports = panel;
