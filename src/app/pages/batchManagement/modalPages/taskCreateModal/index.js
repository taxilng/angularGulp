'use strict';

var taskCreateModalController = require('./taskCreateModal.controller');
var taskCreateModalHtml = require('./taskCreateModal.html');

require('./taskCreateModal.skin.styl');
require('./taskCreateModal.layout.styl');

var mod = angular.module('taskCreateModal', [])
    .controller('TaskCreateModalController', taskCreateModalController);

module.exports = {
    module: mod,
    html: taskCreateModalHtml,
    controller: taskCreateModalController
};
