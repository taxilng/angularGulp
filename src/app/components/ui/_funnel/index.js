'use strict';

var funnelDirective = require('./funnel.directive');

require('./funnel.skin.styl');
require('./funnel.layout.styl');

var funnel = angular.module('funnelChart', [])
    .directive('cfoFunnel', funnelDirective);

module.exports = funnel;
