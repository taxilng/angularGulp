'use strict';

var buttonDirective = require('./button.directive');

require('./button.skin.styl');
require('./button.layout.styl');

var button = angular.module('button',[])
    .directive('cfoButton', buttonDirective);

module.exports = button;
