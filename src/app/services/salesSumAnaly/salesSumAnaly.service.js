'use strict';

var salesSumAnalyService = function(HttpService, CONFIG) {
    var service = {
        queryAnalySalesSum: queryAnalySalesSum //大钱包-销售业绩汇总分析
    };

    return service;

    // 销售业绩汇总分析
    function queryAnalySalesSum(params) {
        return HttpService.request(CONFIG.API.ANALYSALESSUMSERVICE,params);
    }
}

module.exports = salesSumAnalyService;
		