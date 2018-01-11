'use strict';

var roleManagementController = require('./roleManagement.controller');
var roleManagementHtml = require('./roleManagement.html');

require('./roleManagement.skin.styl');
require('./roleManagement.layout.styl');

var mod = angular.module('roleManagement', [])
    .controller('RoleManagementController', [
    	'$rootScope',
        '$scope',
    	'AuthorityManagementService',
    	'RoleManagementConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'RoleUpdateConstant',
        'ValidationService',
    	roleManagementController
    	]);

module.exports = {
    module: mod,
    html: roleManagementHtml,
    controller: roleManagementController
};
