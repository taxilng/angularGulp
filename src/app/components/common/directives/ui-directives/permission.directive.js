'use strict';

module.exports = function permission(PermissionService) {
    var directive = {
        restrict: 'A',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr) {
        // PermissionService.hasPermission(attr);
    }
};
