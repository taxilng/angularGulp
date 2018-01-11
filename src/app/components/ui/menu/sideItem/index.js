'use strict';

var sideItemDirective = require('./sideItem.directive');

require('./sideItem.skin.styl');
require('./sideItem.layout.styl');

var sideItem = angular.module('side.item', [])
    .directive('cfoSideItem', sideItemDirective);

module.exports = sideItem;
