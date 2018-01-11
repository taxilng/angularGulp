'use strict';

var menuTreeDirective = require('./menuTree.directive');

var bizUI = angular.module('menuTree', [])
    .directive('menuTree', [
    	'$rootScope', 
    	'$ngBootbox', 
    	'$q',
    	'MenuTreeService',
        'TreeService', 
        'EventBusService', 
        'ModalService',
        'toastr',
        'AddTreeNodeConstant',
        'AuthorityManagementService',
        menuTreeDirective
    ]);

module.exports = bizUI;
