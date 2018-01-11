'use strict';

var headerDirective = require('./header.directive');

var logo = require('logo');
var avatar = require('avatar');
require('./header.skin.styl');
require('./header.layout.styl');

var header = angular.module('header', [logo.name,avatar.name])
    .directive('cfoHeader', ['$state','$rootScope','$ngBootbox','toastr','UserService','CONFIG',headerDirective]);

module.exports = header;
