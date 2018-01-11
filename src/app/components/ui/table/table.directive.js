'use strict';

module.exports = function table() {
    var directive = {
        restrict: 'AE',
        templateUrl: 'app/components/ui/table/table.html',
        replace: false,
        scope: {
            options: '=' //绑定指令外部的duration属性,控制可重发消息的时间
        },
        link:linkFunc
    };
    return directive;

    function linkFunc() {
    }
};
