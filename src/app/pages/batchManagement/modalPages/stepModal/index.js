'use strict';

var stepModalController = require('./stepModal.controller');
var stepModalHtml = require('./stepModal.html');

require('./stepModal.skin.styl');
require('./stepModal.layout.styl');

var mod = angular.module('stepModal', [])
    .controller('StepModalController', ['StepModalConstant','ModalService','toastr','params','BatchManagementService',stepModalController]);

module.exports = {
    module: mod,
    html: stepModalHtml,
    controller: stepModalController
};
