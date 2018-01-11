'use strict';

var mobileFooterHtml = require('./mobileFooter.html');


module.exports = function mobileFooter($window, $state, $stateParams) {
    var directive = {
        restrict: 'E',
        replace: true,
        template: mobileFooterHtml,
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr) {
        scope.activeFn = activeFn;

        // var param = $stateParams.param||false;
        function activeFn(state) {
            this.param = $stateParams.mobileTaskType || false;
            this.active = false;
            if (this.param) {
                this.stateString = $state.current.name +
                    '({mobileTaskType: "' + this.param + '"})';
                if (this.stateString == state) {
                    this.active = true;
                }
            } else {
                if (state === $state.current.name) {
                    this.active = true;
                }
            }
            return this.active;
        }
    }

};
