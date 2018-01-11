'use strict';

var menuBarDirective = require('./menuBar.directive');

require('./menuBar.skin.styl');
require('./menuBar.layout.styl');

var menuBar = angular.module('menu.bar', [])
    .directive('cfoMenuBar', menuBarDirective);

module.exports = menuBar;
