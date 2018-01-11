'use strict';
var _ = require('lodash');

module.exports = function(params, toastr, ModalService, FundProductService, validationService, FundProductModalConstant, titleMapFilterFilter, FundManagerService, $timeout, $scope, supplierService, commonService, fundConstant, $q) {

    var vm = this;
    var isAdd = true;
    //form&schema
    vm.model = {};
    vm.currentRate = {};
    vm.currentSelectIndex = -1;
    vm.form = FundProductModalConstant.baseForm;
    vm.schema = FundProductModalConstant.baseSchema;
    vm.rateForm = FundProductModalConstant.rateForm;
    vm.rateSchema = FundProductModalConstant.rateSchema;
    vm.managerForm = FundProductModalConstant.managerForm;
    vm.managerSchema = FundProductModalConstant.managerSchema;

    //pannel
    vm.panelBanseInfoOptions = FundProductModalConstant.panelBanseInfoOptions;
    vm.panelRateInfoOptions = FundProductModalConstant.panelRateInfoOptions;
    vm.panelPersonInfoOptions = FundProductModalConstant.panelPersonInfoOptions;



    vm.formPanelOptions = FundProductModalConstant.panelBanseInfoOptions;

    vm.schemaPanelOptions = FundProductModalConstant.panelRateInfoOptions;

    vm.rateInfoOptions = FundProductModalConstant.rateInfoOptions;

    vm.gridOptions = FundProductModalConstant.gridOptions;
    vm.gridOptions.onRegisterApi = onRegisterApi;

    vm.changeAmountUom = changeAmountUom;

    vm.changeRateType = changeRateType;

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.deleteRateItem = function(row) {
            vm.removeTarget(row.entity);
        };

        gridApi.selection.raise.rowSelectionChanged = function(row) {
            vm.currentSelectIndex = _.indexOf(vm.gridOptions.data, row.entity);
            vm.currentRate = angular.copy(row.entity);
            //日期格式转换
            vm.currentRate.workLess = vm.currentRate.workLess;
            vm.currentRate.workMore = vm.currentRate.workMore;
            vm.currentRate.rateAmount = vm.currentRate.rateAmount;
            vm.currentRate.rateAmountOff = vm.currentRate.rateAmountOff;
            vm.currentRate.rateFromDate = moment(vm.currentRate.rateFromDate)['_d'];
            vm.currentRate.rateThruDate = moment(vm.currentRate.rateThruDate)['_d'];
            var textArr = [
                titleMapFilterFilter(vm.currentRate.rateTypeParentId, vm.parentTypeIds),
                titleMapFilterFilter(vm.currentRate.saleChannelTypeId, fundConstant.saleChannelTypeIdOptions),
                titleMapFilterFilter(vm.currentRate.uomType, vm.uomTypes),
                titleMapFilterFilter(vm.currentRate.amountUomId, fundConstant.amountUomIdOptions)
            ];
            commonService.setSelectTextById('fundRateForm', textArr);
        }
    }
    vm.parentTypeIds = FundProductModalConstant.parentTypeIds;
    vm.uomTypes = FundProductModalConstant.uomTypes;
    vm.amountUomIds = FundProductModalConstant.amountUomIds;

    vm.addtorateDetailList = addtorateDetailList;
    vm.removeTarget = removeTarget;
    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;
    vm.hideDiv = hideDiv;
    vm.checkPage1 = checkPage1;
    vm.checkInput = checkInput;
    vm.clearRate = clearRate;
    vm.targetInfoList = [];
    vm.model = {};



    vm.productPage = true;
    vm.toPage1 = toPage1;

    vm.selectRiskLevel = selectRiskLevel;
    vm.selectUnomType = selectUnomType;

    function selectRiskLevel(params) {
        if (params === 'CURRENCYTYPE') {
            vm.model.riskLevel = 'FR1';
            vm.model.riskLevelInfo = '较低风险';
        } else if (params === 'BONDTYPE') {
            vm.model.riskLevel = 'FR2';
            vm.model.riskLevelInfo = '低风险';
        } else if (params === 'BALANCE') {
            vm.model.riskLevel = 'FR3';
            vm.model.riskLevelInfo = '中低风险';
        } else if (params === 'MIXEDTYPE') {
            vm.model.riskLevel = 'FR4';
            vm.model.riskLevelInfo = '中风险';
        } else if (params === 'STOCKTYPE') {
            vm.model.riskLevel = 'FR5';
            vm.model.riskLevelInfo = '中高风险';
        } else if (params === 'QDII') {
            vm.model.riskLevel = 'FR6';
            vm.model.riskLevelInfo = '高风险';
        }
    }



    function toPage1() {
        $scope.ratePage = false;
        vm.productPage = true;
        // $scope.ratePage = false;
        // $('#ratePage2').hide();
        setTimeout(function() {
            $('#ratePage2').css({
                'display': 'none'
            });
        }, 0);
    }

    /**
     * [changeRateType description]
     * @param  {[type]} modelValue [description]
     * @return {[type]}            [description]
     */
    function changeRateType(modelValue) {
        console.log(modelValue);
        if (modelValue === 'SUB' || modelValue ==='PURCHASE') {
            //认购，申购 ->金额
            console.log(vm.rateForm[2]);
            vm.rateForm[2].items[0].titleMap = [{
                name: '--请选择--',
                value: ''
            }, {
                name: '元',
                value: 'YUAN'
            }, {
                name: '万',
                value: 'MILLION'
            }];
        } else {
            //赎回 -> 年月
            vm.rateForm[2].items[0].titleMap = [{
                name: '--请选择--',
                value: ''
            }, {
                name: '天',
                value: 'DAY'
            }, {
                name: '月',
                value: 'MONTH'
            }, {
                name: '年',
                value: 'YEAR'
            }];
        }
        $scope.$broadcast('schemaFormRedraw');
    }

    /**
     *费率类型单位， 变化选择联动改变原费率和折扣费率 rateAmount rateAmountOff
     * @param  {[type]} modelValue [description]
     * @return {[type]}            [description]
     */
    function changeAmountUom(modelValue) {
        if (modelValue === 'PERCENT') {
            //maxLength
            vm.rateForm[6].items[0].type = 'hDefault';
            vm.rateForm[6].items[0].schema.type = 'string';
            vm.rateForm[6].items[0].schema.format = 'hDefault';
            vm.rateForm[7].items[0].type = 'hDefault';
            vm.rateForm[7].items[0].schema.type = 'string';
            vm.rateForm[7].items[0].schema.format = 'hDefault';
            $scope.$broadcast('schemaFormRedraw');
        } else if (modelValue === 'YUAN') {
            vm.rateForm[6].items[0].type = 'hAmount';
            vm.rateForm[6].items[0].schema.type = 'string';
            vm.rateForm[6].items[0].schema.format = 'hAmount';

            vm.rateForm[7].items[0].type = 'hAmount';
            vm.rateForm[7].items[0].schema.type = 'string';
            vm.rateForm[7].items[0].schema.format = 'hAmount';
            $scope.$broadcast('schemaFormRedraw');
        }
    }

    /**
     * 适用类型单位，变化改变适用上限和适用下限 workMore workLess
     * @param  {[type]} modelValue [description]
     * @return {[type]}            [description]
     */
    function selectUnomType(modelValue) {
        if (modelValue === 'YUAN' || modelValue === 'MILLION') {
            //hAmount类型
            vm.rateForm[4].items[0].type = 'hAmount';
            vm.rateForm[4].items[0].schema.type = 'string';
            vm.rateForm[4].items[0].schema.format = 'hAmount';

            vm.rateForm[3].items[0].type = 'hAmount';
            vm.rateForm[3].items[0].schema.type = 'string';
            vm.rateForm[3].items[0].schema.format = 'hAmount';
        } else {
            //Default类型
            vm.rateForm[4].items[0].type = 'hDefault';
            vm.rateForm[4].items[0].schema.type = 'string';
            vm.rateForm[4].items[0].schema.format = 'hDefault';

            vm.rateForm[3].items[0].type = 'hDefault';
            vm.rateForm[3].items[0].schema.type = 'string';
            vm.rateForm[3].items[0].schema.format = 'hDefault';
        }
        $scope.$broadcast('schemaFormRedraw');
    }

    function checkPage1(params, ngForm) {
        validationService.validate(ngForm);
        if (!vm.model.productName) {
            toastr.warning('请输入基金名称');
            return false;
        } else {
            if (validationService.containSpecial(vm.model.productName)) {
                toastr.warning('产品名称不能包含特殊符号');
                return false;
            }
        }

        if (!vm.model.externalProductCode) {
            toastr.warning('请输入基金代码');
            return false;
        } else {
            if (!validationService.isIntChar(vm.model.externalProductCode)) {
                toastr.warning('基金代码为数字、字母');
                return false;
            }
        }

        if (!vm.model.manffacturerPartyId) {
            toastr.warning('请选择基金供应商');
            return false;
        }

        if (!vm.model.fundSaleInstitutions) {
            toastr.warning('请输入基金销售机构');
            return false;
        } else {
            if (validationService.containSpecial(vm.model.fundSaleInstitutions)) {
                toastr.warning('基金销售机构不能包含特殊符号');
                return false;
            }
        }
        if (vm.model.internalName) {
            //不必输
            if (validationService.containSpecial(vm.model.internalName)) {
                toastr.warning('基金内部名称不能包含特殊符号');
                return false;
            }
        }

        if (!vm.model.brandName) {
            toastr.warning('请选择基金公司名称');
            return false;
        }

        if (!vm.model.productTypeId) {
            toastr.warning('请选择基金产品类型');
            return false;
        }

        if (!vm.model.riskLevel) {
            toastr.warning('请选择风险等级');
            return false;
        }

        if (!vm.model.productAmount) {
            toastr.warning('请输入基金产品规模');
            return false;
        } else {
            if (!validationService.isMoney(validationService.toStdAmount(params.productAmount), 16)) {
                toastr.warning('基金产品规模为16位以内的整数或小数');
                return false;
            }
        }
        if (!vm.model.productAmountUomId) {
            toastr.warning('请选择产品规模单位');
            return false;
        } else {}

        if (!vm.model.productFoundDate) {
            toastr.warning('请选择成立日期');
            return false;
        }

        if (!vm.model.statusId) {
            toastr.warning('请选择基金产品状态');
            return false;
        }

        if (!vm.model.maxAmount) {
            toastr.warning('请输入基金最大限额');
            return false;
        }

        if (!vm.model.maxAmountType) {
            toastr.warning('请选择最大限额单位');
            return false;
        } else {
            //确认基金最大金额是多少位
            if (!validationService.isMoney(validationService.toStdAmount(params.maxAmount), 16)) {
                toastr.warning('基金最大限额为16位以内的整数或小数');
                return false;
            }
        }

        if (!vm.model.minAmount) {
            toastr.warning('请输入基金最小限额');
            return false;
        }

        if (!vm.model.minAmountType) {
            toastr.warning('请选择最小金额单位');
            return false;
        } else {
            //最小限额位数
            if (!validationService.isMoney(validationService.toStdAmount(params.minAmount), 16)) {
                toastr.warning('基金最小限额为16位以内的整数或小数');
                return false;
            }
        }

        if(!params.managementCost){
            toastr.warning('请输入基金管理费');
            return false;
        }else{
        if (params.managementCost) {
            if (!validationService.isMoney(validationService.toStdAmount(params.managementCost), 16)) {
                toastr.warning('基金管理费为16位以内的整数或小数');
                return false;
            }
        }
    }

        if (!params.trusteeFee) {
            toastr.warning('请输入基金托管费');
            return false;
        } else {
        //基金托管费位数
        if (params.trusteeFee) {
            if (!validationService.isMoney(validationService.toStdAmount(params.trusteeFee), 16)) {
                toastr.warning('基金托管费为16位以内的整数或小数');
                return false;
            }
        }
    }

        if (!vm.model.fundManagementCompany) {
            toastr.warning('请输入基金管理公司');
            return false;
        } else {
            if (!validationService.validateChinese(vm.model.fundManagementCompany)) {
                toastr.warning('基金管理公司必须是中文');
                return false;
            }
        }

        if (!vm.model.fundCustodianInstitutions) {
            toastr.warning('请输入基金托管机构');
            return false;
        } else {
            if (!validationService.validateChinese(vm.model.fundCustodianInstitutions)) {
                toastr.warning('基金托管机构必须是中文');
                return false;
            }
        }

        if (!vm.model.chargeType) {
            toastr.warning('请选择收费方式');
            return false;
        }

        if (!vm.model.redemption) {
            toastr.warning('请选择期限内可否赎回');
            return false;
        }

        if (!vm.model.dividend) {
            toastr.warning('请选择分红方式');
            return false;
        }

        if (!vm.model.partyId) {
            toastr.warning('请选择基金经理');
            return false;
        }

        if (validationService.bigSmalCompare(validationService.toStdAmount(params.minAmount), validationService.toStdAmount(params.maxAmount))) {
            toastr.warning('最小限额应小于最大限额');
            return false;
        }

        if (validationService.bigSmalCompare(validationService.toStdAmount(params.maxAmount), validationService.toStdAmount(params.productAmount))) {
            toastr.warning('最大限额应小于基金产品规模');
            return false;
        }
        return true;
    }

    vm.toPage2 = toPage2;
    vm.baseInfo = {};

    function toPage2(ngForm) {
        vm.model.userName = JSON.parse(sessionStorage.getItem("CURRENT_USER")).userName;
        var tempInfo = angular.copy(vm.model);
        if (!checkPage1(tempInfo, ngForm)) {
            return;
        }
        tempInfo.productAmount = validationService.toStdAmount(tempInfo.productAmount);
        tempInfo.maxAmount = validationService.toStdAmount(tempInfo.maxAmount);
        tempInfo.minAmount = validationService.toStdAmount(tempInfo.minAmount);
        tempInfo.managementCost = validationService.toStdAmount(tempInfo.managementCost);
        tempInfo.trusteeFee = validationService.toStdAmount(tempInfo.trusteeFee);
        tempInfo.productFoundDate = timeFormatFilterFilter(tempInfo.productFoundDate, 'YYYY-MM-DD HH:mm:ss');

        vm.baseInfo = tempInfo;
        vm.productPage = false;
        $scope.ratePage = true;
        // $('#ratePage2').show();
        setTimeout(function() {
            $('.ui-grid-header-viewport').css({
                'overflow': 'visible'
            });
            $('.ui-grid-cell-contents').css({
                'overflow': 'visible'
            });
            $('.ui-grid-row').css({
                'overflow': 'visible'
            });
            $('#ratePage2').css({
                'display': 'block'
            });
        }, 0);

        // vm.gridOptions = FundProductModalConstant.gridOptions;
        // // var isPage1Valid = vm.checkPage1();
        // // if (!isPage1Valid) {
        // //     return;
        // // }
        // setTimeout(function() {
        //     $scope.$apply(function() {
        //         vm.productPage = false;
        //         $scope.ratePage = true;
        //         vm.gridOptions = FundProductModalConstant.gridOptions;
        //         vm.gridOptions.data = vm.rateDetailList;
        //     });
        // }, 100);
    }


    function hideDiv(param) {
        if (param.length == 0) {
            return true;
        } else {
            return false;
        }
    }
    //数据初始化
    init();

    function init() {
        // $('#ratePage2').hide();

        $('#ratePage2').css({
            'display': 'none'
        });

        //初始化基金经理人信息
        //分页数据
        var pageInfo = {
            'pageInfo': {
                startIndex: '1',
                pageSize: '100'
            }
        };

        var supplierInfoPage = {
            startIndex: '1',
            pageSize: '100',
            cooperationStatus: '1'
        };

        var promise = {
            pageInfo: FundManagerService.search(pageInfo),
            supplierInfoPage: supplierService.querySupplierInfo(supplierInfoPage)
        };

        vm.productManagerInfos = [];

        vm.supplierInfo = []; //供应商信息

        vm.schema.properties.partyId.titleMap = [];
        vm.schema.properties.manffacturerPartyId.titleMap = [];
        $q.all(promise).then(function(values) {
            var productManagerList = values.pageInfo.ProductManagerList;
            var supplyDetailList = values.supplierInfoPage.SupplyDetailList;
            vm.productManagerInfos.push({
                name: '--请选择--',
                value: ''
            });
            for (var i = productManagerList.length - 1; i >= 0; i--) {
                vm.productManagerInfos.push({
                    name: productManagerList[i].partyName,
                    value: productManagerList[i].partyId
                });
            }


            vm.supplierInfo.push({
                name: '--请选择--',
                value: ''
            });
            for (var i = supplyDetailList.length - 1; i >= 0; i--) {

                vm.supplierInfo.push({
                    name: supplyDetailList[i].supplyName,
                    value: supplyDetailList[i].supplyId,
                });
            }

            vm.form[11].items[1].items[0].titleMap = vm.productManagerInfos;
            vm.form[1].items[0].items[0].titleMap = vm.supplierInfo;
            $scope.$broadcast('schemaFormRedraw');
        }).catch(function(error) {
            toastr.error(error.message);
        });




        if (params.productId) {

            isAdd = false;
            //查询产品详细信息
            FundProductService.searchDetail(params).then(function(data) {
                //初始化数据
                vm.model = angular.copy(data.ProductDetail);
                /*vm.model.productAmount = Number(vm.model.productAmount);
                vm.model.maxAmount = Number(vm.model.maxAmount);
                vm.model.minAmount = Number(vm.model.minAmount);
                vm.model.managementCost = Number(vm.model.managementCost);
                vm.model.trusteeFee = Number(vm.model.trusteeFee);*/

                vm.model.riskLevelInfo = titleMapFilterFilter(vm.model.riskLevel, fundConstant.riskLevelOptions);

                //日期转换
                vm.model.productFoundDate = moment(vm.model.productFoundDate)['_d'];
                // vm.gridOptions.data = data.rateDetailList;
                // vm.rateDetailList  = [];
                if (data.rateDetailList.length > 0) {
                    _.each(data.rateDetailList, function(item, index) {
                        var moneyFilter = titleMapFilterFilter(item.uomType, vm.uomTypes);
                        item.rateCombo = item.workLess + moneyFilter + '－' + item.workMore + moneyFilter;
                        item.rateNumber = item.rateAmount + titleMapFilterFilter(item.amountUomId, vm.amountUomIds);
                        item.rateNumberOff = item.rateAmountOff + titleMapFilterFilter(item.amountUomId, vm.amountUomIds);
                    });
                    // vm.rateDetailList =angular.copy(data.rateDetailList);
                    vm.gridOptions.data = angular.copy(data.rateDetailList);
                    vm.targetInfoList = data.rateDetailList;
                }
            }).then(function(err) {
                //toastr.error(err.message);
            });

        } else {
            vm.gridOptions.data = [];
        }


    }

    function autoReceiveSure() {
        if(vm.gridOptions.data.length === 0){
            toastr.warning('请填写基金产品的相关费率信息');
            return;
        }
        if (isAdd) {
            save(vm.baseInfo);
        } else {
            update(vm.baseInfo);
        }
    }

    function timeFormatFilterFilter(input, format) {
        if (!input) {
            return '';
        }
        var timeParsed = moment(input);
        if (format) {
            return timeParsed.format(format);
        }

        return timeParsed.format('YYYY-MM-DD');
    }


    function save(params) {
        var newParams = angular.extend(params, {
            "rateDetailList": vm.gridOptions.data
        });
        console.log(newParams);
        FundProductService.save(newParams).then(function(data) {
            closeModal();
            toastr.success('添加成功');
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    function update(params) {
        var newParams = angular.extend(params, {
            "rateDetailList": vm.gridOptions.data
        });
        console.log(newParams);
        FundProductService.update(newParams).then(function(data) {
            closeModal();
            toastr.success('修改成功');
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    //取消
    function dismissModal() {
        // vm.model = {};
        // vm.gridOptions.data = [];
        // vm.currentRate = {};
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    function closeModal(value) {
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId, value);
    }


    function checkInput(params, rateForm) {
        validationService.validate(rateForm);
        if (!params.rateTypeParentId) {
            toastr.warning('请选择费率类型');
            return false;
        }

        if (!params.saleChannelTypeId) {
            toastr.warning('请选择销售渠道');
            return false;
        }

        if (!params.uomType) {
            toastr.warning('请选择适用单位类型');
            return false;
        }
        if (!vm.currentRate.workMore) {
            toastr.warning('请输入适用上限');
            return false;
        } else {
            //金额类型
            if (params.uomType === 'YUAN' || params.uomType === 'MILLION') {
                if (!validationService.isMoney(validationService.toStdAmount(params.workMore), 12)) {
                    toastr.warning('适用上限为金额');
                    return false;
                }
            } else {
                if (params.workMore.length > 3 && !validationService.isInteger(params.workMore)) {
                    toastr.warning('适用上限为3位以内的整数');
                    return false;
                }
            }
        }

        if (!vm.currentRate.workLess) {
            toastr.warning('请输入适用下限');
            return false;
        } else {
            //金额类型
            if (params.uomType === 'YUAN' || params.uomType === 'MILLION') {
                if (!validationService.isMoney(validationService.toStdAmount(params.workLess), 12)) {
                    toastr.warning('适用下限为金额');
                    return false;
                }
            } else {
                if (params.workLess.length > 3 || !validationService.isInteger(params.workLess)) {
                    toastr.warning('适用下限为3位以内的整数');
                    return false;
                }
            }
        }

        if (validationService.bigSmalCompare(validationService.toStdAmount(params.workLess), validationService.toStdAmount(params.workMore))) {
            toastr.warning('费率信息的适用上限不能小于适用下限');
            return false;
        }

        if (!params.amountUomId) {
            toastr.warning('请选择费率单位');
            return false;
        }

        if (!vm.currentRate.rateAmount) {
            toastr.warning('请输入原费率值');
            return false;
        } else {
            if (!validationService.isMoney(validationService.toStdAmount(params.rateAmount), 2)) {
                toastr.warning('原费率值为两位金额值');
                return false;
            }
        }


        if (!vm.currentRate.rateAmountOff) {
            toastr.warning('请输入折扣费率值');
            return false;
        } else {
            if (!validationService.isMoney(validationService.toStdAmount(params.rateAmountOff), 2)) {
                toastr.warning('折扣费率值为两位金额值');
                return false;
            }
        }

        if (validationService.bigSmalCompare(validationService.toStdAmount(params.rateAmountOff), validationService.toStdAmount(params.rateAmount))) {
            toastr.warning('基金产品的折扣费率值应小于费率值');
            return false;
        }

        if (!params.rateFromDate) {
            toastr.warning('请选择生效日期');
            return false;
        }

        if (!params.rateThruDate) {
            toastr.warning('请选择失效日期');
            return false;
        }

        if (!validationService.compareStartAndEndDate(params.rateFromDate, params.rateThruDate, '生效日期', '失效日期')) {
            return false;
        }

        return true;
    }

    function addtorateDetailList(rateForm) {
        var addRateItem = angular.copy(vm.currentRate);

        if (!vm.checkInput(addRateItem, rateForm)) {
            return;
        }

        if (vm.currentRate.uomType === 'YUAN' || vm.currentRate.uomType === 'MILLION') {
            addRateItem.workLess = validationService.toStdAmount(addRateItem.workLess);
            addRateItem.workMore = validationService.toStdAmount(addRateItem.workMore);
        }
        if (vm.currentRate.amountUomId === 'YUAN') {
            addRateItem.rateAmount = validationService.toStdAmount(addRateItem.rateAmount);
            addRateItem.rateAmountOff = validationService.toStdAmount(addRateItem.rateAmountOff);
        }

        //日期格式转化
        addRateItem.rateFromDate = timeFormatFilterFilter(addRateItem.rateFromDate, 'YYYY-MM-DD HH:mm:ss');
        addRateItem.rateThruDate = timeFormatFilterFilter(addRateItem.rateThruDate, 'YYYY-MM-DD HH:mm:ss');
        var moneyFilter = titleMapFilterFilter(addRateItem.uomType, vm.uomTypes);
        addRateItem.rateCombo = addRateItem.workLess + moneyFilter + '－' + addRateItem.workMore + moneyFilter;
        addRateItem.rateNumber = addRateItem.rateAmount + titleMapFilterFilter(addRateItem.amountUomId, vm.amountUomIds);
        addRateItem.rateNumberOff = addRateItem.rateAmountOff + titleMapFilterFilter(addRateItem.amountUomId, vm.amountUomIds);

        if (vm.currentSelectIndex > -1) {
            //update
            vm.gridOptions.data[vm.currentSelectIndex] = addRateItem;
            delete addRateItem.$$hashKey;
            vm.targetInfoList[vm.currentSelectIndex] = addRateItem;
        } else {
            delete addRateItem.$$hashKey;
            if (!_.find(vm.targetInfoList, addRateItem)) {
                vm.gridOptions.data.push(addRateItem);
                vm.targetInfoList.push(addRateItem);
            } else {
                toastr.warning('重复添加费率数据');
            }
        }
        vm.currentSelectIndex = -1;
        clearRate();
    }

    function removeTarget(target) {
        if (_.indexOf(vm.gridOptions.data, target) > -1) {
            // vm.targetInfoList.splice(_.indexOf(vm.targetInfoList, target), 1);
            vm.gridOptions.data.splice(_.indexOf(vm.gridOptions.data, target), 1);
        }
    }

    function clearSelectText() {
        var selects = document.getElementsByTagName("select");
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].previousElementSibling.children[0] != undefined) {
                selects[i].previousElementSibling.children[0].children[0].innerText = '请选择';
            }
        }
    }

    function clearRate() {
        vm.currentRate = {};
        var textArr = ['', '', '', ''];
        commonService.setSelectTextById('fundRateForm', textArr);
        $scope.$broadcast('schemaFormRedraw');
    }

};
