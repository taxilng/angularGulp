'use strict';
'use strict';

var cashierdeskModalController = require('./cashierdeskModal.controller');
var cashierdeskModalHtml = require('./cashierdeskModal.html');

require('./cashierdeskModal.skin.styl');
require('./cashierdeskModal.layout.styl');

var mod = angular.module('cashierdeskModal', [])
    .controller('CashierdeskModalController',
        '$rootScope','toastr','ModalService','CashierdeskService','$timeout','ValidationService','$q'
        ,cashierdeskModalController);

module.exports = {
    module: mod,
    html: cashierdeskModalHtml,
    controller: cashierdeskModalController
};
