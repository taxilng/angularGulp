'use strict';

var dataTableDirective = require('./dataTable.directive');

var dataTable = angular.module('dataTable',[])
    .directive('cfoDataTable', ['$filter', dataTableDirective]);

module.exports = dataTable;
