'use strict';

var menuTree = require('./menuTree');
var authorityTree = require('./authorityTree');
var organizationTree = require('./organizationTree');
var ckeditor = require('./ckeditor');
var distributionOrgTree = require('./distributionOrgTree');
var fileModal = require('./fileModal');

var bizUI = angular.module('bizUI', [
    menuTree.name,
    authorityTree.name,
    organizationTree.name,
    ckeditor.name,
    distributionOrgTree.name,
    fileModal.name
]);

module.exports = bizUI;

