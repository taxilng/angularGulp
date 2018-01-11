'use strict';

var iconDirective = require('./icon.directive');

require('./icon.skin.styl');
require('./icon.layout.styl');

var icon = angular.module('icon', [])
    .directive('cfoIcon', iconDirective);

module.exports = icon;
