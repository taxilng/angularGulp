'use strict';

var loadingDirective = require('./loading.directive');

require('./loading.styl');

var loadingModule = angular.module('loadingModule', [])
    .directive('loading', ['$compile','$rootScope','EventBusService',loadingDirective]);

module.exports = loadingModule;
