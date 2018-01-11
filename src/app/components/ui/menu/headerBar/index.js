'use strict';

var headerBarDirective = require('./headerBar.directive');

require('./headerBar.skin.styl');
require('./headerBar.layout.styl');

var headerBar = angular.module('header.bar', [])
    .directive('cfoHeaderBar', headerBarDirective);

module.exports = headerBar;
