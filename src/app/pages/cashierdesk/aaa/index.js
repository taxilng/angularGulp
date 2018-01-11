'use strict';

var aaaController = require('./aaa.controller');
var aaaHtml = require('./aaa.html');

require('./aaa.skin.styl');
require('./aaa.layout.styl');

var mod = angular.module('aaa', [])
    .controller('AaaController', aaaController);

module.exports = {
    module: mod,
    html: aaaHtml,
    controller: aaaController
};
