'use strict';

var bankinfoModalController = require('./bankinfoModal.controller');
var bankinfoModalHtml = require('./bankinfoModal.html');

require('./bankinfoModal.skin.styl');
require('./bankinfoModal.layout.styl');

var mod = angular.module('bankinfoModal', [])
    .controller('BankinfoManageController', ['$scope', 'params', 'toastr', 'ModalService','BankinfoService','BankInfoModalConstant','ValidationService', 'Upload','fileReader','CardtypeConstant','SupplierService','$q',bankinfoModalController]);

module.exports = {
    module: mod,
    html: bankinfoModalHtml,
    controller: bankinfoModalController
};
