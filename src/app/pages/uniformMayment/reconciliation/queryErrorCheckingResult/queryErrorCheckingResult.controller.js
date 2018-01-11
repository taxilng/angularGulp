'use strict';

module.exports = function($rootScope, $scope, UniformMaymentService, QueryErrorCheckingResultConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, ValidationService, CommonService) {
    var vm = this;

    // 提交后端model模型
    vm.model = {
        checkingSystemId: '',
        checkingStartDate: new Date()
    };

    //------------------------变量声明开始------------------------------//
    //分页参数
    vm.page = {
        startIndex: '1',
        pageSize: '10',
        total: ''
    };

    // 对账系统查询
    vm.checkingSystemList = [];
    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//

    // 对账结果查询方法
    vm.queryCheckingRequestFun = queryCheckingRequestFun;
    // 对账结果查询服务函数
    vm.queryCheckingRequest = UniformMaymentService.checkingGroupResult;
    // 重置
    vm.resetAll = resetAll;
    // 分页方法
    vm.doCtrlPagingAct = doCtrlPagingAct;
    // 对账系统查询
    vm.queryCheckingSystemServiceRequest = UniformMaymentService.queryCheckingSystemService;
    // 继续对账指令
    vm.processCheckingService = UniformMaymentService.processCheckingService;
    // 对账函数服务
    vm.requestCheckingRequest = UniformMaymentService.requestCheckingRequest;

    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = QueryErrorCheckingResultConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = QueryErrorCheckingResultConstant.gridPanelOptions;
        // 表单头部
        vm.schema = QueryErrorCheckingResultConstant.investSchema;
        // 表单输入
        vm.form = QueryErrorCheckingResultConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(QueryErrorCheckingResultConstant.investGridOptions);

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

    // 重置方法
    function resetAll() {
        vm.page = {
            startIndex: '1',
            pageSize: '10',
            total: ''
        };
        vm.model = {
            checkingSystemId: '',
            checkingStartDate: new Date()
        };
        // 清空下拉框
        var clearArr = ['--请选择--'];
        CommonService.clearSelectText(clearArr);
        vm.gridOptions.data = [];
    }

    // 输入校验
    function checkInput(params) {
        if (!params.checkingSystemId) {
            toastr.warning('请选择对账系统！');
            return false;
        }

        return true;
    }

    // 按钮-对账结果查询方法
    function queryCheckingRequestFun(param) {
        var param = {
            startIndex: vm.page.startIndex + '',
            pageSize: vm.page.pageSize + ''
        };
        queryChecking(param);
    }

    // 对账结果查询方法
    function queryChecking(param) {
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
        vm.queryCheckingRequest(params).then(function(data) {
            if (!data.outList || data.outList.length === 0) {
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
                vm.gridOptions.data = data.outList;
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

        // 对账结果查询方法
        queryChecking(pageParams);
    };


    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 再次对账
        gridApi.grid.appScope.reChecking = function(row, flag) {
            if (flag == '0') {
                if (row == '15') {
                    return true;
                } else {
                    return false;
                }
            }


            $ngBootbox.confirm('确定要再次对账' + row.entity.checkingSystemName + '么？').then(function() {
                var params = {
                    dataSource: row.entity.checkingSystemId,
                    checkingBeginDate: row.entity.checkingDate
                }

                // 服务通讯
                vm.requestCheckingRequest(params).then(function(data) {
                    toastr.success("继续对账成功！");
                    vm.queryCheckingRequestFun({})
                    return;
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };

        // 继续对账
        gridApi.grid.appScope.checking = function(row, flag) {
            if (flag == '1') {
                if (row != '15') {
                    return true;
                } else {
                    return false;
                }
            }

            $ngBootbox.confirm('确定要继续对账' + row.entity.checkingSystemName + '么？').then(function() {
                // 入参
                var params = {
                    checkingGroupId: row.entity.checkingGroupId,
                    dataSource: row.entity.checkingSystemId.split("_")[0],
                    checkingBeginDate: row.entity.checkingStartDate
                };

                // 服务通讯
                vm.processCheckingService(params).then(function(data) {
                    toastr.success("继续对账成功！");
                }).catch(function(err) {
                    toastr.error(err.message);
                });

            }, function() {});

        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
