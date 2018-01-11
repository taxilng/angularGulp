'use strict';

var cashierdeskService = require('./cashierdesk/cashierdesk.service');
var permissionService = require('./permission.service');
var menutreeService = require('./menutree/menutree.service');
var bankinfoService = require('./bankinfo/bankinfo.service');
var productinfoService = require('./prodinfo/productinfo.service');
var productNameListService = require('./productNameList/productNameList.service');
var transactiontypeService = require('./transactiontype/transactiontype.service');
var paymentChannelService = require('./paymentchannel/paymentchannel.service');
var financingProductService = require('./financingproduct/financingproduct.service');
var fundProductService = require('./fundproduct/fundproduct.service');
var uniformMaymentService = require('./uniformMayment/uniformMayment.service');
var authorityManagementService = require('./authorityManagement/authorityManagement.service');
var customerManagementService = require('./customerManagement/customerManagement.service');
var proxyAgreementService = require('./proxyAgreement/proxyAgreement.service');
var supplierPaymentService = require('./supplierPayment/supplierPayment.service');
var supplierService = require('./supplierManagement/supplier.service');
var salesSumAnalyService = require('./salesSumAnaly/salesSumAnaly.service');
var salesDetailAnalyService = require('./salesDetailAnaly/salesDetailAnaly.service');
var fundManagerService = require('./fundmanager/fundmanager.service');
var batchManagementService = require('./batchManagement/batchManagement.service');
var userService = require('./main/user.service.js');
var productCheckingService = require('./productChecking/productChecking.service');
var investPlanConfigService = require('./investPlanConfig/investPlanConfig.service');
var mod = angular.module('FinancialManager.service', [])
    .factory('PermissionService', ['$rootScope', permissionService])
    .factory('CashierdeskService', ['HttpService', 'CONFIG', cashierdeskService])
    .factory('MenuTreeService',['HttpService','CONFIG','MenuConstant','$q',menutreeService])
    .factory('BankinfoService',['HttpService','CONFIG',bankinfoService])
    .factory('ProductinfoService',['HttpService','CONFIG',productinfoService])
    .factory('ProductNameListService',['HttpService','CONFIG',productNameListService])
    .factory('transactiontypeService',['HttpService','CONFIG',transactiontypeService])
    .factory('PaymentChannelService',['HttpService','CONFIG',paymentChannelService])
    .factory('FinancingProductService',['HttpService','CONFIG',financingProductService])
    .factory('UniformMaymentService',['HttpService','CONFIG',uniformMaymentService])
    .factory('AuthorityManagementService',['HttpService','CONFIG',authorityManagementService])
    .factory('FundProductService',['HttpService','CONFIG',fundProductService])
    .factory('CustomerManagementService',['HttpService','CONFIG',customerManagementService])
    .factory('ProxyAgreementService',['HttpService','CONFIG',proxyAgreementService])
    .factory('SupplierPaymentService',['HttpService','CONFIG',supplierPaymentService])
    .factory('SupplierService',['HttpService','CONFIG',supplierService])
    .factory('SalesSumAnalyService',['HttpService','CONFIG',salesSumAnalyService])
    .factory('SalesDetailAnalyService',['HttpService','CONFIG',salesDetailAnalyService])
    .factory('FundManagerService',['HttpService','CONFIG',fundManagerService])
    .factory('BatchManagementService',['HttpService','CONFIG',batchManagementService])
    .factory('UserService',['HttpService','CONFIG',userService])
    .factory('InvestPlanConfigService',['HttpService','CONFIG',investPlanConfigService])
    .factory('ProductCheckingService',['HttpService','CONFIG',productCheckingService]);

module.exports = mod;
