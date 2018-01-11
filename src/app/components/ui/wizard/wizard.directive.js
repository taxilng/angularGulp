'use strict';

var wizardHtml = require('./wizard.html');

module.exports = function($state, $window, WizardService) {
    var directive = {
        restrict: 'AE',
        replace: false,
        scope: {
            items: '='
        },
        template: wizardHtml,
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, element, attrs) {
        scope.control = false;                              // 左右移动菜单控制是否显示
        scope.innerStyle = {};                              // inner的属性配置
        scope.leftFn = leftFn;
        scope.rightFn = rightFn;

        var TIME = 396, endTo = false;

        var wrapWidth = element.children()[0].clientWidth - 95, widthStorage, position = 0;

        scope.closeTab = function(index){

            if ($state.current.name == scope.items[index].state) {
                setTimeout(function() {
                    $state.go(scope.items[index - 1].state);
                }, TIME);
            }else {
                setTimeout(function() {
                    $state.reload();
                }, TIME);
            }
            var end = scope.items.length - 5;
            if (index > end) {
                endTo = true;
            }
            scope.items.splice(index, 1);
        };

        scope.$watch('items', function(newValue, oldValue) {
            setTimeout(function() {
                var innerWidth = element.find('ul')[0].clientWidth;
                widthStorage = innerWidth;
                if (innerWidth >= wrapWidth) {
                    scope.control = true;
                    position =  -(innerWidth - wrapWidth);
                    scope.wrapStyle = {width: wrapWidth + 'px'};
                    if(newValue){
                        if (newValue.length > oldValue.length || endTo) {
                            scope.innerStyle = {left: position + 'px'};
                            endTo = false;
                        }
                    }


                }else {
                    scope.control = false;
                    scope.wrapStyle = {};                               // wrap的属性配置
                    scope.innerStyle = {};
                }

            }, TIME);
        }, true);

        function leftFn($event) {
            position += 95;
            if (position >= 0) {
                position = 0;
            }
            scope.innerStyle = {left: position + 'px'};
        }

        function rightFn($event) {
            position -= 95;
            if (position <= -(widthStorage - wrapWidth)) {
                position = -(widthStorage - wrapWidth);
            }
            scope.innerStyle = {left: position + 'px'};
        }

    }
};
