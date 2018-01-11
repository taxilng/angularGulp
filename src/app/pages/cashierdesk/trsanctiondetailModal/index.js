'use strict';

var trsanctiondetailModalController = require('./trsanctiondetailModal.controller');
var trsanctiondetailModalHtml = require('./trsanctiondetailModal.html');

require('./trsanctiondetailModal.skin.styl');
require('./trsanctiondetailModal.layout.styl');

var mod = angular.module('trsanctiondetailModal', [])
    .controller('TrsanctiondetailModalController', ['params','toastr', 'ModalService','TransactionTypeModalConstant','BankinfoService','titleMapFilterFilter','CashierdeskService',trsanctiondetailModalController]);

module.exports = {
    module: mod,
    html: trsanctiondetailModalHtml,
    controller: trsanctiondetailModalController
};
