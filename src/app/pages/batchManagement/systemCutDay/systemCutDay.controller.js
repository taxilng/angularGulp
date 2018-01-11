'use strict';

module.exports = function($rootScope, $scope,toastr,$ngBootbox,timeFormatFilterFilter,ModalService,EventBusService,SystemCutDayConstant,BatchManagementService,ValidationService) {
    var vm = this;
    // 提交后端model模型
    vm.model = {};

    //------------------------变量声明开始------------------------------//


    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
    //切日提交
   	vm.submitSysDayFun = submitSysDayFun;
    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
       // 查询面板
        vm.formPanelOptions = SystemCutDayConstant.formPanelOptions;
        // 表单头部
        vm.schema = SystemCutDayConstant.investSchema;
        // 表单输入
        vm.form = SystemCutDayConstant.investFormOptions;

        // 切日查询
        querySysDayFun();
    }

    // 切日查询
    function querySysDayFun(){
    	// 入参
    	var params = {

    	};
    	// 服务通讯
    	var promise = BatchManagementService.querySysDay(params);
        promise.then(function(data) {
            vm.model.cuttingDate = new Date(timeFormatFilterFilter(data.transDate, 'YYYY-MM-DD'));
        }).catch(function(error){
            toastr.error(error.message);
        });
    }

    // 切日提交
    function submitSysDayFun(){
    	// 切日时间
    	var cuttingDate = angular.copy(vm.model.cuttingDate);
            var newDate = cuttingDate.getDate() + 1;
            cuttingDate.setDate(newDate);

    	cuttingDate = ValidationService.formatDateTime(timeFormatFilterFilter(cuttingDate, 'YYYYMMDD'));

	    $ngBootbox.confirm('确定要把系统时间切为(' + cuttingDate + ')吗？').then(function() {
	        // 入参
	    	var params = {
	               accountsDate:vm.model.cuttingDate
	    	};
	    	// 服务通讯
	    	var promise = BatchManagementService.submitSysDay(params);
	        promise.then(function(data) {
	            toastr.success('系统切日成功！');
                        querySysDayFun();
	        }).catch(function(error){
	            toastr.error(error.message);
	        });
	    }, function() {});

    }

    //------------------------方法定义结束------------------------------//
};
