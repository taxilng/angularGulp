'use strict';
var _ = require('lodash');

module.exports = function(ModalService, row, $scope, toastr, titleMapFilterFilter, timeFormatFilterFilter, TaskCreateRoleConstant, BatchManagementService, ValidationService) {
    var vm = this;
    // 提交后端model模型
    vm.model = {};
    vm.configmodel = {};

    //------------------------变量声明开始------------------------------//


    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//

    //初始化数据
    init();

    // 关闭
    vm.cancel = cancel;
    // 基本信息-添加
    vm.addParametes = addParametes;
    // 基本信息-创建
    vm.manualJobsTask = manualJobsTask;
    vm.resetConfig = resetConfig;
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = TaskCreateRoleConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = TaskCreateRoleConstant.gridPanelOptions;
        // 表单头部
        vm.schema = TaskCreateRoleConstant.investSchema;
        // 表单输入
        vm.form = TaskCreateRoleConstant.investFormOptions;

        //参数配置表格configform
        vm.configform = TaskCreateRoleConstant.configFormOptions;

        vm.configschema = TaskCreateRoleConstant.configSchemaOptions;

        // 表格
        vm.gridOptions = angular.copy(TaskCreateRoleConstant.investGridOptions);

        vm.model = {
            'jobModelNum': row.entity.jobModelNum,
            'taskName': row.entity.jobModelName
        };
    }

    function resetConfig() {
        vm.configmodel = {};
    }
    // 关闭
    function cancel() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    // 基本信息-添加
    function addParametes(ngForm) {
        // 参数标识
        var paraUp = vm.configmodel.paraUp;
        var paraValue = vm.configmodel.paraValue;
        // var runByInstanceId = vm.model.runByInstanceId; //执行实例ID
        // var runTime = vm.model.runTime; //计划执行时间
        // 非空校验
        // ValidationService.validate(ngForm);

        if (!paraUp) {
            toastr.warning('请输入参数标识');
            return false;
        } else {
            if (!ValidationService.isIntChar(paraUp)) {
                toastr.warning('参数标识为数字、字母');
                return false;
            }
        }

        if (!paraValue) {
            toastr.warning('请输入参数值');
            return false;
        } else {
            if (!ValidationService.isIntChar(paraValue)) {
                toastr.warning('参数值为数字、字母');
                return false;
            }
        }


        var addRateItem = angular.copy(vm.configmodel);
        for (var i = 0; i < vm.gridOptions.data.length; i++) {
            if (vm.gridOptions.data[i].paraUp == addRateItem.paraUp) {
                toastr.warning('参数标识' + paraUp + '已经添加了,不能重复添加！');
                return false;
            }
        }

        vm.gridOptions.data.push(addRateItem);
        vm.configmodel = {};
    }

    // 基本信息-创建
    function manualJobsTask(param, ngForm) {
        // 参数标识

        // 非空校验----创建时间和实例ID
        ValidationService.validate(ngForm);

        if (!vm.model.runTime) {
            toastr.warning('请选择计划执行时间');
            return false;
        } else if (!vm.form[0].items[2].items[0].timeOptions.mytime) {
            toastr.warning('请为执行时间选择分和秒');
            return false;
        }

        if (!vm.model.runByInstanceId) {
            toastr.warning('请输入执行实例ID');
            return false;
        } else if (!ValidationService.isIntChar(vm.model.runByInstanceId)) {
            toastr.warning('执行实例ID必须是字母或数字');
            return false;
        }

        var parameter = "";
        if (vm.gridOptions.data.length > 0) {

            for (var i = 0; i < vm.gridOptions.data.length; i++) {
                var paraUp = vm.gridOptions.data[i].paraUp;
                var paraValue = vm.gridOptions.data[i].paraValue
                parameter += paraUp;
                parameter += '=';
                parameter += paraValue;
                if (i != vm.gridOptions.data.length - 1) {
                    parameter += ',';
                }
            }
        }


        var params = angular.extend(param, vm.model);

        var myTime = vm.form[0].items[2].items[0].timeOptions.mytime;
        params.runTime = timeFormatFilterFilter(params.runTime, 'YYYYMMDD') + moment(myTime).format('HHmmssSSS');
        if (parameter) {
            params.parameter = parameter;
        }

        params.systemId = row.systemId;
        // 创建作业-创建任务
        BatchManagementService.createBatchTask(params).then(function(data) {
            toastr.success('创建任务成功！');
            cancel();
        }).catch(function(error) {
            toastr.error(error.message);
        });


    }

    // 基本信息-删除
    function deleteItem(target) {
        if (_.indexOf(vm.gridOptions.data, target) > -1) {
            vm.gridOptions.data.splice(_.indexOf(vm.gridOptions.data, target), 1);
        }
    }

    // ui-grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.deleteRateItem = function(row) {
            deleteItem(row.entity);
        };

    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
    //------------------------方法定义结束------------------------------//
};
// new Date(moment().format('YYYY-MM-DD hh:mm:ss'));
