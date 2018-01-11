'use strict';

var queryCheckingGroupViewDetail = require('../../modalPages/queryCheckingGroupViewDetail');

module.exports = function($rootScope, $scope, UniformMaymentService, QueryCheckingGroupViewConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, ValidationService, CommonService) {
    var vm = this;
    // 提交后端model模型
    vm.model = {
        checkingSystemId: '',
        isAll: '',
        checkingStartDate: new Date()
    };

    //------------------------变量声明开始------------------------------//
    vm.page = {
        startIndex: '1',
        pageSize: '10',
        total: ''
    };

    // 对账系统查询
    vm.checkingSystemList = [];

    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
    // 对账差错结果查询
    vm.searchErrorCheckingResultFun = searchErrorCheckingResultFun;
    // 重置
    vm.resetAll = resetAll;
    // 分页方法
    vm.doCtrlPagingAct = doCtrlPagingAct;
    // 对账结果明细查询函数
    vm.searchErrorChecking = UniformMaymentService.searchErrorCheckingResult;
    // 对账系统查询
    vm.queryCheckingSystemServiceRequest = UniformMaymentService.queryCheckingSystemService;
    // 处理
    vm.handleSetInfo = handleSetInfo;
    // 查看详情
    vm.detail = detail;
    // 对账单笔差错处理
    vm.handleSetInfoRequest = UniformMaymentService.checkingSingleErrHandleService;
    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = QueryCheckingGroupViewConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = QueryCheckingGroupViewConstant.gridPanelOptions;
        // 表单头部
        vm.schema = QueryCheckingGroupViewConstant.investSchema;
        // 表单输入
        vm.form = QueryCheckingGroupViewConstant.investFormOptions;
        // 表格
        // vm.gridOptions = angular.copy(QueryCheckingGroupViewConstant.investGridOptions);

        // 服务通讯
        vm.queryCheckingSystemServiceRequest({}).then(function(data) {
            if (!data.outList || data.outList.length === 0) {
                vm.checkingSystemList.push({
                    name: '查询无记录',
                    value: ''
                });
                return;
            } else {
                vm.checkingSystemList.push({
                    name: '--请选择--',
                    value: ''
                });
                for (var i = 0; i < data.outList.length; i++) {
                    vm.checkingSystemList.push({
                        name: data.outList[i].resultMap.dataSourceName,
                        value: data.outList[i].resultMap.dataSource
                    });
                }
            }
        }).catch(function(err) {
            toastr.error(err.message);
        });

        // 查询所有需对账的系统ID和名称
        vm.schema.properties.checkingSystemId.titleMap = vm.checkingSystemList;
    }

    // 输入校验
    function checkInput(params) {
        if (!params.checkingSystemId) {
            toastr.warning('请选择对账系统！');
            return false;
        }

        if (!params.isAll) {
            toastr.warning('请选择状态！');
            return false;
        }

        if (!params.checkingStartDate) {
            toastr.warning('请选择对账日期！');
            return false;
        }
        return true;
    }

    // 按钮-对账差错结果查询
    function searchErrorCheckingResultFun(param) {
        var param = {
            startIndex: vm.page.startIndex + '',
            pageSize: vm.page.pageSize + ''
        };

        // 对账差错结果查询
        searchErrorCheckingResult(param);

    }

    /**
     * 对账差错结果查询
     */
    function searchErrorCheckingResult(param) {
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        // 输入校验
        if (!checkInput(params)) {
            return
        }

        // 时间转换
        if (params.checkingStartDate) {
            params.checkingStartDate = ValidationService.formatDateTime(timeFormatFilterFilter(params.checkingStartDate, 'YYYYMMDD'));
        }


        // 服务通讯
        vm.searchErrorChecking(params).then(function(data) {
            if (!data.outList || data.outList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            } else {


                vm.page.total = data.totalSize;

                for (var i = 0; i < data.outList.length; i++) {
                    var adjustIdMap = {};
                    var adjustId = data.outList[i].adjustId.split("|");
                    var adjustName = data.outList[i].adjustName.split("|");
                    if (adjustId.length && adjustId.length > 0) {
                        for (var j = 0; j < adjustId.length; j++) {
                            adjustIdMap[adjustId[j]] = adjustName[j];
                        }
                    }
                    data.outList[i].adjustIdMap = adjustIdMap;
                }

                vm.gridOptions = data.outList;

            }
        }).catch(function(err) {
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

        // 对账差错结果查询
        searchErrorCheckingResult(pageParams);
    }

    // 重置方法
    function resetAll() {
        vm.page = {
            startIndex: '1',
            pageSize: '5',
            total: ''
        };

        // 清空下拉框
        var clearArr = ['--请选择--', '--请选择--'];
        CommonService.clearSelectText(clearArr,2);

        vm.model = {
            checkingSystemId: '',
            isAll: '',
            checkingStartDate: new Date()
        };
        vm.gridOptions = [];
        vm.page = {
            'startIndex': 1,
            'pageSize': 5,
            'total': 0
        };
    }

    // 处理订单状态
    function handleSetInfo(item, selectObj) {
        if (ValidationService.isEmpty(selectObj)) {
            toastr.warning('请选择处理方式！');
            return false;
        }


        $ngBootbox.confirm('确定要处理' + item.statusId + '业务么？').then(function() {
            // 入参
            var params = {
                checkingSystemId: item.checkingSystemId,
                checkingID: item.checkingID,
                transactionId: item.transactionId,
                checkingItemId: item.checkingItemId,
                amount: item.amount,
                adjustId: selectObj
            };

            // 服务通讯
            vm.handleSetInfoRequest(params).then(function(data) {
                toastr.success('处理订单成功！');
                vm.searchErrorCheckingResultFun({});
            }).catch(function(err) {
                toastr.error(err.message);
            });
        }, function() {});


    }

    // 查看详情
    function detail(row) {
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
    }

    //------------------------方法定义结束------------------------------//
};
