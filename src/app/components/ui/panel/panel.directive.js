'use strict';

var panelHtml = require('./panel.html');

module.exports = function panel() {
    var directive = {
        restrict: 'E',
        transclude: {
            'title': '?panelTitle',
            'body': 'panelBody'
        },
        link: linkFunc,
        scope: {
            panelOptions: '='
        },
        template: panelHtml
    };
    return directive;

    function linkFunc(scope, el, attr) {
        scope.isDisable = true;
        scope.isOpen = true;
        if (scope.panelOptions && scope.panelOptions.hasOwnProperty('isCollapse')) {
            scope.isDisable = false;
            scope.isOpen = !scope.panelOptions.isCollapse;
        }
    }
};
