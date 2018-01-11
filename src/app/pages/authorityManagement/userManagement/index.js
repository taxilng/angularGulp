'use strict';

var userManagementController = require('./userManagement.controller');
var userManagementHtml = require('./userManagement.html');

require('./userManagement.skin.styl');
require('./userManagement.layout.styl');

var mod = angular.module('userManagement', [])
    .controller('UserManagementController', [
    	'TreeService',
    	'$rootScope',
        '$scope',
    	'AuthorityManagementService',
    	'UserManagementConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'EventBusService',
        'UserUpdateConstant',
        'UserAllocationRoleConstant',
        'CommonService',
        'titleMapFilterFilter',
    	userManagementController
    	]);

module.exports = {
    module: mod,
    html: userManagementHtml,
    controller: userManagementController
};
