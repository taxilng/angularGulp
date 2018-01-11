'use strict';

var viewTaskController = require('./viewTask.controller');
var viewTaskHtml = require('./viewTask.html');

require('./viewTask.skin.styl');
require('./viewTask.layout.styl');

var mod = angular.module('viewTask', [])
    .controller('ViewTaskController', ['ViewTaskConstant', 'toastr',
        '$ngBootbox',
        'timeFormatFilterFilter',
        'ModalService',
        'EventBusService',
        'BatchManagementService',
        'ValidationService', 
        'CommonService', 
        viewTaskController
    ]);

module.exports = {
    module: mod,
    html: viewTaskHtml,
    controller: viewTaskController
};
