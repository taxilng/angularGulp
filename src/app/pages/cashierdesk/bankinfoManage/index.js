'use strict';

var bankinfoManageController = require('./bankinfoManage.controller');
var bankinfoManageHtml = require('./bankinfoManage.html');

require('./bankinfoManage.skin.styl');
require('./bankinfoManage.layout.styl');

var mod = angular.module('bankinfoManage', [])
    .controller('BankinfoManageController',[
    	'BankinfoService',
    	'toastr',
    	'ModalService',
    	'BankInfoManageConstant',
    	'$ngBootbox',
        'ValidationService',
        'Upload',
        'fileReader',
    	bankinfoManageController]);

module.exports = {
    module: mod,
    html: bankinfoManageHtml,
    controller: bankinfoManageController
};
