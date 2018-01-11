'use strict';

var supplierService = function(HttpService,CONFIG) {
    var service = {
        querySupplierInfo:querySupplierInfo,
        addSupplyInfo:addSupplyInfo,
        updateSupplyInfo:updateSupplyInfo,
        supplyInfoEffectStatus: supplyInfoEffectStatus,
        queryBankNameList:queryBankNameList
    };

    return service;

    function querySupplierInfo(params) {
        return HttpService.request(CONFIG.API.QUERYSUPPLIERINFO,params);
    }

    function addSupplyInfo(params) {
        return HttpService.request(CONFIG.API.ADDSUPPLIERINFO,params);
    }

    function updateSupplyInfo(params) {
        return HttpService.request(CONFIG.API.UPDATESUPPLYINFO,params);
    }

    function supplyInfoEffectStatus(params) {
        return HttpService.request(CONFIG.API.SUPPLYINFOEFFECTSTATUS,params);
    }

    /**
     * 查询银行信息
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    function queryBankNameList(params) {
        return HttpService.request(CONFIG.API.QUERYBANKNAMELIST,params);
    }
}

module.exports = supplierService;
