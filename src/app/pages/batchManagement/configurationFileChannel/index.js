'use strict';

var configurationFileChannelController = require('./configurationFileChannel.controller');
var configurationFileChannelHtml = require('./configurationFileChannel.html');

require('./configurationFileChannel.skin.styl');
require('./configurationFileChannel.layout.styl');

var mod = angular.module('configurationFileChannel', [])
    .controller('ConfigurationFileChannelController', configurationFileChannelController);

module.exports = {
    module: mod,
    html: configurationFileChannelHtml,
    controller: configurationFileChannelController
};
