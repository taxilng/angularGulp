'use strict';

var tapBarDirective = require('./tapBar.directive');
var button=require('button');
require('./tapBar.skin.styl');
require('./tapBar.layout.styl');

var tapBar = angular.module('tap.bar', [button.name])
    .directive('cfoBar', tapBarDirective);

module.exports = tapBar;
