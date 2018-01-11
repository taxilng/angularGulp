'use strict';

module.exports = function($rootScope, $scope, UniformMaymentService, RequestCheckingViewConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, ValidationService, CommonService) {
    var vm = this;

    // 提交后端model模型
    vm.model = {
        checkingBeginDate: new Date(),
        dataSource: '' 
    };

    //------------------------变量声明开始------------------------------//
    // 对账系统查询
    vm.checkingSystemList = [];

    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
    // 对账方法
    vm.requestChecking = requestChecking;
    // 对账函数服务
    vm.requestCheckingRequest = UniformMaymentService.requestCheckingRequest;
    // 重置
    vm.resetAll = resetAll;
    // 对账系统查询
    vm.queryCheckingSystemServiceRequest = UniformMaymentService.queryCheckingSystemService;
    vm.search = search;
    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    function search() {
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
    }
    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = RequestCheckingViewConstant.formPanelOptions;
        // 表单头部
        vm.schema = RequestCheckingViewConstant.investSchema;
        // 表单输入
        vm.form = RequestCheckingViewConstant.investFormOptions;
        // 服务通讯

        vm.search();
        // 查询所有需对账的系统ID和名称
        vm.schema.properties.dataSource.titleMap = vm.checkingSystemList;
    }

    // 重置方法
    function resetAll() {
        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };

        // 清空下拉框
        var clearArr = ['--请选择--'];
        CommonService.clearSelectText(clearArr);

        vm.model = {
            checkingBeginDate: new Date(),
            dataSource: ''
        };
        search();
    }

    // 输入校验
    function checkInput(params) {
        if (!params.dataSource) {
            toastr.warning('请选择对账系统！');
            return false;
        }

        if (!params.checkingBeginDate) {
            toastr.warning('请选择对账日期！');
            return false;
        }
        
        return true;
    }

    // 对账方法
    function requestChecking(param) {
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        // 输入校验
        if (!checkInput(params)) {
            return
        }

        // 时间转换
        if (params.checkingBeginDate) {
            params.checkingBeginDate = ValidationService.formatDateTime(timeFormatFilterFilter(params.checkingBeginDate, 'YYYYMMDD'));
            // 格式为：YYYY-MM-DD 如果是当天对账，和对账起始日期相同
            params.checkingEndDate = params.checkingBeginDate;
        }


        // 服务通讯
        vm.requestCheckingRequest(params).then(function(data) {
            $ngBootbox.alert('日终对账成功');
            return;
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }
};
