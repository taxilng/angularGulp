'use strict';


var tabDirective = require('./tab.directive');
var tabItemDirective = require('./tabItem.directive');

require('./tab.skin.styl');
require('./tab.layout.styl');

var tab = angular.module('tab', [])
    .directive('cfoTab', tabDirective)
    .directive('cfoTabItem',tabItemDirective);

module.exports = tab;
