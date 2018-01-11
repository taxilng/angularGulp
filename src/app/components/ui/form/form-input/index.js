'use strict';

var inputDirective = require('./form-input.directive');

require('./form-input.skin.styl');
require('./form-input.layout.styl');

var input = angular.module('form.input', [])
    .directive('formInput', inputDirective);

module.exports = input;
