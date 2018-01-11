'use strict';

var proxyAgreementService = function(HttpService, CONFIG) {
    var service = {
        queryAgencyAgreement: queryAgencyAgreement,//金融代理-查询代理协议列表
        addAgencyAgreement: addAgencyAgreement, //金融代理-新增代理协议
        updateAgencyAgreement: updateAgencyAgreement,//金融代理-更新代理协议
        queryAgencyAgreementDetail: queryAgencyAgreementDetail, //金融代理-查询代理协议详情
        agencyAgreementEffectStatus: agencyAgreementEffectStatus //金融代理-代理协议生失效
    };

    return service;

    // 查询代理协议列表
    function queryAgencyAgreement(params) {
        return HttpService.request(CONFIG.API.QUERYAGENCYAGREEMENT,params);
    }

    // 新增代理协议
    function addAgencyAgreement(params) {
        return HttpService.request(CONFIG.API.ADDAGENCYAGREEMENT,params);
    }

    // 更新代理协议
    function updateAgencyAgreement(params) {
        return HttpService.request(CONFIG.API.UPDATEAGENCYAGREEMENT,params);
    }

    // 查询代理协议详情
    function queryAgencyAgreementDetail(params) {
        return HttpService.request(CONFIG.API.QUERYAGENCYAGREEMENTDETAIL,params);
    }

    // 代理协议生失效
    function agencyAgreementEffectStatus(params) {
        return HttpService.request(CONFIG.API.AGENCYAGREEMENTEFFECTSTATUS,params);
    }
}

module.exports = proxyAgreementService;
		