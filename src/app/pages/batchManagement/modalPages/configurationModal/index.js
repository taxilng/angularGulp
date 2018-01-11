'use strict';

var configurationModalController = require('./configurationModal.controller');
var configurationModalHtml = require('./configurationModal.html');

require('./configurationModal.skin.styl');
require('./configurationModal.layout.styl');

var mod = angular.module('configurationModal', [])
    .controller('ConfigurationModalController', ['ConfigurationModalConstant','BatchManagementService','timeFormatFilterFilter','ModalService','toastr','params','$scope','ValidationService',configurationModalController]);

module.exports = {
    module: mod,
    html: configurationModalHtml,
    controller: configurationModalController
};
