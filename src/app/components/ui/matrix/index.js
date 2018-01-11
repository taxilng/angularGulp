'use strict';

var matrixDirective = require('./matrix.directive');

var matrix = angular.module('matrix', [])
    .directive('cfoMatrix', matrixDirective);

module.exports = matrix;
