'use strict';

var comboAddModalController = require('./comboAddModal.controller');
var comboAddModalHtml = require('./comboAddModal.html');

require('./comboAddModal.skin.styl');
require('./comboAddModal.layout.styl');

var mod = angular.module('comboAddModal', [])
    .controller('ComboAddModalController',
   '$rootScope','toastr','ModalService','CashierdeskService','$timeout', comboAddModalController);

module.exports = {
    module: mod,
    html: comboAddModalHtml,
    controller: comboAddModalController
};
