'use strict';

var authorityCenterController = require('./authorityCenter.controller');
var authorityCenterHtml = require('./authorityCenter.html');

require('./authorityCenter.skin.styl');
require('./authorityCenter.layout.styl');

var mod = angular.module('authorityCenter', [])
    .controller('AuthorityCenterController', [
	    	'toastr',
	        'MenuTreeService',
	        'EventBusService',
	        '$state',
	    	authorityCenterController
    	]);

module.exports = {
    module: mod,
    html: authorityCenterHtml,
    controller: authorityCenterController
};
