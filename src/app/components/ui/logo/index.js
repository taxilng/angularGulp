'use strict';

var logoDirective = require('./logo.directive');

require('./logo.layout.styl');

var logo = angular.module('logo', [])
    .directive('cfoLogo', logoDirective);

module.exports = logo;
