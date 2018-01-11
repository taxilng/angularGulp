'use strict';

var queryCheckingGroupViewDetailController = require('./queryCheckingGroupViewDetail.controller');
var queryCheckingGroupViewDetailHtml = require('./queryCheckingGroupViewDetail.html');

require('./queryCheckingGroupViewDetail.skin.styl');
require('./queryCheckingGroupViewDetail.layout.styl');

var mod = angular.module('queryCheckingGroupViewDetail', [])
    .controller('QueryCheckingGroupViewDetailController', queryCheckingGroupViewDetailController);

module.exports = {
    module: mod,
    html: queryCheckingGroupViewDetailHtml,
    controller: queryCheckingGroupViewDetailController
};
