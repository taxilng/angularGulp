'use strict';

var addOrgNodeController = require('./addOrgNode.controller');
var addOrgNodeHtml = require('./addOrgNode.html');

require('./addOrgNode.skin.styl');
require('./addOrgNode.layout.styl');

var mod = angular.module('addOrgNode', [])
    .controller('AddOrgNodeController', addOrgNodeController);

module.exports = {
    module: mod,
    html: addOrgNodeHtml,
    controller: addOrgNodeController
};
