'use strict';

module.exports = function(
	supplierPaymentService, 
	supplierPaymentConstant, 
	timeFormatFilter, 
	toastr, 
	$ngBootbox, 
	CommonService
) {
    var vm = this;
    
    vm.model = {};

    vm.page = {
        'startIndex': '1',
        'pageSize': '5'
    };

    //------------------------方法声明开始------------------------------//
    vm.init = init;
    vm.searchSupplierPayment = searchSupplierPayment; // 查询代理商资金清结算
    vm.doCtrlPagingAct = doCtrlPagingAct; // 分页
    vm.search = search; // 
    vm.resetAll = resetAll; // 重置
    vm.clearingPayment = clearingPayment; // 代理商资金清算
    vm.settlePayment = settlePayment; // 代理商资金结算
    vm.settingPayment = settingPayment; // 代理商资金清结算

    vm.gridOptions = supplierPaymentConstant.investGridOptions;
    vm.gridOptions.onRegisterApi = onRegisterApi;

    init();

    function init() {
        //查询面板
        vm.formPanelOptions = supplierPaymentConstant.formPanelOptions;
        //查询结果面板
        vm.gridPanelOptions = supplierPaymentConstant.gridPanelOptions;
        //查询表单
        vm.form = supplierPaymentConstant.investFormOptions;

        vm.schema = supplierPaymentConstant.investSchema;

        //表格
        vm.gridOptions = angular.copy(supplierPaymentConstant.investGridOptions);

        vm.page.startIndex = '1';
        vm.searchSupplierPayment(vm.page);
    }

    function checkInput(params) {
        return true;
    }

    function search() {
        vm.page.startIndex = '1';
        vm.searchSupplierPayment(vm.page);
    }

    // 查看代理协议列表
    function searchSupplierPayment(page) {
        var page = {
            startIndex: page.startIndex + '',
            pageSize: page.pageSize + ''
        };
        var params = angular.extend({}, page, vm.model);

        //输入校验
        if (!checkInput(params)) {
            return;
        }

        params.clearingTime = timeFormatFilter(params.clearingTime, 'YYYY-MM-DD');
        
        supplierPaymentService.querySupplierPayment(params).then(function(data) {
            if (!data.ClearingSupplierPaymentList || data.ClearingSupplierPaymentList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                return;
            }
            vm.page.total = data.totalSize;
            vm.gridOptions.data = data.ClearingSupplierPaymentList;
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
        vm.searchSupplierPayment(vm.page);
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.clearingPayment = function(row) {
            var item = row.entity;

            $ngBootbox.confirm('您确定清算吗？').then(function(){
                vm.clearingPayment(item);
            },function(){})
            // vm.clearingPayment(item);
        };

        gridApi.grid.appScope.settlePayment = function(row) {
            var item = row.entity;

            $ngBootbox.confirm('您确定结算吗？').then(function(){
                vm.settlePayment(item);
            },function(){})
            // vm.settlePayment(item);
        };

        gridApi.grid.appScope.settingPayment = function(row) {
            var item = row.entity;
            var statusTip = item.status === '0'?'清算':'结算';
            $ngBootbox.confirm('您确定'+statusTip+'吗？').then(function(){
                vm.settingPayment(item);
            },function(){})
        };
    }

    //代理商资金清结算
    function settingPayment(params) {
        var statusTip = params.status == '0' ? '清算' : '结算';
        var status = params.status == '0' ? '1' : '0';
        var newParams = {
            agencyId: params.agencyId,
            status: status
        };

        supplierPaymentService.supplierPaymentSetting(newParams).then(function() {
            toastr.success('已' + statusTip);
            init();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    // 代理商资金结算
    function settlePayment(params){
        var newParams = {
            supplyId: params.supplyId,
            clearingAmount: params.clearingAmount,
            clearingDate: params.clearingTime
        };

        supplierPaymentService.supplierPaymentSettle(newParams).then(function() {
            toastr.success('已结算');
            init();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }
    
    //代理商资金清算
    function clearingPayment(params) {
        var newParams = {
            agencyId: params.agencyId,
            status: '1'
        };

        supplierPaymentService.supplierPaymentClearing(newParams).then(function() {
            toastr.success('已清算');
            init();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    //分页
    function doCtrlPagingAct(page, pageSize, total) {
        vm.page.startIndex = page + '';
        vm.page.pageSize = pageSize + '';
        
        searchSupplierPayment(vm.page);
    };

};
