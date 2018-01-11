'use strict';

var inputButtonDirective = require('./inputButton.directive');

// require('./button.skin.styl');
 // require('./inputButton.layout.styl');

var inputButton = angular.module('inputButton',[])
    .directive('cfoInputButton', inputButtonDirective);

module.exports = inputButton;
