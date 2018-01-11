'use strict';

var investPlanConfigModal = require('../investPlanConfigModal');
var investPlanConfigDetailModal = require('../investPlanConfigDetailModal');

module.exports = function(
    investPlanConfigService,
    ModalService,
    investPlanConfigConstant,
    toastr,
    $ngBootbox,
    CommonService
) {
    var vm = this;

    vm.model = {};

    //------------------------方法声明开始------------------------------//
    vm.init = init;

    vm.search = queryPlanConfig; //
    vm.resetAll = resetAll; // 重置

    vm.queryPlanConfig = queryPlanConfig; // 查询方案推荐规则列表
    vm.updatePlanConfig = updatePlanConfig; // 方案推荐规则修改
    vm.prodConfigDetail = prodConfigDetail; // 查询方案推荐规则详情
    vm.deletePlanConfig = deletePlanConfig; // 方案推荐规则删除

    vm.gridOptions = investPlanConfigConstant.investGridOptions;
    vm.gridOptions.onRegisterApi = onRegisterApi;

    init();

    function init() {
        //查询面板
        vm.formPanelOptions = investPlanConfigConstant.formPanelOptions;
        //查询结果面板
        vm.gridPanelOptions = investPlanConfigConstant.gridPanelOptions;
        //查询表单
        vm.form = investPlanConfigConstant.investFormOptions;

        vm.schema = investPlanConfigConstant.investSchema;

        //表格
        vm.gridOptions = angular.copy(investPlanConfigConstant.investGridOptions);

        // queryPlanConfig();
    }


    function checkInput(params) {
        return true;
    }

    // 查询方案推荐规则列表
    function queryPlanConfig() {
        vm.model.period = vm.model.period || '';
        vm.model.riskLevel = vm.model.riskLevel || '';

        vm.gridOptions.data = [];
        
        var params = {
            planId: vm.model.planId,
            planName: vm.model.planName
        };

        params.investmentCond = (vm.model.period || vm.model.riskLevel)? (vm.model.period + vm.model.riskLevel): undefined;

        //输入校验
        if (!checkInput(params)) {
            return;
        }

        investPlanConfigService.selectPlanConfig(params).then(function(data) {

            vm.gridOptions.data = data.prodPlanConfigList;
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function resetAll() {
        vm.model = {};

        var clearArr = ['--请选择--','--请选择--','--请选择--','--请选择--'];
        CommonService.clearSelectText(clearArr);
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.updatePlanConfig = function(row) {
            var item = row.entity;
            vm.updatePlanConfig(item);
        };

        gridApi.grid.appScope.deletePlanConfig = function(row) {
            var item = row.entity;
            $ngBootbox.confirm('确定删除该投资方案推荐规则吗？').then(function(){
                vm.deletePlanConfig(item);
            },function(){})

        };

        gridApi.grid.appScope.prodConfigDetail = function(row) {
            var item = row.entity;
            vm.prodConfigDetail(item);
        };
    }

    // 查看方案推荐规则详情
    function prodConfigDetail(params) {
        ModalService.showModal({
            modalId: 'investPlanConfigDetailModal',
            template: investPlanConfigDetailModal.html,
            modalTitle: '投资方案推荐规则详情',
            controller: [
                'params',
                'toastr',
                'ModalService',
                'InvestPlanConfigService',
                investPlanConfigDetailModal.controller
            ],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        });
    }

    //方案推荐规则修改
    function updatePlanConfig(params) {
        ModalService.showModal({
            modalId: 'investPlanConfigModal',
            template: investPlanConfigModal.html,
            modalTitle: '修改投资方案推荐规则',
            controller: [
                'params',
                'toastr',
                'ModalService',
                'InvestPlanConfigService',
                'InvestPlanConfigModalConstant',
                'ValidationService',
                investPlanConfigModal.controller
            ],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            queryPlanConfig();
        });
    }

    //方案推荐规则删除
    function deletePlanConfig(params) {
        var newParams = {
            planId: params.planId
        };

        investPlanConfigService.deletePlanConfig(newParams).then(function() {
            toastr.success('删除成功');
            resetAll();
            queryPlanConfig();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

};
