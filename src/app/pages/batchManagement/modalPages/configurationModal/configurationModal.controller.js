'use strict';

module.exports = function(configurationModalConstant, batchManagementService, timeFormatFilterFilter, ModalService, toastr, params, $scope,ValidationService) {
    var vm = this;
    vm.init = init;
    vm.searchConfig = searchConfig;
    vm.jobmodel = {

    };

    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };
    vm.doCtrlPagingAct = doCtrlPagingAct;
    vm.searchForm = searchForm;
    vm.checkConfig = checkConfig;
    var isAdd = true;
    init();

    function init() {
        $scope.clear = function() {
            $scope.mytime = null;
        };
        vm.hidePage1 = false;
        vm.hidePage2 = true;
        vm.configformOptions = configurationModalConstant.configformOptions;
        vm.jobformOptions = configurationModalConstant.jobformOptions;
        vm.gridformOptions = configurationModalConstant.gridformOptions;
        vm.jobschema = configurationModalConstant.jobschema;
        vm.jobform = configurationModalConstant.jobform;
        vm.jobgridOptions = configurationModalConstant.jobgridOptions;
        vm.configSchema = configurationModalConstant.configSchema;
        vm.configForm = configurationModalConstant.configForm;
        //grid
        vm.jobgridOptions.onRegisterApi = onRegisterApi;
        vm.toPage2 = toPage2;
        vm.toPage1 = toPage1;
        vm.autoReceiveSure = autoReceiveSure;
        vm.createSchedule = createSchedule;
        vm.updateSchedule = updateSchedule;
        vm.dismissModal = dismissModal;
        vm.resetAll = resetAll;
        vm.configModel = {
            systemId: params.systemId,
            scanType: '',
            frequency: ''
        };
        vm.jobmodel = {
            systemId: params.systemId,
            startTime: new Date()
        };


        if (params.scheduleId) {
            isAdd = false;
            vm.configForm[0].items[3].items[1].items[0].readonly = true;
            vm.configModel = angular.copy(params);
            vm.configModel.startTime = new Date(vm.configModel.startTime);
            vm.configModel.interval = Number(vm.configModel.interval);
        } else {
            vm.configForm[0].items[3].items[1].items[0].readonly = false;
            vm.configModel.startTime = new Date();
            vm.configModel.startTime.setHours(0);
            vm.configModel.startTime.setMinutes(0);
        }
        vm.configForm[0].items[3].items[0].items[0].timeOptions.mytime = vm.configModel.startTime;
        vm.searchForm();

    }

    function toPage1() {
        vm.hidePage1 = false;
        vm.hidePage2 = true;
    }

    function toPage2() {
        if (!vm.configModel.jobModelNum) {
            toastr.warning('请先选择作业标识');
            return;
        }
        vm.hidePage2 = false;
        vm.hidePage1 = true;
    }

    function searchForm() {
        vm.page.startIndex = 1;
        var params = angular.extend(vm.page, {
            systemId: vm.configModel.systemId
        });
        searchConfig(params);
    }

    function searchConfig(param) {
        var params = {};
        if (!param.systemId) {
            params = angular.extend(param, {
                systemId: vm.configModel.systemId
            });
        }
        params = angular.extend(param, vm.jobmodel, {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        });
        batchManagementService.queryBatchJobConfig(params)
            .then(function(data) {
                vm.jobgridOptions.data = data.jobModelList;
                vm.page.total = data.totalSize;
            }).catch(function(err) {
                toastr.error(err.message);
            });
    }

    function doCtrlPagingAct(page, pageSize, total) {
        var param = {
            'startIndex': page,
            'pageSize': pageSize
        };
        if (page === 1) {
            vm.page = param;
        }
        vm.searchConfig(param);
    }

    function resetAll() {
        //重置作业查询表单
        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        vm.jobmodel = {
            systemId: params.systemId,
            startTime: new Date()
        };
        vm.searchForm();
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.checkConfig = function(row) {
            var item = row.entity;
            vm.configModel.jobModelNum = item.jobModelNum;
        };

        gridApi.grid.appScope.ischeckedConfig = function(row) {
            var item = row.entity;
            if (item.jobModelNum === vm.configModel.jobModelNum) {
                return true;
            } else {
                return false;
            }
        }
    }

    function checkConfig(item) {
        vm.configModel.jobModelNum = item.jobModelNum;
        vm.toPage2();
    }

    function closeModal(value) {
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId, value);
    }

    function dismissModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    function createSchedule() {
        vm.configModel.startTime.setHours(vm.configForm[0].items[3].items[0].items[0].timeOptions.mytime.getHours());
        vm.configModel.startTime.setMinutes(vm.configForm[0].items[3].items[0].items[0].timeOptions.mytime.getMinutes());
        var params = angular.extend({}, vm.configModel);
        params.interval = String(params.interval);
        params.startTime = timeFormatFilterFilter(params.startTime, 'YYYY/MM/DD HH:mm:ss');
        batchManagementService.createSchedule(params).then(function(data) {
            toastr.success('新增配置成功');
            closeModal();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function updateSchedule() {
        var params = angular.extend({}, vm.configModel);
        vm.configModel.startTime.setHours(vm.configForm[0].items[3].items[0].items[0].timeOptions.mytime.getHours());
        vm.configModel.startTime.setMinutes(vm.configForm[0].items[3].items[0].items[0].timeOptions.mytime.getMinutes());
        params.startTime = timeFormatFilterFilter(params.startTime, 'YYYY/MM/DD HH:mm:ss');
        params.interval = String(params.interval);
        batchManagementService.updateSchedule(params).then(function(data) {
            toastr.success('编辑配置成功');
            closeModal();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }


    function autoReceiveSure(param,ngForm) {
        var tempModelInfo = angular.copy(vm.configModel);
        if (!checkInput(tempModelInfo,ngForm)) {
            return;
        }
        if (isAdd) {
            vm.createSchedule();
        } else {
            vm.updateSchedule();
        }
    }

    function checkInput(param,ngForm) {
        ValidationService.validate(ngForm);
        if (!param.scheduleName) {
            toastr.warning('请输入定时名称');
            return false;
        }
        if (!param.scanType) {
            toastr.warning('请选择执行类型');
            return false;
        }
        if (!param.frequency) {
            toastr.warning('请选择执行频率');
            return false;
        }
        if (!param.startTime) {
            toastr.warning('请选择执行起始时间');
            return false;
        } else if (!vm.configForm[0].items[3].items[0].items[0].timeOptions.mytime) {
            toastr.warning('请为执行起始时间选择分和秒');
            return false;
        }
        if (!param.runByInstanceId) {
            toastr.warning('请输入执行实例ID');
            return false;

        } else if (!ValidationService.containIntChar(param.runByInstanceId)) {
            toastr.warning('执行实例ID为数字、字母');
            return false;
        }

        return true;
    }
};
