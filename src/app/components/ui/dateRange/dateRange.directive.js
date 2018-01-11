'use strict';
var cfoDataRange = require('./dateRange.html');

module.exports = function cfoButton() {
    var directive = {
        restrict: 'EA',
        template: cfoDataRange,
        scope: {
            min: '=',
            max: '='
        },
        link: linkFunc
    };
    return directive;

    function linkFunc() {}
};
