'use strict';

var {name}Html = require('./{name}.html');

module.exports = function {name}() {
    var directive = {
        restrict: 'E',
        scope:{},
        template: {name}Html
    };

    return directive;
};
