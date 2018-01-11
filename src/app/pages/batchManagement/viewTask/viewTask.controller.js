'use strict';

var stepModal = require('../modalPages/stepModal');
module.exports = function(viewTaskConstant, toastr, $ngBootbox, timeFormatFilterFilter, modalService, eventBusService, batchManagementService, validationService, CommonService) {
    var vm = this;
    vm.init = init;
    vm.startDate = window.moment().add(-3, 'M')['_d'];

    vm.page = {
        startIndex: '1',
        pageSize: '5',
        total: ''
    };


    vm.resetAll = resetAll;
    // 分页方法
    vm.doCtrlPagingAct = doCtrlPagingAct;

    vm.searchViewTask = searchViewTask;

    vm.searchInfo = searchInfo;

    init();

    function init() {
        //查询面板
        vm.formPanelOptions = viewTaskConstant.formPanelOptions;

        vm.gridPanelOptions = viewTaskConstant.gridPanelOptions;

        vm.schema = viewTaskConstant.investSchema;

        vm.form = viewTaskConstant.investFormOptions;

        vm.gridOptions = angular.copy(viewTaskConstant.gridOptions);

        vm.model = {
            startTime: vm.startDate,
            endTime: new Date(),
            'state': '',
            'systemId': 'eas'
        };

        vm.searchViewTask(vm.page);
    }

    function checkInput() {
        return true;
    }


    /**
     * 查询按钮触发
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    function searchInfo(param) {
        vm.page.startIndex = '1';
        vm.searchViewTask(vm.page);
    }


    function checkInput(params) {
        if (params.startTime && params.endTime) {
            if (!validationService.compareTwoDate(params.startTime, params.endTime, '起始日期', '截止日期')) {
                return false;
            }
        }
        return true;
    }

    function searchViewTask(param) {

        var pageInfo = {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        };


        var params = angular.extend({}, vm.model, pageInfo, {
            systemId: 'eas'
        });

        //输入校验
        if (!checkInput(params)) {
            return;
        }
        // 开始时间
        params.startTime = timeFormatFilterFilter(params.startTime, 'YYYY-MM-DD HH:mm:ss');
        // 结束时间
        params.endTime = timeFormatFilterFilter(params.endTime, 'YYYY-MM-DD HH:mm:ss');

        if (params.refPayNo) {
            params.refPayNo = String(params.refPayNo);
        }
        if (!checkInput(params)) {
            return;
        }
        batchManagementService.queryBatchTaskInfo(params).then(function(data) {
            if (!data.jobList || data.jobList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            }
            vm.page.total = data.totalSize;
            vm.gridOptions.data = data.jobList;
        }).catch(function(error) {
            toastr.error(error.message);
        });

    }

    function resetAll() {
        vm.page = {
            startIndex: '1',
            pageSize: '10',
            total: ''
        };
        vm.model = {
            startTime: vm.startDate,
            endTime: new Date(),
            'systemId': 'eas'
        };

        // 清空下拉框
        var clearArr = ['--请选择--', '大钱包'];
        CommonService.clearSelectText(clearArr);

        vm.gridOptions.data = [];
        vm.searchViewTask(vm.page);
    }

    function doCtrlPagingAct(page, pageSize, total) {
        var param = {
            'startIndex': page,
            'pageSize': pageSize
        };
        if (page === 1) {
            vm.page = param;
        }
        searchViewTask(param);
    };

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        //配置步骤
        gridApi.grid.appScope.checkStep = function(row) {
            var params = {
                jobId: row.entity.jobId,
                systemId: vm.model.systemId
            };
            // var param = angular.extend(params, {
            //     systemId: vm.model.systemId
            // });
            modalService.showModal({
                modalId: 'stepModal',
                template: stepModal.html,
                modalTitle: '配置任务步骤',
                controller: ['StepModalConstant', 'ModalService', 'toastr', 'params', 'BatchManagementService', stepModal.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    params: params
                }
            }).result.then(function(data) {
                queryScheduleRequestFun();
            });
        };

        //错误信息
        gridApi.grid.appScope.errorInfo = function(row) {
            var params = row.entity.message;
            var options = {
                message: row.entity.message,
                title: '错误信息',
                className: 'test-class',
                buttons: {
                    success: {
                        label: "关闭",
                        className: "btn-primary"
                    }
                }
            };
            $ngBootbox.customDialog(options);
        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
