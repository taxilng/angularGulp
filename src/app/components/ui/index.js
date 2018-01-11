'use strict';

var funnel = require('./_funnel');
var tabs = require('./_tabs');
var avatar = require('./avatar');
var button = require('./button');
var dateRange = require('./dateRange');
var header = require('./header');
var icon = require('./icon');
var inputButton = require('./input/inputButton');
var logo = require('./logo');
var matrix = require('./matrix');
var menuBar = require('./menu/menuBar');
var menuNav = require('./menu/menuNav');
var sideBar = require('./menu/sideBar');
var sideItem = require('./menu/sideItem');
var tabBar = require('./menu/tapBar');
var modal = require('./modal');
var pagination = require('./pagination');
var panel = require('./panel');
var table = require('./table');
var tree = require('./tree');
var wizard = require('./wizard');
var dataTable = require('./dataTable');
var calendar = require('./calendar');
var mobileFooter = require('./mobileFooter');
var leftSideBar = require('./leftSideBar');
var breadcrumb = require('./breadcrumb');
var loading = require('./loading');
require('form/form-template/bootstrap-custom');

var mod = angular.module('cfoUI', [
    funnel.name,
    tabs.name,
    avatar.name,
    button.name,
    dateRange.name,
    header.name,
    icon.name,
    inputButton.name,
    logo.name,
    matrix.name,
    menuBar.name,
    menuNav.name,
    sideBar.name,
    sideItem.name,
    tabBar.name,
    modal.name,
    pagination.name,
    panel.name,
    table.name,
    tree.name,
    wizard.name,
    dataTable.name,
    calendar.name,
    mobileFooter.name,
    leftSideBar.name,
    breadcrumb.name,
    loading.name,
    'schemaForm'
]);

module.exports = mod;
