'use strict';

var modalDirective = require('./modal.directive');

require('./modal.layout.styl');

var modal = angular.module('modal', [])
    .directive('cfoModal', ['ModalService', modalDirective]);

module.exports = modal;
