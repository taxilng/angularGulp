'use strict';

var paginationDirective = require('./pagination.directive');

require('./pagination.skin.styl');
require('./pagination.layout.styl');

var pagination = angular.module('pagination', [])
    .directive('cfoPagination', ['$timeout', paginationDirective]);

module.exports = pagination;
