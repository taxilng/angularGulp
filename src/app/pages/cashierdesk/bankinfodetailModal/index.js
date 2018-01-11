'use strict';

var bankinfodetailModalController = require('./bankinfodetailModal.controller');
var bankinfodetailModalHtml = require('./bankinfodetailModal.html');

require('./bankinfodetailModal.skin.styl');
require('./bankinfodetailModal.layout.styl');

var mod = angular.module('bankinfodetailModal', [])
    .controller('BankinfodetailModalController', [
    	'$scope',
    	'params',
            'CardtypeConstant',
            'titleMapFilterFilter',
    	bankinfodetailModalController]);

module.exports = {
    module: mod,
    html: bankinfodetailModalHtml,
    controller: bankinfodetailModalController
};
