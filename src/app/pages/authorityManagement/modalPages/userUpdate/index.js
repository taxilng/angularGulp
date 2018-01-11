'use strict';

var userUpdateController = require('./userUpdate.controller');
var userUpdateHtml = require('./userUpdate.html');

require('./userUpdate.skin.styl');
require('./userUpdate.layout.styl');

var mod = angular.module('userUpdate', [])
    .controller('UserUpdateController', userUpdateController);

module.exports = {
    module: mod,
    html: userUpdateHtml,
    controller: userUpdateController
};
