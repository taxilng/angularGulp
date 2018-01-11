'use strict';

var queryCheckingGroupViewDetail = require('../../modalPages/queryCheckingGroupViewDetail');

module.exports = function($rootScope, $scope, UniformMaymentService, QueryUnknownPaymentConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, ValidationService) {
    var vm = this;

    // 提交后端model模型
    // 开始时间比当前时间晚三个月
    vm.startDate = window.moment().add(-1, 'M')['_d'];
    // 初始化开始时间与结束时间
    vm.model = {
        startDateTime: vm.startDate,
        endDateTime: new Date()
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
    // 支付订单不确定交易查询方法
    vm.sbumitQueryPOSummary = sbumitQueryPOSummary;
    // 支付订单不确定交易查询函数服务
    vm.queryPOSummaryRequest = UniformMaymentService.queryPOSummaryRequest;

    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = QueryUnknownPaymentConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = QueryUnknownPaymentConstant.gridPanelOptions;
        // 表单头部
        vm.schema = QueryUnknownPaymentConstant.investSchema;
        // 表单输入
        vm.form = QueryUnknownPaymentConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(QueryUnknownPaymentConstant.investGridOptions);
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
        vm.gridOptions.data = [];
    }


    // 输入校验
    function checkInput(params) {
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


    function sbumitQueryPOSummary(param) {
        var param = {
            startIndex: vm.page.startIndex + '',
            pageSize: vm.page.pageSize + ''
        };
        queryPOSummary(param);
    }

    // 支付订单不确定交易查询方法
    function queryPOSummary(param) {
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

        // 服务通讯
        vm.queryPOSummaryRequest(params).then(function(data) {
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

        // 支付订单不确定交易查询方法
        queryPOSummary(pageParams);
    }

    // grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 查看详情
        gridApi.grid.appScope.queryUnknownPOStatus = function(row) {
            console.log(row);
            ModalService.showModal({
                modalId: 'queryCheckingGroupViewDetail',
                modalTitle: '对账差错结果详情',
                template: queryCheckingGroupViewDetail.html,
                controller: ['ModalService', 'row', '$scope', 'toastr', 'UniformMaymentService', queryCheckingGroupViewDetail.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    row: row
                }
            });
        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
