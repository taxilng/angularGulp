'use strict';

var proxyAgreementModal = require('../proxyAgreementModal');
var proxyAgreementDetailModal = require('../proxyAgreementDetailModal');

module.exports = function(
    $scope,
    proxyAgreementService, 
    ModalService, 
    proxyAgreementConstant, 
    timeFormatFilterFilter, 
    toastr, 
    $ngBootbox, 
    CommonService
) {
    var vm = this;

    vm.model = {
        status: ''
    };

    vm.page = {
        'startIndex': '1',
        'pageSize': '5'
    };

    //------------------------方法声明开始------------------------------//
    vm.init = init;
    vm.searchAgencyAgreement = searchAgencyAgreement; // 查询代理协议列表
    vm.doCtrlPagingAct = doCtrlPagingAct; // 分页
    vm.search = search; //
    vm.resetAll = resetAll; // 重置
    vm.addAgencyAgreement = addAgencyAgreement; // 新增代理协议
    vm.editAgencyAgreement = editAgencyAgreement; // 修改代理协议
    vm.detailAgencyAgreement = detailAgencyAgreement; // 查看代理协议详情
    vm.agencyAgreementEffect = agencyAgreementEffect; // 代理协议生失效

    vm.gridOptions = proxyAgreementConstant.investGridOptions;
    vm.gridOptions.onRegisterApi = onRegisterApi;

    init();

    $scope.$watch('vm.model.endDate', function(newValue) {
        vm.form[0].items[0].items[0].dateOptions.maxDate = newValue;
    });
    $scope.$watch('vm.model.startDate', function(newValue) {
        vm.form[0].items[1].items[0].dateOptions.minDate = newValue;
    });

    function init() {
        //查询面板
        vm.formPanelOptions = proxyAgreementConstant.formPanelOptions;
        //查询结果面板
        vm.gridPanelOptions = proxyAgreementConstant.gridPanelOptions;
        //查询表单
        vm.form = proxyAgreementConstant.investFormOptions;

        vm.schema = proxyAgreementConstant.investSchema;

        //表格
        vm.gridOptions = angular.copy(proxyAgreementConstant.investGridOptions);

        vm.page.startIndex = '1';
        vm.searchAgencyAgreement(vm.page);
    }


    function checkInput(params) {
        return true;
    }

    function search() {
        vm.page.startIndex = '1';
        vm.searchAgencyAgreement(vm.page);
    }

    // 查看代理协议列表
    function searchAgencyAgreement(page) {
        var page = {
            startIndex: page.startIndex + '',
            pageSize: page.pageSize + ''
        };
        
        var params = angular.extend({}, vm.model, page);

        //输入校验
        if (!checkInput(params)) {
            return;
        }
        
        params.startDate = timeFormatFilterFilter(params.startDate, 'YYYY-MM-DD');
        params.endDate = timeFormatFilterFilter(params.endDate, 'YYYY-MM-DD');

        proxyAgreementService.queryAgencyAgreement(params).then(function(data) {
            if (!data.AgencyAgreementList || data.AgencyAgreementList.length === 0) {
                vm.gridOptions.data = [];
                $ngBootbox.alert('未查到相关数据');
            }
            vm.page.total = data.count;
            vm.gridOptions.data = data.AgencyAgreementList;
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function resetAll() {
        vm.model = {};

        // 清空下拉框
        var clearArr = ['--请选择--'];
        CommonService.clearSelectText(clearArr);

        vm.page.startIndex = '1';
        vm.searchAgencyAgreement(vm.page);
    }

    // 新增代理协议
    function addAgencyAgreement() {
        var params = null;
        ModalService.showModal({
            modalId: 'proxyAgreementModal',
            template: proxyAgreementModal.html,
            modalTitle: '新增代理协议',
            controller: [
                '$rootScope', 
                'params', 
                'toastr', 
                'ModalService', 
                'SupplierService',
                'ProxyAgreementService', 
                'ProductNameListService', 
                'ProxyAgreementModalConstant', 
                'timeFormatFilterFilter', 
                'ValidationService', 
                proxyAgreementModal.controller
            ],
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

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.editProxyInfo = function(row) {
            var item = row.entity;
            vm.editAgencyAgreement(item);
        };

        /**
         * 使某条协议生效/失效
         * @param  {[type]} row [description]
         * @return {[type]}     [description]
         */
        gridApi.grid.appScope.effectProxyInfo = function(row) {
            var item = row.entity;
            var statusTip = item.status === '0'?'生效':'失效';
            $ngBootbox.confirm('您确定使该条协议'+statusTip+'吗？').then(function(){
                vm.agencyAgreementEffect(item);
            },function(){})

        };

        gridApi.grid.appScope.detailProxyInfo = function(row) {
            var item = row.entity;
            vm.detailAgencyAgreement(item);
        };
    }

    // 查看代理协议详情
    function detailAgencyAgreement(params) {
        ModalService.showModal({
            modalId: 'proxyAgreementDetailModal',
            template: proxyAgreementDetailModal.html,
            modalTitle: '代理协议详情',
            controller: ['$scope', 'params', 'titleMapFilterFilter', proxyAgreementDetailModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        });
    }

    //修改代理协议
    function editAgencyAgreement(params) {
        ModalService.showModal({
            modalId: 'proxyAgreementModal',
            template: proxyAgreementModal.html,
            modalTitle: '修改代理协议',
            controller: [
                '$rootScope', 
                'params', 
                'toastr', 
                'ModalService', 
                'SupplierService',
                'ProxyAgreementService', 
                'ProductNameListService', 
                'ProxyAgreementModalConstant', 
                'timeFormatFilterFilter', 
                'ValidationService', 
                proxyAgreementModal.controller
            ],
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

    //代理协议生失效
    function agencyAgreementEffect(params) {
        var statusTip = params.status == '0' ? '生效' : '失效';
        var status = params.status == '0' ? '1' : '0';
        var newParams = {
            agencyId: params.agencyId,
            status: status
        };

        proxyAgreementService.agencyAgreementEffectStatus(newParams).then(function() {
            toastr.success('代理协议已' + statusTip);
            init();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    //分页
    function doCtrlPagingAct(page, pageSize, total) {
        vm.page.startIndex = page + '';
        vm.page.pageSize = pageSize + '';
        
        searchAgencyAgreement(vm.page);
    };

};
