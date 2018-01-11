'use strict';
var bankinfoService = function(HttpService, CONFIG) {
    var service = {
        searchBankInfo: searchBankInfo,
        saveBankInfo: saveBankInfo,
        updateBankInfo:updateBankInfo,
        delBankInfo:delBankInfo
    };

     return service;

    function searchBankInfo(params) {
        return HttpService.request(CONFIG.API.BANKINFO_QUERY, params);
    }

   function saveBankInfo(params) {
        return HttpService.request(CONFIG.API.BNAKINFO_SAVE,params);
    }

   function updateBankInfo(params) {
        return HttpService.request(CONFIG.API.BANKINFO_UPDATE,params);
    }

    function delBankInfo(params) {
        return HttpService.request(CONFIG.API.BANKINFO_DEL,params);
    }

}


module.exports = bankinfoService;
