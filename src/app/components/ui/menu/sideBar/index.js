'use strict';

var sideBarDirective = require('./sidebar.directive');

require('./sideBar.skin.styl');
require('./sideBar.layout.styl');

var sideBar = angular.module('side.bar', [])
    .directive('cfoSideBar', sideBarDirective);

module.exports = sideBar;
