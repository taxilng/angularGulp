'use strict';

var requestCheckingViewController = require('./requestCheckingView.controller');
var requestCheckingViewHtml = require('./requestCheckingView.html');

require('./requestCheckingView.skin.styl');
require('./requestCheckingView.layout.styl');

var mod = angular.module('requestCheckingView', [])
    .controller('RequestCheckingViewController', [
    	'$rootScope',
        '$scope',
    	'UniformMaymentService',
    	'RequestCheckingViewConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'ValidationService',
        'CommonService',
    	requestCheckingViewController
    	]);

module.exports = {
    module: mod,
    html: requestCheckingViewHtml,
    controller: requestCheckingViewController
};
