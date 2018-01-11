'use strict';

var loginController = require('./login.controller');
var loginHtml = require('./login.html');

require('./login.skin.styl');
require('./login.layout.styl');

var mod = angular.module('login', [])
    .controller('LoginController', [
        '$rootScope',
        '$scope',
        'CONFIG',
        'toastr',
        '$ngBootbox',
        '$state',
        'ModalService',
        'EventBusService',
        'UserService',
        'ValidationService',
        loginController
    ]);

module.exports = {
    module: mod,
    html: loginHtml,
    controller: loginController
};
