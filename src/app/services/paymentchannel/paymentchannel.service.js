'use strict';

var paymentChannelService = function(HttpService, CONFIG) {
    var service = {
        search: search,
        save:save,
        update:update,
        del:del
    };

    return service;

    function search(params) {
        return HttpService.request(CONFIG.API.PAYMENT_CHANNEL_QUERY, params);
    }

    function save(params){
        return HttpService.request(CONFIG.API.PAYMENT_CHANNEL_SAVE,params);
    }

    function update(params){
        return HttpService.request(CONFIG.API.PAYMENT_CHANNEL_EDIT,params);
    }

    function del(params){
        return HttpService.request(CONFIG.API.PAYMENT_CHANNEL_DEL,params);
    }

};


module.exports = paymentChannelService;