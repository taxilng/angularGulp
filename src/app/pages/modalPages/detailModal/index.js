'use strict';

var detailModalController = require('./detailModal.controller');
var detailModalHtml = require('./detailModal.html');

require('./detailModal.skin.styl');
require('./detailModal.layout.styl');

var mod = angular.module('detailModal', [])
    .controller('DetailModalController','$rootScope','toastr','ModalService','CashierdeskService','$timeout', detailModalController);

module.exports = {
    module: mod,
    html: detailModalHtml,
    controller: detailModalController
};
