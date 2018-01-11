'use strict';

var cashierdeskService = function(HttpService, CONFIG) {
    var service = {
        searchPaymodes: searchPaymodes,
        savePaymode:savePaymode,
        updatePaymode:updatePaymode,
        delPaymode:delPaymode
    };

    return service;

    function searchPaymodes(params) {
        return HttpService.request(CONFIG.API.PAYMENTMETHOD_QUERY, params);
    }

    function savePaymode(params) {
        return HttpService.request(CONFIG.API.SAVEPAYMODE,params);
    }

    function updatePaymode(params) {
        return HttpService.request(CONFIG.API.UPDATEPAYMODE,params);
    }

    function delPaymode(params) {
        return HttpService.request(CONFIG.API.PAYMENTMETHODDEL,params);
    }

}


module.exports = cashierdeskService;
