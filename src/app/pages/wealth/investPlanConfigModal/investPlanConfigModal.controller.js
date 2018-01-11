'use strict';

var liquidationConstant = require('../../../constant/financingProxy/enum/liquidation.constant');
var rateTypeConstant = require('../../../constant/financingProxy/enum/rateType.constant');
var dateConstant = require('../../../constant/financingProxy/enum/date.constant');

module.exports = function(
    params, 
    toastr, 
    modalService, 
    investPlanConfigService, 
    investPlanConfigModalConstant, 
    ValidationService
) {
    var vm = this;

    var isAdd = true;

    vm.form = [];
    vm.schema = {};
    vm.page = {};
    vm.model = {};

    vm.sure = update;
    vm.dismissModal = dismissModal;
    
    //初始化数据
    init();

    function init() {
        //初始化表单
        vm.formPanelOptions = investPlanConfigModalConstant.formPanelOptions;
        vm.schema = investPlanConfigModalConstant.investSchema;
        vm.form = investPlanConfigModalConstant.investFormOptions;
        
        vm.model.planId = params.planId;
        vm.model.planName = params.planName;
        vm.model.savingDepositProp = params.savingDepositProp.replace('%', '');
        vm.model.cashDepositProp = params.cashDepositProp.replace('%', '');
        vm.model.floatIncomeProp = params.floatIncomeProp.replace('%', '');
        vm.model.fixedIncomeProp = params.fixedIncomeProp.replace('%', '');
    }

    function update(ngForm) {
        var newParams = angular.copy(vm.model);
        
        if (!checkInput(newParams, ngForm)) {
            return;
        }

        newParams.savingDepositProp = vm.model.savingDepositProp + '%';
        newParams.cashDepositProp = vm.model.cashDepositProp + '%';
        newParams.floatIncomeProp = vm.model.floatIncomeProp + '%';
        newParams.fixedIncomeProp = vm.model.fixedIncomeProp + '%';

        investPlanConfigService.updatePlanConfig(newParams).then(function(result) {
            toastr.success('投资方案推荐规则修改成功');
            closeModal();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function closeModal(value) {
        var modalId = modalService.getLastModalId();
        modalService.closeModal(modalId, value);
    }

    //取消
    function dismissModal() {
        var modalId = modalService.getLastModalId();
        modalService.dismissModal(modalId);
    }

    function checkInput(params, ngForm) {
        ValidationService.validate(ngForm)
            .then(function(){

            }).catch(function(){

            });
        
        if (ValidationService.isEmpty(params.savingDepositProp)) {
            toastr.warning('请输入储蓄存款类比重');
            return false;
        }
        if (ValidationService.isEmpty(params.cashDepositProp)) {
            toastr.warning('请输入现金存款类比重');
            return false;
        }
        if (ValidationService.isEmpty(params.floatIncomeProp)) {
            toastr.warning('请输入浮动收益类比重');
            return false;
        }

        if (ValidationService.isEmpty(params.fixedIncomeProp)) {
            toastr.warning('请输入固定收益类比重');
            return false;
        }
    
        if(ValidationService.toStdAmount(params.fixedIncomeProp) == 1){
            if(!Number(params.rateAmount)){
                toastr.warning('输入格式错误');
                return false;
            }
        }
        return true;
    }

};
