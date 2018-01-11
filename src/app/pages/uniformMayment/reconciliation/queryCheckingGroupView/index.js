'use strict';

var queryCheckingGroupViewController = require('./queryCheckingGroupView.controller');
var queryCheckingGroupViewHtml = require('./queryCheckingGroupView.html');

require('./queryCheckingGroupView.skin.styl');
require('./queryCheckingGroupView.layout.styl');

var mod = angular.module('queryCheckingGroupView', [])
    .controller('QueryCheckingGroupViewController', [
        '$rootScope',
        '$scope',
    	'UniformMaymentService',
    	'QueryCheckingGroupViewConstant',
    	'toastr',
    	'timeFormatFilterFilter',
    	'ModalService',
    	'$ngBootbox',
        'ValidationService',
        'CommonService',
    	 queryCheckingGroupViewController
    	]);

module.exports = {
    module: mod,
    html: queryCheckingGroupViewHtml,
    controller: queryCheckingGroupViewController
};
