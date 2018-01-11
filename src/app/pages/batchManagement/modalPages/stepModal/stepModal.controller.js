'use strict';
var jobOperateModal = require('../../modalPages/jobOperateModal');
var stepdataModal = require('../../modalPages/stepdataModal');
module.exports = function(stepModalConstant, ModalService, toastr, params, batchManagementService) {
    var vm = this;
    vm.init = init;

    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };
    vm.doCtrlPagingAct = doCtrlPagingAct;

    vm.stopJob = stopJob;
    vm.continueJob = continueJob;
    vm.skipJob = skipJob;
    vm.dismissModal = dismissModal;
    init();

    function init() {
        vm.panelBanseInfoOptions = stepModalConstant.panelBanseInfoOptions;
        vm.gridOptions = stepModalConstant.gridOptions;
        //根据jobId查询步骤列表
        vm.jobModel = {
            systemId: params.systemId,
            jobId: params.jobId
        };
        queryBatchTaskSteps(vm.page);
    }

    function queryBatchTaskSteps(param) {
        var params = angular.extend({}, vm.jobModel, {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        });
        batchManagementService.queryBatchTaskSteps(params)
            .then(function(data) {
                vm.gridOptions.data = data.jobStepList;
                vm.page.total = data.totalSize;
            }).catch(function(err) {
                toastr.error(err.message);
            });
    }

    function doCtrlPagingAct() {
        var param = {
            'startIndex': page,
            'pageSize': pageSize
        };
        if (page === 1) {
            vm.page = param;
        }
        queryBatchTaskSteps(param);
    }

    //终止
    function stopJob() {
        var params = angular.extend(vm.jobModel, {
            'opr': 'suspendTask'
        });
        ModalService.showModal({
            modalId: 'jobOperateModal',
            template: jobOperateModal.html,
            modalTitle: '终止任务',
            controller: ['ModalService', 'toastr', 'params', 'BatchManagementService', jobOperateModal.controller],
            controllerAs: 'vm',
            size: 'md',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            queryBatchTaskSteps();
        });
    }

    //续作
    function continueJob() {
        var params = angular.extend(vm.jobModel, {
            'opr': 'continueTask'
        });
        ModalService.showModal({
            modalId: 'jobOperateModal',
            template: jobOperateModal.html,
            modalTitle: '续做任务',
            controller: ['ModalService', 'toastr', 'params', 'BatchManagementService', jobOperateModal.controller],
            controllerAs: 'vm',
            size: 'md',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            queryBatchTaskSteps();
        });
    }

    //跳过
    function skipJob() {
        var params = angular.extend(vm.jobModel, {
            'opr': 'skipFailStep'
        });
        ModalService.showModal({
            modalId: 'jobOperateModal',
            template: jobOperateModal.html,
            modalTitle: '跳过任务',
            controller: ['ModalService', 'toastr', 'params', 'BatchManagementService', jobOperateModal.controller],
            controllerAs: 'vm',
            size: 'md',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            queryBatchTaskSteps();
        });
    }

    function dismissModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;
        gridApi.grid.appScope.checkDataList = function(row) {
            var item = row.entity;
            var params = {
                systemId:vm.jobModel.systemId,
                stepId:row.entity.stepId
            };
            ModalService.showModal({
                modalId: 'stepdataModal',
                template: stepdataModal.html,
                modalTitle: '查看数据',
                controller: ['ModalService', 'toastr', 'params', 'BatchManagementService', stepdataModal.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    params: params
                }
            }).result.then(function(data) {
            });
        };

        gridApi.grid.appScope.stepDetail = function(row) {
            var item = row.entity;
        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
