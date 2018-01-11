'use strict';

var tapBarHtml = require('./tapBar.html');

module.exports = function sideItem() {
    var directive = {
        restrict: 'E',
        template: tapBarHtml,
        scope: {
            options: '='
        },
        link: linkFn
    };

    function linkFn(scope) {
        for (var i in scope.options) {
            if (!scope.options[i].className) {
                scope.options[i].className = 'btn-powder-shadow';
            }
        }
    }
    return directive;
};
