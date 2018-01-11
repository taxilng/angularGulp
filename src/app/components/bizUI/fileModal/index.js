'use strict';

var fileModalDirective = require('./fileModal.directive');

var fileModal = angular.module('fileModal',[])
                .directive('fileModal',['$parse',fileModalDirective])

module.exports = fileModal;
