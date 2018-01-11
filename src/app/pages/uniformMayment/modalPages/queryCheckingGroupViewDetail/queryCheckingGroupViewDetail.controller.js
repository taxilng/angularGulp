'use strict';
// 对账差错结果查询
module.exports = function(ModalService, row, $scope, toastr, UniformMaymentService) {
    var vm = this;

    //------------------------变量声明开始------------------------------//
    // 提交后端model模型
    vm.detailModel = {};
    // 分页参数

    //------------------------变量声明结束------------------------------//
    

    //------------------------方法声明开始------------------------------//
    // 取消(关闭弹出框)
    vm.cancel = cancel;
    // 查询单笔订单的详细信息
    vm.queryCheckingResul = UniformMaymentService.queryCheckingResultSingleDetailService;


    //初始化数据
    init();

    //------------------------方法声明结束------------------------------//
    

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 初始化表单
        initFrom();

        // 入参
        var params = {
        	checkingSystemId:row.checkingSystemId,
            transactionId:row.transactionId
        };
        // 服务通讯
        vm.queryCheckingResul(params).then(function(data) {
           vm.detailModel={
	            'amount': data.amount,
	            'currencyUomId': data.currencyUomId,
	            'payerAccountName': data.payerAccountName,
	            'payerAccountNumber': data.payerAccountNumber,
	            'payerPaymentMethodType': data.payerPaymentMethodType,
	            'payeeAccountName': data.payeeAccountName,
	            'payeeAccountNumber': data.payeeAccountNumber,
	            'payeePaymentMethodType': data.payeePaymentMethodType,
	            'statusId': data.statusId
	        };
        }).catch(function(err) {
            toastr.error(err.message);
        });

        
    }

    // 取消(关闭弹出框)
    function cancel() {
        var name = ModalService.getLastModalId();
        ModalService.closeModal(name, '');
    }


    function initFrom(){
            vm.detailSchema = {
            'type': 'object',
            'properties': {
                'amount': {
                    'title': '订单金额',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'currencyUomId': {
                    'title': '币种',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'payerAccountName': {
                    'title': '付款人',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'payerAccountNumber': {
                    'title': '付款人账号',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'payerPaymentMethodType': {
                    'title': '付款支付工具类型',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'payeeAccountName': {
                    'title': '收款人',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'payeeAccountNumber': {
                    'title': '收款人账号',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'payeePaymentMethodType': {
                    'title': '收款支付工具类型',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'statusId': {
                    'title': '订单状态',
                    'type': 'string',
                    'format': 'hLabel'
                }
            }
        };
        vm.detailForm = [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'amount',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'currencyUomId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'payerAccountName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'payerAccountNumber',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'payerPaymentMethodType',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'payeeAccountName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'payeeAccountNumber',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }, {
            type: 'section',
             htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'payeePaymentMethodType',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }, {
            type: 'section',
             htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'statusId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }];
        
    }
};
