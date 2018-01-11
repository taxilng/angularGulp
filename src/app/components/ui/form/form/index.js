'use strict';

var formDirective = require('./form.directive');

var form = angular.module('form', [])
    .directive('cfoForm', formDirective);

module.exports = form;
