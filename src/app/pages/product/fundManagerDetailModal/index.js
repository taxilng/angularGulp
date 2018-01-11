'use strict';

var fundManagerDetailModalController = require('./fundManagerDetailModal.controller');
var fundManagerDetailModalHtml = require('./fundManagerDetailModal.html');

require('./fundManagerDetailModal.skin.styl');
require('./fundManagerDetailModal.layout.styl');

var mod = angular.module('fundManagerDetailModal', [])
    .controller('FundManagerDetailModalController', [
    	'$scope',
    	'params',
    	'titleMapFilterFilter',
    	fundManagerDetailModalController]);

module.exports = {
    module: mod,
    html: fundManagerDetailModalHtml,
    controller: fundManagerDetailModalController
};
