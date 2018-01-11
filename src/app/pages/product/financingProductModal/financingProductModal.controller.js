'use strict';

var regularExpressionConstant = require('../../../constant/regularExpression/regularExpression.constant');

module.exports = function(params, toastr, ModalService, financingProductService, titleMapFilterFilter, supplierService, ValidationService) {
    var vm = this;
    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;
    var isAdd = true; //是否添加
    vm.model = {};
    vm.supplierInfo = []; //供应商信息
    vm.calcDate = calcDate;
    //数据初始化
    init();

    function init() {
        //供应商管理
        var pageInfo = {
            startIndex: '1',
            pageSize: '100',
            cooperationStatus: '1'
        };
        supplierService.querySupplierInfo(pageInfo).then(function(data) {
            if (!data.SupplyDetailList || data.SupplyDetailList.length === 0) {
                vm.supplierInfo.push({
                    name: '查询无记录',
                    value: ''
                });
            } else {
                vm.supplierInfo.push({
                    name: '--请选择--',
                    value: ''
                });
                for (var i = data.SupplyDetailList.length - 1; i >= 0; i--) {

                    vm.supplierInfo.push({
                        name: data.SupplyDetailList[i].supplyName,
                        value: data.SupplyDetailList[i].supplyId,
                    });
                }
            }
        }).catch(function(error) {
            toastr.error(error.message);
        });

        //查询详情信息
        if (params.productId) {
            isAdd = false;
            //查询详情并初始化
            var detailParam = angular.extend({}, vm.model, params);
            financingProductService.searchDetail(detailParam).then(function(data) {
                vm.model = angular.copy(data.ProductDetail);
                vm.model.productTerm = Number(vm.model.productTerm);
                /*vm.model.productAmount = Number(vm.model.productAmount);
                vm.model.price = Number(vm.model.price);
                vm.model.minAmount = Number(vm.model.minAmount);
                vm.model.maxAmount = Number(vm.model.maxAmount);*/
                vm.model.interestStartDate = moment(vm.model.interestStartDate)['_d'];
                // vm.model.interestEndDate = moment(vm.model.interestEndDate)['_d'];
                vm.model.productFoundDate = moment(vm.model.productFoundDate)['_d'];
                vm.model.receiptDate = moment(vm.model.receiptDate)['_d'];
            });
        }
    }

    function dismissModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    function closeModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId);
    }

    function autoReceiveSure(param, ngForm) {
        vm.model.productPriceTypeId = 'RATE';
        vm.model.currentyUomId = 'RMB';
        vm.model.userName = JSON.parse(sessionStorage.getItem("CURRENT_USER")).userName;
        var tempModelInfo = angular.copy(vm.model);
        if (!checkInput(tempModelInfo, ngForm)) {
            return;
        }
        tempModelInfo.productTerm = tempModelInfo.productTerm + '';
        tempModelInfo.productAmount = ValidationService.toStdAmount(tempModelInfo.productAmount);
        tempModelInfo.price = ValidationService.toStdAmount(tempModelInfo.price);
        tempModelInfo.minAmount = ValidationService.toStdAmount(tempModelInfo.minAmount);
        tempModelInfo.maxAmount = ValidationService.toStdAmount(tempModelInfo.maxAmount);
        tempModelInfo.interestStartDate = timeFormatFilterFilter(tempModelInfo.interestStartDate, 'YYYY-MM-DD HH:mm:ss');
        tempModelInfo.interestEndDate = timeFormatFilterFilter(tempModelInfo.interestEndDate, 'YYYY-MM-DD HH:mm:ss');
        tempModelInfo.productFoundDate = timeFormatFilterFilter(tempModelInfo.productFoundDate, 'YYYY-MM-DD HH:mm:ss');
        tempModelInfo.receiptDate = timeFormatFilterFilter(tempModelInfo.receiptDate, 'YYYY-MM-DD HH:mm:ss');

        if (isAdd) {
            save(tempModelInfo);
        } else {
            update(tempModelInfo);
        }
    }

    function save(params) {
        financingProductService.save(params).then(function(data) {
            toastr.success('添加成功');
            closeModal();
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    function update(params) {
        financingProductService.update(params).then(function(data) {
            toastr.success('修改成功');
            closeModal();
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
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


    function checkInput(params, ngForm) {
        ValidationService.validate(ngForm);
        if (!params.productName) {
            toastr.warning('请输入产品名称');
            return false;
        } else {
            if (ValidationService.containSpecial(params.productName)) {
                toastr.warning('产品名称不能包含特殊符号');
                return false;
            }

        }

        if (!params.externalProductCode) {
            toastr.warning('请输入外部产品代码');
            return false;
        } else {
            if (!ValidationService.isIntChar(params.externalProductCode)) {
                toastr.warning('外部产品代码为数字、字母');
                return false;
            }
        }

        if (!params.manffacturerPartyId) {
            toastr.warning('请选择供应商');
            return false;
        }

        if (vm.model.internalName) {
            //不必输
            if (ValidationService.containSpecial(vm.model.internalName)) {
                toastr.warning('内部名称不能包含特殊字符');
                return false;
            }
        }
        if (!vm.model.productAmount) {
            toastr.warning('请输入产品规模');
            return false;
        } else {
            if (!ValidationService.isMoney(ValidationService.toStdAmount(params.productAmount), 16)) {
                toastr.warning('产品规模为16位以内的整数或小数');
                return false;
            }
        }

        if (!params.productAmountUomId) {
            toastr.warning('请选择产品规模单位');
            return false;
        }

        if (!params.productFoundDate) {
            toastr.warning('选择产品成立日期');
            return false;
        }

        // if(isAdd){
        if (!params.interestStartDate) {
            toastr.warning('选择产品计息日');
            return false;
        } else {
            if (!ValidationService.compareStartAndEndDate(params.productFoundDate, params.interestStartDate, '产品成立日期', '计息日')) {
                return false;
            }
        }
        // }

        if (!vm.model.productTerm) {
            toastr.warning('请输入理财期限');
            return false;
        } else {
            if (!ValidationService.isInteger(params.productTerm)) {
                toastr.warning('理财期限为整数');
                return false;
            }
        }
        if (!params.productTermType) {
            toastr.warning('请选择理财期限单位');
            return false;
        }

        if (!params.interestEndDate) {
            toastr.warning('选择产品结息日');
            return false;
        }  else {
            if (!ValidationService.compareStartAndEndDate(params.interestStartDate,params.interestEndDate,'计息日','结息日')) {
                return false;
            }
        }


        if (!params.receiptDate) {
            toastr.warning('选择收款日期');
            return false;
        } else {
            if (!ValidationService.compareStartAndEndDate(params.interestEndDate, params.receiptDate, '结息日', '收款日期')) {
                return false;
            }
        }



        if (!params.statusId) {
            toastr.warning('选择产品状态');
            return false;
        }

        if (!params.riskLevel) {
            toastr.warning('选择风险等级');
            return false;
        }

        if (!vm.model.price) {
            toastr.warning('请输入预期年化收益');
            return false;
        } else {
            if (!ValidationService.isMoney(ValidationService.toStdAmount(params.price), 2)) {
                toastr.warning('预期年化收益为2位以内的整数或小数');
                return false;
            }
        }

        if (!params.paymentMethod) {
            toastr.warning('选择兑付方式');
            return false;
        }

        if (!vm.model.minAmount) {
            toastr.warning('请输入最小限额');
            return false;
        } else {
            if (!ValidationService.isMoney(ValidationService.toStdAmount(params.minAmount), 16)) {
                toastr.warning('最小限额为16位以内的整数或小数');
                return false;
            }
        }

        if (!params.minAmountType) {
            toastr.warning('选择最小限额单位');
            return false;
        }

        if (!vm.model.maxAmount) {
            toastr.warning('请输入最大限额');
            return false;
        } else {
            if (!ValidationService.isMoney(ValidationService.toStdAmount(params.maxAmount), 16)) {
                toastr.warning('最大限额为16位以内的整数或小数');
                return false;
            }
        }

        if (!params.maxAmountType) {
            toastr.warning('选择最大限额单位');
            return false;
        }

        if (params.fundManagementCompany) {
            if (ValidationService.containSpecial(params.fundManagementCompany)) {
                toastr.warning('受托投资管理机构不能包含特殊字符');
                return false;
            }
        }

        if (params.fundCustodianInstitutions) {
            if (ValidationService.containSpecial(params.fundCustodianInstitutions)) {
                toastr.warning('托管机构不能包含特殊字符');
                return false;
            }
        }

        if (params.fundSaleInstitutions) {
            if (ValidationService.containSpecial(params.fundSaleInstitutions)) {
                toastr.warning('发行机构不能包含特殊字符');
                return false;
            }
        }

        if (ValidationService.bigSmalCompare(ValidationService.toStdAmount(params.minAmount), ValidationService.toStdAmount(params.maxAmount))) {
            toastr.warning('最小限额应小于最大限额');
            return false;
        }

        if (ValidationService.bigSmalCompare(ValidationService.toStdAmount(params.maxAmount), ValidationService.toStdAmount(params.productAmount))) {
            toastr.warning('最大限额应小于产品规模');
            return false;
        }

        return true;
    };


    vm.formPanelOptions = {
        title: '理财产品管理',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    };
    //form
    vm.form = [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'productName',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            // 'readonly': isAdd ? false : true,
            'required': true,
            'onKeyup': function($event, form, object) {
                $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                object.ngModel.$setViewValue($event.target.value);
            }
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'externalProductCode',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'manffacturerPartyId', //供应商信息
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'internalName', //内部名称
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'onKeyup': function($event, form, object) {
                $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                object.ngModel.$setViewValue($event.target.value);
            }
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'productAmount',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'productAmountUomId',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        'type': 'section',
        'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
        'items': [{
            'type': 'label',
            'title': '成立日期',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }, {
            'key': 'productFoundDate',
            'required': true,
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'opened': false,
            'dateOptions': {
                'formatYear': 'yy',
                'maxDate': new Date(2020, 5,
                    22),
                'minDate': new Date(),
                'startingDay': 1
            },
            onClick: function($event, form) {
                form.opened = true;
            }
        }]
    }, {
        'type': 'section',
        'htmlClass': 'col-lg-6 col-md-6 col-sm-6 ',
        'items': [{
            'type': 'label',
            'title': '计息日',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }, {
            'key': 'interestStartDate',
            'required': true,
            'divClass': 'col-lg-7 col-md-7 col-sm-7 mb-15',
            'opened': false,
            'dateOptions': {
                'formatYear': 'yy',
                'maxDate': new Date(2020, 5,
                    22),
                'minDate': new Date(),
                'startingDay': 1
            },
            onClick: function($event, form) {
                form.opened = true;
            }
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'productTerm',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true,
            'min':0,
            'max':999,
            'onKeyup': function($event, form, object) {
                if ($event.target.value.length > 3) {
                    $event.target.value = $event.target.value.substr(0, 3);
                    object.ngModel.$setViewValue($event.target.value);
                }
            },
            onChange: function(newValue) {
                vm.calcDate({
                    date: newValue,
                    unit: vm.model.productTermType
                });
            }
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'productTermType',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true,
            'onChange': function(newValue) {
                console.log(newValue);
                vm.calcDate({
                    date: vm.model.productTerm,
                    unit: newValue
                });
            }
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'interestEndDate',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true,
            'readonly': true
        }]
    }, {
        'type': 'section',
        'htmlClass': 'col-lg-6 col-md-6 col-sm-6 ',
        'items': [{
            'type': 'label',
            'title': '收款日期',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }, {
            'key': 'receiptDate',
            'required': true,
            'divClass': 'col-lg-7 col-md-7 col-sm-7 mb-15',
            'opened': false,
            'dateOptions': {
                'formatYear': 'yy',
                'maxDate': new Date(2020, 5,
                    22),
                'minDate': new Date(),
                'startingDay': 1
            },
            onClick: function($event, form) {
                form.opened = true;
            }
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'statusId', //状态
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'riskLevel', //风险等级
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'price',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
                // 'min':0.01,
                // 'max':99.99
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'paymentMethod',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'minAmount',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'minAmountType',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'maxAmount',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'maxAmountType',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'required': true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'fundManagementCompany',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'fundCustodianInstitutions',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'fundSaleInstitutions',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'newCustomerVip',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            'key': 'pageRecommend',
            'divClass': 'col-lg-7 col-md-7 col-sm-7',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-12 col-md-12 col-sm-12',
        items: [{
            'key': 'comments',
            'divClass': 'col-lg-9 col-md-9 col-sm-9',
            'labelHtmlClass': 'col-lg-2 col-md-2 col-sm-2'
        }]
    }];



    //schema
    vm.schema = {
        type: 'object',
        properties: {
            'productName': {
                'title': '产品名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20 //限制20位
            },
            'externalProductCode': {
                'title': '外部产品代码',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'manffacturerPartyId': {
                'title': '供应商',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': vm.supplierInfo
            },
            'productAmount': {
                'title': '产品规模',
                'type': 'string',
                'format': 'hAmount'
            },
            'productAmountUomId': {
                'title': '产品规模单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [
                    /*{
                                        'value': 'QUANTITY',
                                        'name': '数量'
                                    }, */
                    {
                        'value': '',
                        'name': '--请选择--'
                    }, {
                        'value': 'AMOUNT',
                        'name': '金额'
                    }
                ]
            },
            'productFoundDate': {
                'title': '成立日期',
                'type': 'string',
                'format': 'minDatePicker'
            },
            'interestStartDate': {
                'title': '起息日',
                'type': 'string',
                'format': 'minDatePicker'
            },
            'interestEndDate': {
                'title': '结息日',
                'type': 'string',
                'format': 'hDefault'
            },
            'statusId': {
                'title': '产品状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    name: '在售',
                    value: 'ON_SALE'
                }, {
                    name: '下架',
                    value: 'OFF_SALE'
                }]
            },
            'riskLevel': {
                'title': '风险等级',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    value: 'R5',
                    name: '激进型'
                }, {
                    value: 'R4',
                    name: '进取型'
                }, {
                    value: 'R3',
                    name: '平衡型'
                }, {
                    value: 'R2',
                    name: '稳健型'
                }, {
                    value: 'R1',
                    name: '谨慎型'
                }]
            },
            'receiptDate': {
                'title': '收款日',
                'type': 'string',
                'format': 'minDatePicker'
            },
            'price': {
                'title': '预期年化收益',
                'type': 'string',
                'format': 'hAmount'
            },
            'productTerm': {
                'title': '理财期限',
                'type': 'integer',
                'format': 'hDefault',
                // 'readonly':isAdd ? false : true,
                // 'maxLength':3
            },
            'productTermType': {
                'title': '理财期限单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    value: 'DAY',
                    name: '天'
                }, {
                    value: 'MONTH',
                    name: '月'
                }, {
                    value: 'YEAR',
                    name: '年'
                }],
                // 'readonly':isAdd ? false : true,
            },
            'startAmount': {
                'title': '起购金额',
                'type': 'string',
                'format': 'hAmount'
            },
            'minAmount': {
                'title': '最小限额',
                'type': 'string',
                'format': 'hAmount'
            },
            'minAmountType': {
                'title': '最小限额单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    name: '元',
                    value: 'YUAN'
                }]
            },
            'maxAmount': {
                'title': '最大限额',
                'type': 'string',
                'format': 'hAmount'
            },
            'maxAmountType': {
                'title': '最大限额单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    name: '元',
                    value: 'YUAN'
                }]
            },
            'internalName': {
                'title': '内部名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'comments': {
                'title': '备注',
                'type': 'string',
                'format': 'hTextarea',
                'maxLength': 200 //备注长度限制200
            },
            'newCustomerVip': {
                'title': '新客专享产品',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    name: '是',
                    value: '1'
                }, {
                    name: '否',
                    value: '0'
                }]
            },
            'paymentMethod': {
                'title': '兑付方式',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    'value': '1',
                    'name': '按月付息，到期还本'
                }, {
                    'value': '2',
                    'name': '一次性还本付息'
                }]
            },
            'pageRecommend': {
                'title': '首页推荐',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': [{
                    'value': '',
                    'name': '--请选择--'
                }, {
                    name: '是',
                    value: '1'
                }, {
                    name: '否',
                    value: '0'
                }]
            },
            'fundManagementCompany': {
                'title': '受托投资管理机构',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'fundCustodianInstitutions': {
                'title': '托管机构',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'fundSaleInstitutions': {
                'title': '发行机构',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            }
        }
    };

    function calcDate(dateModel) {
        if (!dateModel.date) {
            return;
        }
        if (!dateModel.unit) {
            return;
        }
        var endDate = addDate(vm.model.interestStartDate, dateModel.date, dateModel.unit);
        vm.model.interestEndDate = timeFormatFilterFilter(endDate, 'YYYY-MM-DD');
    }

    function addDate(date, productTerm, productTermType) {
        productTerm = Number(productTerm);
        var newDate = angular.copy(date);
        if (productTermType === "DAY") {
            newDate.setDate(date.getDate() + productTerm);
            return newDate;
        }
        if (productTermType === "YEAR") {
            newDate.setFullYear(date.getFullYear() + productTerm);
            return newDate;
        }
        if (productTermType === "MONTH") {
            newDate.setMonth(date.getMonth() + productTerm);
            return newDate;
        }
        return;
    }
};
