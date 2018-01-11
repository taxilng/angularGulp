'use strict';
var cfoButtonHtml = require('./button.html');

module.exports = function cfoButton() {
    var directive = {
        restrict: 'EA',
        template: cfoButtonHtml,
        replace: true,
        scope: {
            className: '@',
            icon: '@',
            text: '@',
            iconAlign: '@',
            width: '@',
            click: '&'
        },
        link: link
    };
    return directive;

    function link(){
    }
};

