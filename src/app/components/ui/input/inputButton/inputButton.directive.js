'use strict';
var cfoInputButton = require('./inputButton.html');

/**
 * [exports description]
 * <cfo-input-button fa='ellipsis-h' click='' ng-model=''></cfo-input-button>
 * @return {[type]} [description]
 */
module.exports = function cfoButton() {
    var directive = {
        restrict: 'EA',
        template: cfoInputButton,
        scope: {
            click:'&',
            ngModel:'=',
            fa : '@'
        },
        link: link
    };
    return directive;

    function link(){
    }
};
