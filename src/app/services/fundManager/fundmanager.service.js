'use strict';

var fundManagerService = function(HttpService, CONFIG) {
	var service = {
        search: search,
        save:save,
        update:update,
        del:del,
        searchDetail:searchDetail
    };

    return service;

    function search(params){
    	return HttpService.request(CONFIG.API.FUND_MANAGER_QUERY, params);
    }

    function save(params){
    	return HttpService.request(CONFIG.API.FUND_MANAGER_SAVE, params);
    }

    function update(params){
    	return HttpService.request(CONFIG.API.FUND_MANAGER_UPDATE, params);
    }

    function del(params){
    	return HttpService.request(CONFIG.API.FUND_MANAGER_DEL, params);
    }

    function searchDetail(params){
    	return HttpService.request(CONFIG.API.FUND_MANAGER_QUERY_DETAIL, params);
    }
};

module.exports = fundManagerService;