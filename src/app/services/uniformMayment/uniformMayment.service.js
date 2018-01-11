'use strict';

var uniformMaymentService = function(HttpService, CONFIG) {
    var service = {
        searchErrorCheckingResult:searchErrorCheckingResult,
        checkingGroupResult:checkingGroupResult,
        requestCheckingRequest:requestCheckingRequest,
        queryPOSummaryRequest:queryPOSummaryRequest,
        queryPaymentOrderSummary:queryPaymentOrderSummary,
        queryCheckingSystemService:queryCheckingSystemService,
        cancelPaymentOrder:cancelPaymentOrder,
        processPaymentOrderReceivePayment:processPaymentOrderReceivePayment,
        checkingSingleErrHandleService:checkingSingleErrHandleService,
        queryCheckingResultSingleDetailService:queryCheckingResultSingleDetailService,
        processCheckingService:processCheckingService,
        queryUnknownPOStatus:queryUnknownPOStatus
    };

    return service;

    // 对账差错结果查询
    function searchErrorCheckingResult(params){
        return HttpService.request(CONFIG.API.SEARCHERRORCHECKING,params);
    }

    // 对账结果查询
    function checkingGroupResult(params){
    	return HttpService.request(CONFIG.API.CHECKINGGROUPRESULT,params);
    }

    //请求对账服务
    function requestCheckingRequest(params){
        return HttpService.request(CONFIG.API.REQUESTCHECKING,params);
    }

    // 支付订单不确定交易查询服务
    function queryPOSummaryRequest(params){
        return HttpService.request(CONFIG.API.QUERYUNKNOWNPOSUMMARY,params);
    }

    // 支付订单概要查询
    function queryPaymentOrderSummary(params){
        return HttpService.request(CONFIG.API.QUERYPOSUMMARY,params);
    }

    // 对账系统查询
    function queryCheckingSystemService(params){
        return HttpService.request(CONFIG.API.QUERYCHECKINGSYSTEMSERVICE,params);
    }

    // 支付订单红冲
    function cancelPaymentOrder(params){
        return HttpService.request(CONFIG.API.CANCELPAYMENTORDER,params);
    }

    // 执行订单收付款
    function processPaymentOrderReceivePayment(params){
        return HttpService.request(CONFIG.API.PROCESSPAYMENTORDER,params);
    }

    // 对账单笔差错处理
    function checkingSingleErrHandleService(params){
        return HttpService.request(CONFIG.API.CHECKINGSINGLEERR,params);
    }

    // 对账结果单笔详情查询
    function queryCheckingResultSingleDetailService(params){
        return HttpService.request(CONFIG.API.QUERYCHECKINGRESULT,params);
    }

    // 继续对账指令
    function processCheckingService(params){
        return HttpService.request(CONFIG.API.PROCESSCHECKINGSERVICE,params);
    }

    // 支付订单不确定结果查询 -- 同步订单
    function queryUnknownPOStatus(params){
        return HttpService.request(CONFIG.API.QUERYUNKNOWNPOSTATUS,params);
    }

}


module.exports = uniformMaymentService;