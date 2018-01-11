'use strict';

var treeDirective = require('./tree.directive');
var treeService = require('./tree.service');

require('./tree.layout.styl');
require('./tree.skin.styl');

var tree = angular.module('tree', [])
    .service('TreeService', treeService)
    .directive('cfoTree', ['TreeService', treeDirective]);


module.exports = tree;
