'use strict';

module.exports = function() {
    var directive = {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            option: '='
        },
        template: function() {
            return getTemplate();
        }
    };

    return directive;

    function getTemplate() {
        var template =
        '<input ' +
        'type="{{option.type}}" class="{{option.class}}" placeholder="{{option.placeholder}}">';

        return template;
    }
};
