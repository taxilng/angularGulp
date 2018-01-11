'use strict';

var salesDetailAnalyService = function(HttpService, CONFIG) {
    var service = {
        queryAnalySalesDetail: queryAnalySalesDetail//大钱包-销售业绩明细分析
    };

    return service;

    // 销售业绩明细分析
    function queryAnalySalesDetail(params) {
        return HttpService.request(CONFIG.API.ANALYSALESDETAIL,params);
    }
}

module.exports = salesDetailAnalyService;
		