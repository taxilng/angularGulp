'use strict';

var systemCutDayController = require('./systemCutDay.controller');
var systemCutDayHtml = require('./systemCutDay.html');

require('./systemCutDay.skin.styl');
require('./systemCutDay.layout.styl');

var mod = angular.module('systemCutDay', [])
    .controller('SystemCutDayController', [
    	'$rootScope',
        '$scope',
    	'toastr',
    	'$ngBootbox',
    	'timeFormatFilterFilter',
    	'ModalService',
        'EventBusService',
    	'SystemCutDayConstant',
        'BatchManagementService',
        'ValidationService',
    	systemCutDayController
    	]);

module.exports = {
    module: mod,
    html: systemCutDayHtml,
    controller: systemCutDayController
};
