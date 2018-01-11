'use strict';

var productinfoService = function(HttpService, CONFIG) {
    var service = {
        search: search,
        save:save,
        update:update,
        del:del
    };

    return service;

    function search(params) {
        return HttpService.request(CONFIG.API.DEPOSIT_AMOUNT_QUERY, params);
    }

    function save(params){
        return HttpService.request(CONFIG.API.DEPOSIT_AMOUNT_SAVE,params);
    }

    function update(params){
        return HttpService.request(CONFIG.API.DEPOSIT_AMOUNT_EDIT,params);
    }

    function del(params){
        return HttpService.request(CONFIG.API.DEPOSIT_AMOUNT_DEL,params);
    }

}


module.exports = productinfoService;