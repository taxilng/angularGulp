'use strict';

var configurationJobController = require('./configurationJob.controller');
var configurationJobHtml = require('./configurationJob.html');

require('./configurationJob.skin.styl');
require('./configurationJob.layout.styl');

var mod = angular.module('configurationJob', [])
    .controller('ConfigurationJobController', configurationJobController);

module.exports = {
    module: mod,
    html: configurationJobHtml,
    controller: configurationJobController
};
