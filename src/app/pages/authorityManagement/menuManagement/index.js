'use strict';

var menuManagementController = require('./menuManagement.controller');
var menuManagementHtml = require('./menuManagement.html');

require('./menuManagement.skin.styl');
require('./menuManagement.layout.styl');

var mod = angular.module('menuManagement', [])
    .controller('MenuManagementController', [
    	'MenuTreeService',
    	'$rootScope',
        '$scope',
    	'AuthorityManagementService',
    	'MenuManagementConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'EventBusService',
        'CommonService',
    	menuManagementController
    	]);

module.exports = {
    module: mod,
    html: menuManagementHtml,
    controller: menuManagementController
};
