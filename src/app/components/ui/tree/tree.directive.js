'use strict';
var treeController = require('./tree.controller');
var treeHtml = require('./tree.html');

module.exports = function() {
    var directive = {
        restrict: 'AE',
        template: treeHtml,
        controller: ['$scope', 'TreeService', treeController],
        controllerAs: 'vm',
        scope: {
            options: '='
        },
        link: linkFunc
    };

    return directive;

    function linkFunc(scope,element,attrs) {
        // 右键菜单显示的时候，回调的函数
        scope.onShow = function() {
            scope.lock = true;
        };

        // 右键菜单关闭的时候，回调的函数
        scope.onClose = function() {
            scope.lock = false;
        };

    }
};
