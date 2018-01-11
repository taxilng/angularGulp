'use strict';

var menuNavDirective = require('./menuNav.directive');


require('./menuNav.layout.styl');

var menuNav = angular.module('menu.nav', [])
    .directive('menuNav', ['$window','MenuConstant','$state', menuNavDirective]);

module.exports = menuNav;
