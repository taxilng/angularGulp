'use strict';

module.exports = function($rootScope, $scope, toastr, $ngBootbox, timeFormatFilterFilter, ModalService, EventBusService, ProductCheckingConstant, productCheckingService, ValidationService) {
    var vm = this;
    // 提交后端model模型
    vm.model = {
        balOfAccDate: new Date()
    };

    //------------------------变量声明开始------------------------------//


    //------------------------变量声明结束------------------------------//
    //------------------------方法声明开始------------------------------//
    //申购赎回对账
    vm.applyRedeemChecking = applyRedeemChecking;

    //结果重新对账
    vm.resultReChecking = resultReChecking;
    //------------------------方法声明结束------------------------------//
    //初始化数据
    init();

    function init() {
        // 查询面板
        vm.formPanelOptions = ProductCheckingConstant.formPanelOptions;
        // 表单头部
        vm.schema = ProductCheckingConstant.investSchema;
        // 表单输入
        vm.form = ProductCheckingConstant.investFormOptions;

    }


    /**
     * [applyRedeemChecking description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    function applyRedeemChecking(type) {
        var param = angular.copy(vm.model);
        param.balOfAccDate = timeFormatFilterFilter(param.balOfAccDate, 'YYYYMMDD');
        param = angular.extend(param, {
            balOfAccType: type
        });
        productCheckingService.repeatBatchUploadPurOrRedeFile(param)
        .then(function(data){
             toastr.success('对账成功');
        }).catch(function(err){
            toastr.error(err.message);
        });
    }

    /**
     * [resultReChecking description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    function resultReChecking(type) {
        var param = angular.copy(vm.model);
        param.balOfAccDate = timeFormatFilterFilter(param.balOfAccDate, 'YYYYMMDD');
        param = angular.extend(param, {
            balOfAccType: type
        });
        productCheckingService.repeatBatchDownloadBalOfAccResultFile(param)
        .then(function(data){
            toastr.success('重新对账成功');
        }).catch(function(err){
            toastr.error(err.message);
        });
    }

};
