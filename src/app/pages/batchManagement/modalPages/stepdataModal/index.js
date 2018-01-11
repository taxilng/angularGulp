'use strict';

var stepdataModalController = require('./stepdataModal.controller');
var stepdataModalHtml = require('./stepdataModal.html');

require('./stepdataModal.skin.styl');
require('./stepdataModal.layout.styl');

var mod = angular.module('stepdataModal', [])
    .controller('StepdataModalController', ['ModalService', 'toastr', 'params', 'BatchManagementService',stepdataModalController]);

module.exports = {
    module: mod,
    html: stepdataModalHtml,
    controller: stepdataModalController
};
