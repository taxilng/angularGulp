'use strict';

var transactiontypeService = function(HttpService, CONFIG) {
    var service = {
        search: search,
        save:save,
        update:update,
        del:del
    };

    return service;

    function search(params) {
        return HttpService.request(CONFIG.API.TRANSACTION_TYPE_QUERY, params);
    }

    function save(params){
        return HttpService.request(CONFIG.API.TRANSACTION_TYPE_SAVE,params);
    }

    function update(params){
        return HttpService.request(CONFIG.API.TRANSACTION_TYPE_EDIT,params);
    }

    function del(params){
        return HttpService.request(CONFIG.API.TRANSACTION_TYPE_DEL,params);
    }

}


module.exports = transactiontypeService;