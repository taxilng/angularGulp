'use strict';

var authorityTreeHtml = require('./authorityTree.html');
var AuthorityController = require('./authorityTree.controller');

module.exports = function authorityTree() {
    var directive = {
        restrict: 'E',
        template: authorityTreeHtml,
        scope: {
            nodeData: '='
        },
        controller: ['$rootScope', '$scope', '$q', 'EventBusService', AuthorityController],
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
};
