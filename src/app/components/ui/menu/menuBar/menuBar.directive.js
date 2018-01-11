'use strict';

var menuBarHtml = require('./menuBar.html');

module.exports = function menuBar() {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            items: '='
        },
        template: menuBarHtml
    };

    return directive;
};
