'use strict';

var userAllocationRoleController = require('./userAllocationRole.controller');
var userAllocationRoleHtml = require('./userAllocationRole.html');

require('./userAllocationRole.skin.styl');
require('./userAllocationRole.layout.styl');

var mod = angular.module('userAllocationRole', [])
    .controller('UserAllocationRoleController', userAllocationRoleController);

module.exports = {
    module: mod,
    html: userAllocationRoleHtml,
    controller: userAllocationRoleController
};
