'use strict';

var productinfoModalController = require('./productinfoModal.controller');
var productinfoModalHtml = require('./productinfoModal.html');

require('./productinfoModal.skin.styl');
require('./productinfoModal.layout.styl');

var mod = angular.module('productinfoModal', [])
    .controller('ProductinfoModalController', [
    	'$scope', 'params', 'toastr', 'ModalService','ProductinfoService'
    	,productinfoModalController]);

module.exports = {
    module: mod,
    html: productinfoModalHtml,
    controller: productinfoModalController
};
