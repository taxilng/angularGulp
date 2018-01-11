'use strict';

var liquidationConstant = require('../../../constant/financingProxy/enum/liquidation.constant');
var rateTypeConstant = require('../../../constant/financingProxy/enum/rateType.constant');
var dateConstant = require('../../../constant/financingProxy/enum/date.constant');

module.exports = function(
    $rootScope,
    params,
    toastr,
    modalService,
    supplierService,
    proxyAgreementService,
    productNameListService,
    ProxyAgreementModalConstant,
    timeFormatFilter,
    ValidationService
) {
    var vm = this;

    var isAdd = true;

    vm.form = [];
    vm.schema = {};
    vm.page = {};
    vm.model = {
        userName: $rootScope.userName,
        liquidationType: '0',
        liquidationTool: 'CASH',
        rateType: '0',
        liquidationDate: ''
    };

    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;
    vm.liquidationTypeChange = liquidationTypeChange;

    vm.liquidationTypeMap = liquidationConstant.type;
    vm.liquidationToolMap = liquidationConstant.tool;
    vm.rateTypeMap = rateTypeConstant;
    vm.dateMap = [];

    //初始化数据
    init();

    function init() {
        //初始化表单
        vm.formPanelOptions = ProxyAgreementModalConstant.formPanelOptions;
        vm.schema = ProxyAgreementModalConstant.investSchema;
        vm.form = ProxyAgreementModalConstant.investFormOptions;
        if (params) {
            //初始化数据
            isAdd = false;
            liquidationTypeChange(params.liquidationType);

            vm.model.agencyId = params.agencyId;
            vm.model.agreementDate = new Date(params.agreementDate);
            vm.model.liquidationDate = params.liquidationDate;

            if(params.rateType == '3'){
                queryProductList();
            }
            if(params.liquidationType == '4'){
                vm.model.liquidationDate = new Date(params.liquidationDate);
            }
            
            vm.model.liquidationTool = params.liquidationTool;
            vm.model.liquidationType = params.liquidationType;
            vm.model.rateAmount = params.rateAmount;
            vm.model.rateType = params.rateType;
            vm.model.supplyId = {
                value: params.supplyId,
                name: params.supplyName
            };
            vm.model.productId = {
                value: params.productId,
                name: params.productName
            };

        }
    }

    querySupplyList();
    function querySupplyList(){
        var params = {
            startIndex: '1',
            pageSize: '999'
        };
        vm.supplyList = [];

        supplierService.querySupplierInfo(params).then(function(data) {
            data.SupplyDetailList.map(function(item){
                var map = {
                    name: item.supplyName,
                    value: item.supplyId
                };

                vm.supplyList.push(map);
            }) 
        }).catch(function(error) {
            toastr.error(error.message);
        });
    }

    function queryProductList(){
        vm.productList = [];
 
        productNameListService.productDetailList().then(function(data) {
            data.ProductDetailList.map(function(item){
                var map = {
                    name: item.productName,
                    value: item.productId
                };

                vm.productList.push(map);
            })
        }).catch(function(error) {
            toastr.error(error.message);
        });
    }

    vm.rateTypeChange = function(type){
        if(type == '3'){
            queryProductList();
        }else{
            vm.model.productId = '';
        }
    }

    function liquidationTypeChange(type){
        vm.isDate = false;
        vm.dateMap = [];
        if(type == '1'){
            vm.dateMap = dateConstant.week;
        }
        if(type == '2'){
            dateConstant.day.map(function(item, index){
                vm.dateMap[index] = {};
                vm.dateMap[index].value = vm.dateMap[index].name = item;
            })
        }
        if(type == '3'){
            vm.dateMap = dateConstant.quarter;
        }
        if(type != '4'){
            vm.model.liquidationDate = vm.dateMap.length ? vm.dateMap[0].value : '';
        } else if(type == '4'){
            vm.isDate = true;
            vm.model.liquidationDate = new Date();
        }
    }

    //确认
    function autoReceiveSure(ngForm) {
        if (isAdd) {
            add(ngForm);
        } else {
            update(ngForm);
        }
    }

    function add(ngForm) {
        var newParams = angular.copy(vm.model);

        newParams.agreementDate = timeFormatFilter(newParams.agreementDate, 'YYYY-MM-DD');
        if(newParams.liquidationType == '4'){
            newParams.liquidationDate = timeFormatFilter(newParams.liquidationDate, 'MM-DD');
        }
        
        if (!checkInput(newParams, ngForm)) {
            return;
        }

        proxyAgreementService.addAgencyAgreement(newParams).then(function(result) {
            toastr.success('新增代理协议成功');
            closeModal();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function update(ngForm) {
        var newParams = angular.copy(vm.model);
        
        newParams.agreementDate = timeFormatFilter(newParams.agreementDate, 'YYYY-MM-DD');
        if(newParams.liquidationType == '4'){
            newParams.liquidationDate = timeFormatFilter(newParams.liquidationDate, 'MM-DD');
        }
        if (!checkInput(newParams, ngForm)) {
            return;
        }

        proxyAgreementService.updateAgencyAgreement(newParams).then(function(result) {
            toastr.success('修改代理协议成功');
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
        
        if (params.supplyId && !params.supplyId.value) {
            toastr.warning('请输入正确的供应商名称');
            return false;
        }
        if (params.productId && !params.productId.value) {
            toastr.warning('请输入正确的基金名称');
            return false;
        }  
        params.supplyId = params.supplyId && params.supplyId.value ? params.supplyId.value: '';
        params.productId = params.productId && params.productId.value ? params.productId.value: '';

        if (ValidationService.isEmpty(params.supplyId)) {
            toastr.warning('请输入供应商名称');
            return false;
        }

        if (params.rateType == '3' && !params.productId) {
            toastr.warning('请输入基金名称');
            return false;
        }

        if (ValidationService.isEmpty(params.rateType) || params.rateType === ' ') {
            toastr.warning('请选择费率方式');
            return false;
        }
        if (ValidationService.isEmpty(params.rateAmount)) {
            toastr.warning('请输入费率');
            return false;
        }
        if (ValidationService.isEmpty(params.agreementDate)) {
            toastr.warning('请选择协议时间');
            return false;
        }
        if (ValidationService.isEmpty(params.liquidationType)) {
            toastr.warning('请选择清算方式');
            return false;
        }

        if(ValidationService.toStdAmount(params.rateAmount) == 1){
            if(!Number(params.rateAmount)){
                toastr.warning('费率输入格式错误');
                return false;
            }
        }

        if(ngForm.liquidationDate && ngForm.liquidationDate.$invalid){
            toastr.warning('清算日输入格式错误');
            return false;
        }

        if (ValidationService.isEmpty(params.liquidationTool)) {
            toastr.warning('请选择清算工具');
            return false;
        }

        return true;
    }

};
