'use strict';
var fundProductService = function(HttpService, CONFIG) {
    var service = {
        search: search,
        save:save,
        update:update,
        del:del,
        searchDetail:searchDetail,
        productOnSale:productOnSale,
        productOffSale:productOffSale
    };

    return service;

     function search(params) {
        return HttpService.request(CONFIG.API.FUND_PRODUCT_QUERY, params);
    }

    function save(params){
        return HttpService.request(CONFIG.API.FUND_PRODUCT_SAVE,params);
    }

    function update(params){
        return HttpService.request(CONFIG.API.FUND_PRODUCT_UPDATE,params);
    }

    function del(params){
        return HttpService.request(CONFIG.API.FUND_PRODUCT_DEL,params);
    }

    function searchDetail(params){
        return HttpService.request(CONFIG.API.FUND_PRODUCT_QUERY_DETAIL,params);
    }

    function productOnSale(params){
        return HttpService.request(CONFIG.API.PRODUCT_ON_SALE,params);
    }

    function productOffSale(params){
        return HttpService.request(CONFIG.API.PRODUCT_OFF_SALE,params);
    }


}


module.exports = fundProductService;
