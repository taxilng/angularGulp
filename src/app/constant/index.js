'use strict';
var roleConstant = require('./role.constant');
var menuConstant = require('./menu/menu.constant');
var queryCheckingGroupViewConstant = require('./uniformMayment/reconciliation/queryCheckingGroupView.constant');
var queryErrorCheckingResultConstant = require('./uniformMayment/reconciliation/queryErrorCheckingResult.constant');
var requestCheckingViewConstant = require('./uniformMayment/reconciliation/requestCheckingView.constant');
var queryUnknownPaymentConstant = require('./uniformMayment/reconciliation/queryUnknownPayment.constant');
var queryPaymentOrderSummaryConstant = require('./uniformMayment/reconciliation/queryPaymentOrderSummary.constant');
var menuManagementConstant = require('./authorityManagement/menuManagement.constant');
var addTreeNodeConstant = require('./authorityManagement/addTreeNode.constant');
var roleManagementConstant = require('./authorityManagement/roleManagement.constant');
var paymodemanageConstant = require('./cashierdesk/paymodemanage.constant');
var bankinfomodalConstant = require('./cashierdesk/bankinfomodal.constant');
var bankinfomanageConstant = require('./cashierdesk/bankinfomanage.constant');
var transactiontypemanageConstant = require('./cashierdesk/transactiontypemanage.constant');
var paymentchannelmanageConstant = require('./cashierdesk/paymentchannelmanage.constant');
var financingproductmanageConstant = require('./product/financingproductmanage.constant');
var fundproductmanageConstant = require('./product/fundproductmanage.constant');
var roleUpdateConstant = require('./authorityManagement/roleUpdate.constant');
var orgManagementConstant = require('./authorityManagement/orgManagement.constant');
var addOrgNodeConstant = require('./authorityManagement/addOrgNode.constant');
var userManagementConstant = require('./authorityManagement/userManagement.constant');
var userUpdateConstant = require('./authorityManagement/userUpdate.constant');
var userAllocationRoleConstant = require('./authorityManagement/userAllocationRole.constant');
var transactionTypeModalConstant = require('./cashierdesk/transactiontypemodal.Constant');
var paymentChannelModalConstant = require('./cashierdesk/paymentchannelmodal.Constant');
var registCustomerCountConstant = require('./customerManagement/registCustomerCount.constant');
var objectDataConstant = require('./uniformMayment/reconciliation/enum/objectData.constant');
var fundProductModalConstant = require('./product/fundproductmodal.constant');
var supplierManagementConstant = require('./financingProxy/supplierManagement.constant');
var supplierModalConstant = require('./financingProxy/supplierModal.constant');
var proxyAgreementConstant = require('./financingProxy/proxyAgreement.constant');
var proxyAgreementModalConstant = require('./financingProxy/proxyAgreementModal.constant');
var supplierPaymentConstant = require('./financingProxy/supplierPayment.constant');
var salesSumAnalyConstant = require('./wallet/salesSumAnaly.constant');
var salesDetailAnalyConstant = require('./wallet/salesDetailAnaly.constant');
var fundManagerManageConstant = require('./product/fundmanagermanage.constant');
var investPlanConfigConstant = require('./wealth/investPlanConfig.constant');
var investPlanConfigModalConstant = require('./wealth/investPlanConfigModal.constant');
var systemCutDayConstant = require('./batchManagement/systemCutDay.constant');
var timingConfigurationConstant = require('./batchManagement/timingConfiguration.constant');
var fundManagerModalConstant = require('./product/fundmanagermodal.constant');
var fundConstant = require('./product/enum/fund.constant');
var configurationModalConstant = require('./batchManagement/configurationModal.constant');
var viewTaskConstant = require('./batchManagement/viewTask.constant');
var stepModalConstant = require('./batchManagement/stepModal.constant')
var createJobConstant = require('./batchManagement/createJob.constant')
var taskCreateRoleConstant = require('./batchManagement/taskCreate.constant');
var supplyTypeMapConstant = require('./financingProxy/enum/supplyType.constant');
var cooperationStatusConstant = require('./financingProxy/enum/cooperateStatus.constant');
var cardtypeConstant = require('./cashierdesk/enum/cardtype.constant');
var productCheckingConstant = require('./wallet/productChecking.constant');
var regularExpressionConstant = require('./regularExpression/regularExpression.constant');

var mod = angular.module('FinancialManager.constant', [])
    .constant('RoleConstant', roleConstant)
    .constant('QueryCheckingGroupViewConstant', queryCheckingGroupViewConstant)
    .constant('QueryErrorCheckingResultConstant', queryErrorCheckingResultConstant)
    .constant('RequestCheckingViewConstant', requestCheckingViewConstant)
    .constant('QueryUnknownPaymentConstant', queryUnknownPaymentConstant)
    .constant('QueryPaymentOrderSummaryConstant', queryPaymentOrderSummaryConstant)
    .constant('MenuManagementConstant', menuManagementConstant)
    .constant('AddTreeNodeConstant', addTreeNodeConstant)
    .constant('RoleManagementConstant', roleManagementConstant)
    .constant('PaymodemanageConstant',paymodemanageConstant)
    .constant('MenuConstant', menuConstant)
    .constant('BankInfoModalConstant',bankinfomodalConstant)
    .constant('BankInfoManageConstant',bankinfomanageConstant)
    .constant('TransactionTypeManageConstant',transactiontypemanageConstant)
    .constant('PaymentChannelManageConstant',paymentchannelmanageConstant)
    .constant('FinanacingProductManageConstant',financingproductmanageConstant)
    .constant('FundProductManageConstant',fundproductmanageConstant)
    .constant('RoleUpdateConstant',roleUpdateConstant)
    .constant('OrgManagementConstant',orgManagementConstant)
    .constant('AddOrgNodeConstant',addOrgNodeConstant)
    .constant('UserManagementConstant',userManagementConstant)
    .constant('UserUpdateConstant',userUpdateConstant)
    .constant('UserAllocationRoleConstant',userAllocationRoleConstant)
    .constant('MenuConstant', menuConstant)
    .constant('TransactionTypeModalConstant',transactionTypeModalConstant)
    .constant('PaymentChannelModalConstant',paymentChannelModalConstant)
    .constant('ObjectDataConstant', objectDataConstant)
    .constant('RegistCustomerCountConstant',registCustomerCountConstant)
    .constant('FundProductModalConstant',fundProductModalConstant)
    .constant('SupplierManagementConstant',supplierManagementConstant)
    .constant('ProxyAgreementConstant',proxyAgreementConstant)
    .constant('ProxyAgreementModalConstant',proxyAgreementModalConstant)
    .constant('SupplierPaymentConstant',supplierPaymentConstant)
    .constant('SalesSumAnalyConstant',salesSumAnalyConstant)
    .constant('SalesDetailAnalyConstant',salesDetailAnalyConstant)
    .constant('FundManagerManageConstant',fundManagerManageConstant)
    .constant('FundManagerModalConstant',fundManagerModalConstant)
    .constant('SystemCutDayConstant',systemCutDayConstant)
    .constant('TimingConfigurationConstant',timingConfigurationConstant)
    .constant('SupplierModalConstant',supplierModalConstant)
    .constant('FundConstant',fundConstant)
    .constant('InvestPlanConfigConstant',investPlanConfigConstant)
    .constant('InvestPlanConfigModalConstant',investPlanConfigModalConstant)
    .constant('ConfigurationModalConstant',configurationModalConstant)
    .constant('ViewTaskConstant',viewTaskConstant)
    .constant('StepModalConstant',stepModalConstant)
    .constant('CreateJobConstant',createJobConstant)
    .constant('TaskCreateRoleConstant',taskCreateRoleConstant)
    .constant('SupplyTypeMapConstant',supplyTypeMapConstant)
    .constant('CooperationStatusConstant',cooperationStatusConstant)
    .constant('CardtypeConstant',cardtypeConstant)
    .constant('RegularExpressionConstant',regularExpressionConstant)
    .constant('ProductCheckingConstant',productCheckingConstant);

module.exports = mod;
