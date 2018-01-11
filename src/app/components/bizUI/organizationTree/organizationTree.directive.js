'use strict';

var organizationHtml = require('./organizationTree.html');
var OrganizationController = require('./organizationTree.controller');

module.exports = function organizationTreeDirective() {
    var directive = {
        restrict: 'E',
        template: organizationHtml,
        scope: {
            nodeData: '='
        },
        controller: ['$rootScope', '$scope', '$q', 'EventBusService', 'TreeService', 'ModalService', '$ngBootbox', 'AddOrgNodeConstant', 'toastr', 'AuthorityManagementService',OrganizationController],
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
};
