'use strict';

module.exports = function routerConfig($stateProvider, $urlRouterProvider) {
    //登录
    loginRouter();
    //收银台一级菜单路由
    cashierdeskRouter();
    //产品管理
    productRouter();

    //财富管家
    wealthManagement();
    // 统一支付
    uniformPayment();
    // 权限管理
    authorityManagement();
    //客户管理(一账通)
    customerManagement();
    //钱包管理
    walletManagement();
    //金融代理
    financingProxyRouter();
    // 批量管理
    batchManagementRouter();

    function loginRouter() {
        $stateProvider
            .state('login', require(
                './pages/main/login/login.router'
            ))
            .state('index', require(
                './pages/main/home/home.router'
            ));
    }

    function cashierdeskRouter() {
        $stateProvider
            .state('cashierdesk', require(
                './pages/cashierdesk/cashierdeskCenter/cashierdeskCenter.router'
            ))
            .state('cashierdesk.paymodemanage', require(
                './pages/cashierdesk/paymodemanage/paymodemanage.router'
            ))
            .state('cashierdesk.bankinfoManage', require(
                './pages/cashierdesk/bankinfoManage/bankinfoManage.router'
            ))
            .state('cashierdesk.transactiontypeManage', require(
                './pages/cashierdesk/transactiontypeManage/transactiontypeManage.router'
            ))
            .state('cashierdesk.paymentchannelManage', require(
                './pages/cashierdesk/paymentchannelManage/paymentchannelManage.router'
            ));
    }

    function productRouter() {
        $stateProvider
            .state('product', require(
                './pages/product/productCenter/productCenter.router'
            ))
            .state('product.financingProductManage', require(
                './pages/product/financingProductManage/financingProductManage.router'
            ))
            .state('product.productInfoManage', require(
                './pages/product/productinfoManage/productinfoManage.router'
            ))
            .state('product.fundProductManage', require(
                './pages/product/fundProductManage/fundProductManage.router'
            ))
            .state('product.fundManagerManage', require(
                './pages/product/fundManagerManage/fundManagerManage.router'));
    }

    function wealthManagement() {
        $stateProvider
            .state('wealth', require(
                './pages/wealth/wealthCenter/wealthCenter.router'
            ))
            .state('wealth.investPlanConfig', require(
                './pages/wealth/investPlanConfig/investPlanConfig.router'
            ));
    }


    /**
     * 统一支付路由配置
     */
    function uniformPayment() {
        $stateProvider
            .state('uniformPayment', require(
                './pages/uniformMayment/uniformMaymentCenter/uniformMaymentCenter.router'
            ))
            .state('uniformPayment.queryCheckingGroupView', require(
                './pages/uniformMayment/reconciliation/queryCheckingGroupView/queryCheckingGroupView.router'
            ))
            .state('uniformPayment.queryErrorCheckingResult', require(
                './pages/uniformMayment/reconciliation/queryErrorCheckingResult/queryErrorCheckingResult.router'
            ))
            .state('uniformPayment.requestCheckingView', require(
                './pages/uniformMayment/reconciliation/requestCheckingView/requestCheckingView.router'
            ))
            .state('uniformPayment.queryUnknownPayment', require(
                './pages/uniformMayment/single/queryUnknownPayment/queryUnknownPayment.router'
            ))
            .state('uniformPayment.queryPaymentOrderSummary', require(
                './pages/uniformMayment/single/queryPaymentOrderSummary/queryPaymentOrderSummary.router'
            ))
    }

    /**
     * 权限管理路由配置
     */
    function authorityManagement() {
        $stateProvider
            .state('authorityCenter', require(
                './pages/authorityManagement/authorityCenter/authorityCenter.router'
            ))
            .state('authorityCenter.menuManagement', require(
                './pages/authorityManagement/menuManagement/menuManagement.router'
            ))
            .state('authorityCenter.orgManagement', require(
                './pages/authorityManagement/orgManagement/orgManagement.router'
            ))
            .state('authorityCenter.roleManagement', require(
                './pages/authorityManagement/roleManagement/roleManagement.router'
            ))
            .state('authorityCenter.userManagement', require(
                './pages/authorityManagement/userManagement/userManagement.router'
            ))
    }

    /**
     * 客户管理
     */
    function customerManagement() {
        $stateProvider
            .state('customerCenter', require(
                './pages/customerManagement/customerCenter/customerCenter.router'
            ))
            .state('customerCenter.registCustomerCount', require(
                './pages/customerManagement/registCustomerCount/registCustomerCount.router'
            ))
    }

    /**
     * 錢包管理
     */
    function walletManagement() {
        $stateProvider
            .state('walletCenter', require(
                './pages/wallet/walletCenter/walletCenter.router'
            ))
            .state('walletCenter.salesSumAnaly', require(
                './pages/wallet/salesSumAnaly/salesSumAnaly.router'
            ))
            .state('walletCenter.salesDetailAnaly', require(
                './pages/wallet/salesDetailAnaly/salesDetailAnaly.router'
            ))
            .state('walletCenter.productChecking', require(
                './pages/wallet/productChecking/productChecking.router'
            ))
    }

    //金融代理
    function financingProxyRouter() {
        $stateProvider
            .state('financingProxyCenter', require(
                './pages/financingProxy/financingProxyCenter/financingProxyCenter.router'
            ))
            .state('financingProxyCenter.supplierManagement', require(
                './pages/financingProxy/supplierManagement/supplierManagement.router'
            ))
            .state('financingProxyCenter.proxyAgreement', require('./pages/financingProxy/proxyAgreement/proxyAgreement.router'))
            .state('financingProxyCenter.supplierPayment', require(
                './pages/financingProxy/supplierPayment/supplierPayment.router'
            ));
    }

    /**
     * 批量管理
     */
    function batchManagementRouter() {
        $stateProvider
            .state('batchCenter', require(
                './pages/batchManagement/batchCenter/batchCenter.router'
            ))
            .state('batchCenter.systemCutDay', require(
                './pages/batchManagement/systemCutDay/systemCutDay.router.js'
            ))
            .state('batchCenter.timingConfiguration', require(
                './pages/batchManagement/timingConfiguration/timingConfiguration.router'
            ))
            .state('batchCenter.viewTask', require(
                './pages/batchManagement/viewTask/viewTask.router'
            ))
            .state('batchCenter.createJob', require(
                './pages/batchManagement/createJob/createJob.router'
            ))
            .state('batchCenter.configurationJob', require(
                './pages/batchManagement/configurationJob/configurationJob.router'
            ))
            .state('batchCenter.configurationFileChannel', require(
                './pages/batchManagement/configurationFileChannel/configurationFileChannel.router'
            ))
    }

    $urlRouterProvider.otherwise('/cashierdesk/cashierdeskCenter');
    // $urlRouterProvider.otherwise('login');
};