'use strict';

var roleUpdateController = require('./roleUpdate.controller');
var roleUpdateHtml = require('./roleUpdate.html');

require('./roleUpdate.skin.styl');
require('./roleUpdate.layout.styl');

var mod = angular.module('roleUpdate', [])
    .controller('RoleUpdateController', roleUpdateController);

module.exports = {
    module: mod,
    html: roleUpdateHtml,
    controller: roleUpdateController
};
