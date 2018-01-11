'use strict';

var mobileFooterDirective = require('./mobileFooter.directive');

require('./mobileFooter.layout.styl');
require('./mobileFooter.skin.styl');

var mobileFooter = angular.module('mobileFooter', [])
    .directive('cfoMobileFooter', ['$window', '$state', '$stateParams',
        mobileFooterDirective
    ]);

module.exports = mobileFooter;
