'use strict';

var productCheckingController = require('./productChecking.controller');
var productCheckingHtml = require('./productChecking.html');

require('./productChecking.skin.styl');
require('./productChecking.layout.styl');

var mod = angular.module('productChecking', [])
    .controller('ProductCheckingController', ['$rootScope', '$scope','toastr','$ngBootbox','timeFormatFilterFilter','ModalService','EventBusService','ProductCheckingConstant','ProductCheckingService','ValidationService',productCheckingController]);

module.exports = {
    module: mod,
    html: productCheckingHtml,
    controller: productCheckingController
};
