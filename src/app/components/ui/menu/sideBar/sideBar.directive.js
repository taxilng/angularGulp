'use strict';

var sideBarHtml = require('./sideBar.html');

module.exports = function sideBar() {
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: sideBarHtml,
        scope: {
            align: '@'
        },
        controller: sideBarManagerController,
        controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, element, attrs) {

    }

    function sideBarManagerController() {
        var vm = this;
        // vm.concernContent = [{
        //     name: '收银台',
        //     src: 'home-icon',
        //     state: 'cashierdesk'
        // }, {
        //     name: '大钱包',
        //     src: 'customer-icon',
        //     state: 'myCustomer.rankChange'
        // }, {
        //     name: '财富管家',
        //     src: 'promotion-icon',
        //     state: 'myMarketing'
        // }, {
        //     name: '安全管理',
        //     src: 'achievement-icon',
        //     state: 'myAchievement.sizeTargetOfOrganization'
        // }, {
        //     name: '产品管理',
        //     src: 'tool-icon',
        //     state: 'commonTool'
        // }];
    }
};
