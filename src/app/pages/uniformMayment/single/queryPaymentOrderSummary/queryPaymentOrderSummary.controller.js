'use strict';

module.exports = function($rootScope, $scope, UniformMaymentService, QueryPaymentOrderSummaryConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, ObjectDataConstant, ValidationService, CommonService) {
    var vm = this;

    // 提交后端model模型
    // 开始时间比当前时间晚三个月
    vm.startDate = window.moment().add(-3, 'M')['_d'];
    // 初始化开始时间与结束时间
    vm.model = {
        startDateTime: vm.startDate,
        endDateTime: new Date(),
        checkingSystemId: '',
        oldMedium: '',
        orderTypeId: ''
    };

    //------------------------变量声明开始------------------------------//
    vm.page = {
        startIndex: '1',
        pageSize: '10',
        total: ''
    };
    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
    // 重置
    vm.resetAll = resetAll;
    // 分页方法
    vm.doCtrlPagingAct = doCtrlPagingAct;
    // 单笔/批量订单概要查询
    vm.queryPaymentOrderRequestFun = queryPaymentOrderRequestFun;
    // 单笔/批量订单概要查询函数服务
    vm.queryPaymentOrderSummaryRequest = UniformMaymentService.queryPaymentOrderSummary;
    // 订单类型选中事件
    vm.checkingSystemIdOnChange = checkingSystemIdOnChange;
    // 支付订单红冲
    vm.cancelPaymentOrder = UniformMaymentService.cancelPaymentOrder;
    // 执行订单收付款
    vm.processPaymentOrderReceivePayment = UniformMaymentService.processPaymentOrderReceivePayment;

    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = QueryPaymentOrderSummaryConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = QueryPaymentOrderSummaryConstant.gridPanelOptions;
        // 表单头部
        vm.schema = QueryPaymentOrderSummaryConstant.investSchema;
        // 表单输入
        vm.form = QueryPaymentOrderSummaryConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(QueryPaymentOrderSummaryConstant.investGridOptions);
    }

    // 重置方法
    function resetAll() {
        vm.page = {
            startIndex: '1',
            pageSize: '10',
            total: ''
        };
        vm.model = {
            startDateTime: vm.startDate,
            endDateTime: new Date()
        };

        // 清空下拉框
        var clearArr = ['--请选择--', '--请选择--', '--请选择--'];
        CommonService.clearSelectText(clearArr);
        vm.gridOptions.data = [];
        vm.form[0].items[1].items[0].objectData = [];
    }

    // 订单类型选中事件
    function checkingSystemIdOnChange(modelValue) {
        if (modelValue == "0") {
            vm.form[0].items[1].items[0].objectData = ObjectDataConstant.tranStatus0;
        } else if (modelValue == "2") {
            vm.form[0].items[1].items[0].objectData = ObjectDataConstant.tranStatus2;
        } else {
            vm.form[0].items[1].items[0].objectData = [];
            // vm.form[0].items[4].htmlClass += " hide";
        }
    }

    // 输入校验
    function checkInput(params) {
        if (!params.checkingSystemId) {
            toastr.warning('请选择订单类型！');
            return false;
        }

        if (!params.startDateTime) {
            toastr.warning('请选择起始日期！');
            return false;
        }

        if (!params.endDateTime) {
            toastr.warning('请选择截止日期！');
            return false;
        }

        if (!ValidationService.compareTwoDate(params.startDateTime, params.endDateTime, '起始日期', '截止日期')) {
            return false;
        }
        return true;
    }

    // 按钮查询
    function queryPaymentOrderRequestFun(param) {
        var param = {
            startIndex: vm.page.startIndex + '',
            pageSize: vm.page.pageSize + ''
        };
        queryPaymentOrderSummary(param);
    }

    // 单笔/批量订单概要查询
    function queryPaymentOrderSummary(param) {
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        // 输入校验
        if (!checkInput(params)) {
            return
        }

        // 时间转换
        if (params.startDateTime) {
            params.startDateTime = timeFormatFilterFilter(params.startDateTime, 'YYYYMMDD');
        }

        if (params.endDateTime) {
            params.endDateTime = timeFormatFilterFilter(params.endDateTime, 'YYYYMMDD');
        }

        if (params.payerAccountNumber) {
            params.payerAccountNumber = String(params.payerAccountNumber);
        }

        // 订单类型
        if (vm.form[0].items[1].items[0].outObjectData.length) {
            var statusIdString = '';
            var statusIdList = vm.form[0].items[1].items[0].outObjectData;
            for (var i = 0; i < statusIdList.length; i++) {
                if (i == 0) {
                    statusIdString = statusIdString + statusIdList[i].value;
                } else {
                    statusIdString = statusIdString + "," + statusIdList[i].value;
                }
            }
            params.statusId = statusIdString;
        }

        // 服务通讯
        vm.queryPaymentOrderSummaryRequest(params).then(function(data) {
            if (!data.paymentOrderList || data.paymentOrderList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.paymentOrderList;
            }
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    //分页回掉函数
    function doCtrlPagingAct(page, pageSize, total) {
        var pageParams = {
            startIndex: page + '',
            pageSize: pageSize + ''
        };

        if (page === 1) {
            vm.page = pageParams;
        }

        // 单笔/批量订单概要查询
        queryPaymentOrderSummary(pageParams);
    }


    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 订单收付款
        gridApi.grid.appScope.processReceivePayment = function(row) {

            $ngBootbox.confirm('确定要处理此笔业务么？').then(function() {
                // 入参
                var params = {
                    orderId: row.entity.orderId
                };
                // 服务通讯
                vm.processPaymentOrderReceivePayment(params).then(function(data) {
                    toastr.success('订单收付款成功');
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };

        // 订单冲正
        gridApi.grid.appScope.cancelPaymentOrder = function(row) {
            $ngBootbox.confirm('确定要处理此笔业务么？').then(function() {
                // 入参
                var params = {
                    orderId: row.entity.orderId,
                    returnHeaderTypeId: 'RETURN_ALL'
                };
                // 服务通讯
                vm.cancelPaymentOrder(params).then(function(data) {
                    toastr.success('订单冲正成功');
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };

        // 订单收付款按钮
        gridApi.grid.appScope.processReceivePaymentShow = function(recomInfo) {
            if (recomInfo == "CHECK_NOT_COMPLETED" || recomInfo == "ORDER_COMPLETED" || recomInfo == "PAY_CANCELLING" || recomInfo == "RECEIVE_CANCELING" || recomInfo == "ORDER_CANCELED" || recomInfo == "ORDER_PRE_AUTHING") {
                return false;
            } else {
                return true;
            }

        };

        // 订单冲正按钮
        gridApi.grid.appScope.cancelPaymentOrderShow = function(recomInfo) {
            if (recomInfo == "ORDER_CANCELED" || recomInfo == "ORDER_PRE_AUTHING") {
                return false;
            } else {
                return true;
            }
        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
