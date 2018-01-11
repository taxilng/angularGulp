'use strict';

var userDetailController = require('./userDetail.controller');
var userDetailHtml = require('./userDetail.html');

require('./userDetail.skin.styl');
require('./userDetail.layout.styl');

var mod = angular.module('userDetail', [])
    .controller('UserDetailController', userDetailController);

module.exports = {
    module: mod,
    html: userDetailHtml,
    controller: userDetailController
};
