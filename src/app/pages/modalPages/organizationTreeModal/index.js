'use strict';

var organizationTreeHtml = require('./organizationTreeModal.html');
var organizationTreeController = require('./organizationTreeModal.controller');

var distributionOrgTree = require('../../../components/bizUI/distributionOrgTree');

var tree = require('tree');
var panel = require('panel');

require('./organizationTreeModal.layout.styl');

var mod = angular.module('organizationTreeModal',[
    distributionOrgTree.name,
    tree.name,
    panel.name
]).controller('OrganizationTreeModalController', ['$rootScope','ModalService','row',organizationTreeController]);

module.exports = {
    module: mod,
    html: organizationTreeHtml,
    controller: organizationTreeController
};
