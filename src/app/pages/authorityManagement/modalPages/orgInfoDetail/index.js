'use strict';

var orgInfoDetailController = require('./orgInfoDetail.controller');
var orgInfoDetailHtml = require('./orgInfoDetail.html');

require('./orgInfoDetail.skin.styl');
require('./orgInfoDetail.layout.styl');

var mod = angular.module('orgInfoDetail', [])
    .controller('OrgInfoDetailController', orgInfoDetailController);

module.exports = {
    module: mod,
    html: orgInfoDetailHtml,
    controller: orgInfoDetailController
};
