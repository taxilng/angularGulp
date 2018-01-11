'use strict';

var homeController = require('./home.controller');
var homeHtml = require('./home.html');

require('./home.skin.styl');
require('./home.layout.styl');

var mod = angular.module('home', [])
    .controller('HomeController', homeController);

module.exports = {
    module: mod,
    html: homeHtml,
    controller: homeController
};
