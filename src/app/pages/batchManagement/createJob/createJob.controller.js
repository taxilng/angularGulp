'use strict';

var taskCreateModal = require('../modalPages/taskCreateModal');

module.exports = function($rootScope, $scope, toastr, $ngBootbox, timeFormatFilterFilter, ModalService, EventBusService, CreateJobConstant, BatchManagementService, ValidationService, CommonService) {
    var vm = this;
    // 提交后端model模型
    vm.model = {
        systemId: 'eas'
    };

    //------------------------变量声明开始------------------------------//
    vm.page = {
        startIndex: '1',
        pageSize: '5',
        total: ''
    };

    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
    //初始化数据
    init();
    // 创建作业-查询--按钮查询
    vm.buttonQuerySchedule = buttonQuerySchedule;
    // 分页方法
    vm.doCtrlPagingAct = doCtrlPagingAct;
    // 重置
    vm.resetAll = resetAll;
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = CreateJobConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = CreateJobConstant.gridPanelOptions;
        // 表单头部
        vm.schema = CreateJobConstant.investSchema;
        // 表单输入
        vm.form = CreateJobConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(CreateJobConstant.investGridOptions);

        // 创建作业-查询--按钮查询
        buttonQuerySchedule();
    }

    // 创建作业-查询--按钮查询
    function buttonQuerySchedule() {
        vm.page.startIndex = 1;
        var param = {
            startIndex: vm.page.startIndex + '',
            pageSize: vm.page.pageSize + ''
        };

        // 创建作业-查询
        queryScheduleRequestFun(param);
    }

    // 创建作业-查询
    function queryScheduleRequestFun(param) {
        var params = angular.extend(param, vm.model);

        BatchManagementService.queryBatchJobConfig(params).then(function(data) {
            // 清空表格
            vm.gridOptions.data = [];
            if (!data.jobModelList || data.jobModelList.length === 0) {
                vm.gridOptions.data = [];
                $ngBootbox.alert('未查到相关数据');
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.jobModelList;
            }
        }).catch(function(error) {
            toastr.error(error.message);
        });
    }

    // 分页回调
    function doCtrlPagingAct(page, pageSize, total) {
        var param = {
            'startIndex': page + '',
            'pageSize': pageSize + ''
        };
        if (page === 1) {
            vm.page = param;
        }
        queryScheduleRequestFun(param);
    };

    // 重置
    function resetAll() {
        vm.page = {
            startIndex: '1',
            pageSize: '10',
            total: ''
        };

        vm.model = {
            'systemId': 'eas'
        };

        // 清空下拉框
        var clearArr = ['大钱包'];
        CommonService.clearSelectText(clearArr);

        vm.gridOptions.data = [];
        buttonQuerySchedule();
    }

    // grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 查看详情
        gridApi.grid.appScope.task_create = function(row) {
            row.systemId = vm.model.systemId;
            ModalService.showModal({
                modalId: 'taskCreateModal',
                modalTitle: '创建任务',
                template: taskCreateModal.html,
                controller: ['ModalService', 'row', '$scope', 'toastr', 'titleMapFilterFilter', 'timeFormatFilterFilter', 'TaskCreateRoleConstant', 'BatchManagementService', 'ValidationService',taskCreateModal.controller],
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
// new Date(moment().format('YYYY-MM-DD hh:mm:ss'));
