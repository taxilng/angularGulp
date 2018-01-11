'use strict';

var createJobController = require('./createJob.controller');
var createJobHtml = require('./createJob.html');

require('./createJob.skin.styl');
require('./createJob.layout.styl');

var mod = angular.module('createJob', [])
    .controller('CreateJobController', [
    	'$rootScope',
        '$scope',
    	'toastr',
    	'$ngBootbox',
    	'timeFormatFilterFilter',
    	'ModalService',
        'EventBusService',
    	'CreateJobConstant',
        'BatchManagementService',
        'ValidationService',
        'CommonService',
    	createJobController
    	]);

module.exports = {
    module: mod,
    html: createJobHtml,
    controller: createJobController
};
