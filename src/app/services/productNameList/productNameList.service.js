'use strict';

var productNameListService = function(HttpService, CONFIG) {
    var service = {
        prodNameListSelect: prodNameListSelect,//产品名称列表查询
        productDetailList: productDetailList //产品列表查询
    };

    return service;

    function prodNameListSelect(params) {
        return HttpService.request(CONFIG.API.PRODNAMELISTSELECT,params);
    }

    function productDetailList(params) {
        return HttpService.request(CONFIG.API.PRODUCTDETAILLIST,params);
    }
}

module.exports = productNameListService;
