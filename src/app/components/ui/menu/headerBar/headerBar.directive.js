'use strict';

var headerBarHtml = require('./headerBar.html');

module.exports = function() {
    var directive = {
        restrict: 'AE',
        template: headerBarHtml
    };

    return directive;
};
