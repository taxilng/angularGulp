'use strict';

var productinfoManageController = require('./productinfoManage.controller');
var productinfoManageHtml = require('./productinfoManage.html');

require('./productinfoManage.skin.styl');
require('./productinfoManage.layout.styl');

var mod = angular.module('productinfoManage', [])
    .controller('ProductinfoManageController', [
    	'toastr',
    	'ProductinfoService',
    	'ModalService',
    	'ValidationService',
    	productinfoManageController]);

module.exports = {
    module: mod,
    html: productinfoManageHtml,
    controller: productinfoManageController
};
