'use strict';

var supplierPaymentService = function(HttpService, CONFIG) {
    var service = {
        querySupplierPayment: querySupplierPayment,//金融代理-查询代理商资金清结算
        supplierPaymentSetting: supplierPaymentSetting, // 金融代理-代理商资金清结算
        supplierPaymentClearing: supplierPaymentClearing, //金融代理-代理商资金清算
        supplierPaymentSettle: supplierPaymentSettle//金融代理-代理商资金结算
    };

    return service;

    // 查询代理商资金清结算
    function querySupplierPayment(params) {
        return HttpService.request(CONFIG.API.CLEARINGSUPPLIERPAYMENTLIST,params);
    }

    // 代理商资金清算
    function supplierPaymentClearing(params) {
        return HttpService.request(CONFIG.API.AGENCYAGREEMENTEFFECTSTATUS,params);
    }

    // 代理商资金结算
    function supplierPaymentSettle(params) {
        return HttpService.request(CONFIG.API.SUPPLIERSETTLE,params);
    }

    // 代理商资金清结算
    function supplierPaymentSetting(params) {
        return HttpService.request(CONFIG.API.AGENCYAGREEMENTEFFECTSTATUS,params);
    }
}

module.exports = supplierPaymentService;
		