'use strict';

var distributionOrgTreeHtml = require('./distributionOrgTree.html');
var distributionOrgTreeController = require('./distributionOrgTree.controller');

module.exports = function distributionOrgTreeDirective() {
    var directive = {
        restrict: 'E',
        template: distributionOrgTreeHtml,
        scope: {
            params: '=',
            nodeData: '=',
            mode:'='
        },
        controller: ['$rootScope','AuthorityManagementService','TreeService', '$q','EventBusService',distributionOrgTreeController],
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
};
