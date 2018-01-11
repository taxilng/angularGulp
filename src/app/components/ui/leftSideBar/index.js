'use strict';

var leftSideBarDirective = require('./leftSideBar.directive');
require('./leftSideBar.layout.styl');
require('./leftSideBar.skin.styl');

var leftSideBar = angular.module('leftSideBar', [])
    .directive('cfoLeftSideBar', leftSideBarDirective);

module.exports = leftSideBar;
