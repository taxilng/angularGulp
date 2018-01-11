'use strict';

var organizationTreeDirective = require('./organizationTree.directive');

// require('./searchCondition.layout');
var panel = require('panel');
var tree = require('tree');

require('./organizationTree.layout.styl');

var organizationMod = angular.module('organizationTree', [panel.name,tree.name])
    .directive('organizationTree', organizationTreeDirective);

module.exports = organizationMod;
