'use strict';

var tableDirective = require('./table.directive');
// 
// require('./table.layout.styl');
// require('./table.skin.styl');
var table = angular.module('cfoTable', [])
    .directive('cfoTable', tableDirective);

module.exports = table;
