'use strict';

var jobOperateModalController = require('./jobOperateModal.controller');
var jobOperateModalHtml = require('./jobOperateModal.html');

require('./jobOperateModal.skin.styl');
require('./jobOperateModal.layout.styl');

var mod = angular.module('jobOperateModal', [])
    .controller('JobOperateModalController', ['ModalService','toastr','params','BatchManagementService',jobOperateModalController]);

module.exports = {
    module: mod,
    html: jobOperateModalHtml,
    controller: jobOperateModalController
};
