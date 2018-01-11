'use strict';
var configurationModal = require('../modalPages/configurationModal');
module.exports = function($rootScope, $scope, toastr, $ngBootbox, timeFormatFilterFilter, ModalService, EventBusService, TimingConfigurationConstant, BatchManagementService, ValidationService, CommonService) {
    var vm = this;

    // 提交后端model模型
    vm.model = {
        systemId: 'eas',
        scanType: ''
    };

    vm.addConfig = addConfig;
    vm.updateConfig = updateConfig;

    //------------------------变量声明开始------------------------------//
    //分页参数
    vm.page = {
        startIndex: '1',
        pageSize: '5',
        total: ''
    };

    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
    // 定时配置-查询
    vm.searchInfo = searchInfo;

    vm.deleteConfig = deleteConfig;

    vm.resetAll = resetAll;

    vm.doCtrlPagingAct = doCtrlPagingAct;
    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = TimingConfigurationConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = TimingConfigurationConstant.gridPanelOptions;
        // 表单头部
        vm.schema = TimingConfigurationConstant.investSchema;
        // 表单输入
        vm.form = TimingConfigurationConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(TimingConfigurationConstant.investGridOptions);

        // 定时配置-查询
        queryScheduleHttpRequestFun(vm.page);
    }

    function searchInfo(param) {
        vm.page.startIndex = '1';
        queryScheduleHttpRequestFun(vm.page);
    }

    function resetAll() {
        vm.page = {
            startIndex: '1',
            pageSize: '10',
            total: ''
        };
        vm.model = {
            systemId: 'eas'
        };

        // 清空下拉框
        var clearArr = ['大钱包', '--请选择--'];
        CommonService.clearSelectText(clearArr);
        // 定时配置-查询
        queryScheduleHttpRequestFun(vm.page);
    }


    // 定时配置-查询
    function queryScheduleHttpRequestFun(param) {
        var pageInfo = {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        };
        // 入参

        var params = angular.extend({}, vm.model, pageInfo);

        if (params.scheduleId) {
            params.scheduleId = String(params.scheduleId);
        }
        // 服务通讯
        var promise = BatchManagementService.querySchedule(params);
        promise.then(function(data) {
            // 清空表格
            vm.gridOptions.data = [];
            if (!data.scheduleConfigList || data.scheduleConfigList.length === 0) {
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
                vm.gridOptions.data = data.scheduleConfigList;
            }
        }).catch(function(error) {
            toastr.error(error.message);
        });
    }


    function addConfig() {
        var params = {
            systemId: vm.model.systemId
        };
        ModalService.showModal({
            modalId: 'configurationModal',
            template: configurationModal.html,
            modalTitle: '新增定时配置',
            controller: ['ConfigurationModalConstant', 'BatchManagementService', 'timeFormatFilterFilter', 'ModalService', 'toastr', 'params','$scope','ValidationService',configurationModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            init();
        });
    }

    function updateConfig(params) {
        var param = angular.extend(params, {
            systemId: vm.model.systemId
        });
        ModalService.showModal({
            modalId: 'configurationModal',
            template: configurationModal.html,
            modalTitle: '修改定时配置',
            controller: ['ConfigurationModalConstant', 'BatchManagementService', 'timeFormatFilterFilter', 'ModalService', 'toastr', 'params','$scope','ValidationService',configurationModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            init();
        });
    }

    function deleteConfig(params) {
        $ngBootbox.confirm('确定要删除该条作业配置吗？').then(function() {
            var newParams = {
                systemId: 'eas',
                scheduleId: params.scheduleId
            };
            BatchManagementService.delSchedule(newParams).then(function(data) {
                toastr.success('删除作业配置成功');
                searchInfo();
            }).catch(function(err) {
                toastr.error(err.message);
            });
        }, function() {

        });
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;
        gridApi.grid.appScope.toUpdateScanSchedulePage = function(row) {
            var item = row.entity;
            vm.updateConfig(item);
        };

        gridApi.grid.appScope.deleteJobSchedule = function(row) {
            var item = row.entity;
            vm.deleteConfig(item);
        };
    }
    vm.gridOptions.onRegisterApi = onRegisterApi;

    function doCtrlPagingAct(page, pageSize, total) {
        var param = {
            'startIndex': page,
            'pageSize': pageSize
        };
        if (page === 1) {
            vm.page = param;
        }
        queryScheduleHttpRequestFun(param);
    }
    //------------------------方法定义结束------------------------------//
};
