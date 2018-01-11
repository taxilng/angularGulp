'use strict';

var echarts = require('echarts');

module.exports = function eChart() {
    var directive = {
        restrict: 'AE',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = echarts.init(el[0], 'macarons');

        //监听options变化
        attr.$observe('options', function() {
            if (attr.options) {
                var options = scope.$eval(attr.options);
                if (angular.isObject(options)) {
                    myChart.setOption(options);
                }
            }
        }, true);
    }
};
