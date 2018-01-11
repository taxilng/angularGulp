'use strict';

var authorityTreeDirective = require('./authorityTree.directive');
require('./authorityTree.layout.styl');
require('./authorityTree.skin.styl');

var authorityTree = angular.module('authorityTree', [])
    .directive('authorityTree', authorityTreeDirective);

module.exports = authorityTree;
