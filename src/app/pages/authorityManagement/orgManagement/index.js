'use strict';

var orgManagementController = require('./orgManagement.controller');
var orgManagementHtml = require('./orgManagement.html');

require('./orgManagement.skin.styl');
require('./orgManagement.layout.styl');

var mod = angular.module('orgManagement', [])
    .controller('OrgManagementController', [
    	'TreeService',
    	'$rootScope',
        '$scope',
    	'AuthorityManagementService',
    	'OrgManagementConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'EventBusService',
    	orgManagementController
    	]);

module.exports = {
    module: mod,
    html: orgManagementHtml,
    controller: orgManagementController
};
