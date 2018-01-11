'use strict';

var distributionOrgTreeDirective = require('./distributionOrgTree.directive');

// require('./searchCondition.layout');
var panel = require('panel');
var tree = require('tree');

require('./distributionOrgTree.layout.styl');

var organizationMod = angular.module('distributionOrgTree', [panel.name,tree.name])
    .directive('distributionOrgTree', distributionOrgTreeDirective);

module.exports = organizationMod;
