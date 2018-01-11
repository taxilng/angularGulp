'use strict';

var form = require('./template/form.html');
var formInlineHtml = require('./template/form-inline.html');
var formHorizontalHtml = require('./template/form-horizontal.html');

var _ = require('lodash');

module.exports = function() {
    var directive = {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: templateFunc,
        link: linkFunc
    };

    return directive;

    // 由form样式选择form模版
    function templateFunc(el, attr) {
        var templateHtml;
        switch(attr.formClass) {
        case 'form-inline':
            templateHtml = formInlineHtml;
            break;
        case 'form-horizontal':
            templateHtml = formHorizontalHtml;
            break;
        default:
            templateHtml = form;
            break;
        }

        return templateHtml;
    }

    function linkFunc(scope, el, attr) {
        scope.name = 'hhhh';
        attr.$observe('option', function() {
            if(attr.option) {
                var option = scope.$eval(attr.option);
                if (angular.isObject(option)) {
                    scope.option = calc(option);
                    console.log(option);
                }
            }
        }, true);

        function calc(option) {
            angular.forEach(option.rows, function(key) {
                key.width = 12 / _.size(key.columns);
                key.columnClass = _.join(['col-lg-' + key.width, 'col-md-' + key.width, 'col-sm-' + key.width], ' ');
            });

            return option;
        }
    }
};
