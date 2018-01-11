'use strict';

var ckeditorDirective = require('./ckeditor.directive');
require('./ckeditor.layout.styl');
require('./ckeditor.skin.styl');

var ckeditor = angular.module('ckeditor', [])
    .directive('ckeditor', ckeditorDirective);

module.exports = ckeditor;
