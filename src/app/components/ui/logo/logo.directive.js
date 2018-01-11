'use strict';

var logoHtml = require('./logo.html');

module.exports = function logo() {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            title: '=',
            src: '@'
        },
        template: logoHtml
    };

    return directive;
};
