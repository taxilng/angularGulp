'use strict';

var timingConfigurationController = require('./timingConfiguration.controller');
var timingConfigurationHtml = require('./timingConfiguration.html');

require('./timingConfiguration.skin.styl');
require('./timingConfiguration.layout.styl');

var mod = angular.module('timingConfiguration', [])
    .controller('TimingConfigurationController', [
        '$rootScope',
        '$scope',
        'toastr',
        '$ngBootbox',
        'timeFormatFilterFilter',
        'ModalService',
        'EventBusService',
        'TimingConfigurationConstant',
        'BatchManagementService',
        'ValidationService',
        'CommonService',
        timingConfigurationController
    ]);

module.exports = {
    module: mod,
    html: timingConfigurationHtml,
    controller: timingConfigurationController
};
