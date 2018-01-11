

'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var cellTemplate = '<a class="opr-del" ng-click="grid.appScope.deleteRateItem(row)">删除</a>';
var fundConstant = require('./enum/fund.constant');
var parentTypeIds = [{
    name: '认购费率',
    value: 'SUB'
}, {
    name: '申购费率',
    value: 'PURCHASE'
}, {
    name: '赎回费率',
    value: 'REDEEM'
}];
var productManagerInfos = [];
var fundProductModalConstant = {
    uomTypes: [{
        name: '元',
        value: 'YUAN'
    }, {
        name: '万',
        value: 'MILLION'
    }, {
        name: '天',
        value: 'DAY'
    }, {
        name: '月',
        value: 'MONTH'
    }, {
        name: '年',
        value: 'YEAR'
    }],
    amountUomIds: [{
        name: '%',
        value: 'PERCENT'
    }, {
        name: '元',
        value: 'YUAN'
    }],
    parentTypeIds: [{
        name: '认购费率',
        value: 'SUB'
    }, {
        name: '申购费率',
        value: 'PURCHASE'
    }, {
        name: '赎回费率',
        value: 'REDEEM'
    }],
    panelBanseInfoOptions: {
        title: '基金产品基本信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    panelRateInfoOptions: {
        title: '产品费率信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    rateInfoOptions: {
        title: '费率信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'gridform-panel'
    },
    panelPersonInfoOptions: {
        title: '基金经理人信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

    schemaPanelOptions: {
        title: '基金费率管理',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

    gridOptions: {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        selectionRowHeaderWidth:35,
        multiSelect:false,
        enableSorting:false,
        columnDefs: [{
            name: '费率类型',
            field: 'rateTypeParentId',
            cellFilter: 'titleMapFilter:' + JSON.stringify(parentTypeIds)
        }, {
            name: '适用范围',
            field: 'rateCombo'
        }, {
            name: '原费率',
            field: 'rateNumber'
        }, {
            name: '折扣费率',
            field: 'rateNumberOff'
        }, {
            name: '操作',
            field: 'adjustId',
            cellTemplate: cellTemplate
        }],
        data: []
    },

    //基金基本信息
    baseForm: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'productName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'maxlength':'20',
                // 'required':true,
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
                    // 'readonly': isAdd ? false : true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'externalProductCode',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]

    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'manffacturerPartyId', //供应商ID
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'fundSaleInstitutions',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'internalName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'brandName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    },  {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'productTypeId', //基金类型
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onChange': 'vm.selectRiskLevel(modelValue)'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'riskLevelInfo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'readonly':true
                // 'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'productAmount',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'productAmountUomId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            'type': 'section',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6 ',
            'items': [{
                'type': 'label',
                'title': '成立日期',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }, {
                'key': 'productFoundDate',
                'required': true,
                'divClass': 'col-lg-8 col-md-8 col-sm-8 mb-15',
                'opened': false,
                'dateOptions': {
                    'formatYear': 'yy',
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
                'key': 'statusId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'maxAmount',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'maxAmountType',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'minAmount',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'minAmountType',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'managementCost',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'trusteeFee',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'fundManagementCompany',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'fundCustodianInstitutions',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    },{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'chargeType',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'redemption',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'dividend',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'partyId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                // 'required':true
            }]
        }]
    },{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'pageRecommend',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]
    },{
            type: 'section',
            htmlClass: 'col-lg-12 col-md-12 col-sm-12',
            items: [{
                'key': 'comments',
                'divClass': 'col-lg-9 col-md-9 col-sm-9',
                'labelHtmlClass': 'col-lg-2 col-md-2 col-sm-2'
            }]
        }],


    //基金基础信息
    baseSchema: {
        'type': 'object',
        'properties': {
            'productName': {
                'title': '基金名称',
                'type': 'string',
                'format': 'hDefault'
            },
            'externalProductCode': {
                'title': '基金代码',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20,
                // 'validationMessage': "基金代码超出长度限制（6位）!"
            },
            'productTypeId': {
                'title': '基金产品类型',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.productTypeIdOptions,
            },
            'manffacturerPartyId': {
                'title': '基金供应商',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':[]
            },
            'internalName': {
                'title': '基金内部名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'brandName': {
                'title': '基金公司名称',
                'type': 'string',
                'format': 'hSelect',
                'enum':['南方','工银瑞信','易方达']
            },
            'productAmount': {
                'title': '基金产品规模',
                'type': 'string',
                'format': 'hAmount'
            },
            'productAmountUomId': {
                'title': '产品规模单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.productAmountUomIdOptions
            },
            'productFoundDate': {
                'title': '基金成立日期',
                'type': 'string',
                'format': 'minDatePicker'
            },
            'statusId': {
                'title': '基金产品状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.statusIdOptions
            },
            'comments': {
                'title': '备注',
                'type': 'string',
                'format': 'hTextarea',
                'maxLength':200
            },
            'maxAmount': {
                'title': '基金最大限额',
                'type': 'string',
                'format': 'hAmount'
            },
            'maxAmountType': {
                'title': '最大限额单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.maxAmountTypeOptions
            },
            'minAmount': {
                'title': '基金最小限额',
                'type': 'string',
                'format': 'hAmount'
            },
            'minAmountType': {
                'title': '最小限额单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.minAmountTypeOptions
            },
            'managementCost': {
                'title': '基金管理费',
                'type': 'string',
                'format': 'hAmount'
            },
            'trusteeFee': {
                'title': '基金托管费',
                'type': 'string',
                'format': 'hAmount'
            },
            'fundManagementCompany': {
                'title': '基金管理公司',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'fundCustodianInstitutions': {
                'title': '基金托管机构',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'fundSaleInstitutions': {
                'title': '基金销售机构',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'chargeType': {
                'title': '基金收费方式',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.chargeTypeOptions
            },
            'riskLevelInfo': {
                'title': '基金风险等级',
                'type': 'string',
                'format': 'hDefault',
                // 'titleMap': fundConstant.riskLevelOptions
            },
            'redemption': {
                'title': '期限内可否赎回',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.redemptionOptions
            },
            'dividend': {
                'title': '基金分红方式',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.dividendOptions
            },
            'partyId':{
                'title':'基金经理',
                'type':'string',
                'format':'hSelect',
                'titleMap':productManagerInfos
            },
            'pageRecommend': {
                'title': '是否首页推荐',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':[{
                    name:'是',
                    value:'1'
                },{
                    name:'否',
                    value:'0'
                }]
            }
        },
        'required':['userName','productName','productTypeId','manffacturerPartyId','externalProductCode',
        'brandName','productAmount','productAmountUomId','productFoundDate','statusId','partyId','maxAmount','maxAmountType',
        'minAmount','minAmountType','fundManagementCompany','fundCustodianInstitutions','fundSaleInstitutions','riskLevel',
        'chargeType','redemption','dividend','managementCost','trusteeFee']
    },


    //费率信息form
    rateForm: [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'rateTypeParentId',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'onChange':'vm.changeRateType(modelValue)'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'saleChannelTypeId',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'uomType',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'onChange':'vm.selectUnomType(modelValue)'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'workMore',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'workLess',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
       type: 'section',
       htmlClass: 'col-lg-6 col-md-6 col-sm-6',
       items: [{
           key: 'amountUomId',
           'divClass': 'col-lg-8 col-md-8 col-sm-8',
           'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
           'onChange': 'vm.changeAmountUom(modelValue)'
       }]
   }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'rateAmount',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'rateAmountOff',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
            'type': 'section',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6 ',
            'items': [{
                'type': 'label',
                'title': '生效日期',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }, {
                'key': 'rateFromDate',
                'divClass': 'col-lg-8 col-md-8 col-sm-8 mb-15',
                'dateOptions': {
                    'formatYear': 'yy',
                    'minDate': new Date(),
                    'startingDay': 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        },{
            'type': 'section',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6 ',
            'items': [{
                'type': 'label',
                'title': '失效日期',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }, {
                'key': 'rateThruDate',
                'divClass': 'col-lg-8 col-md-8 col-sm-8 mb-15',
                'opened': false,
                'dateOptions': {
                    'formatYear': 'yy',
                    'minDate': new Date(),
                    'startingDay': 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        }],
    //费率信息schema
    rateSchema: {
        'type': 'object',
        'properties': {
            'workLess': {
                'title': '适用下限',
                'type': 'string',
                'format': 'hAmount'
            },
            'workMore': {
                'title': '适用上限',
                'type': 'string',
                'format': 'hAmount'
            },
            'uomType': {
                'title': '适用单位类型',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.uomTypeOptions
            },
            'rateAmount': {
                'title': '原费率值',
                'type': 'string',
                'format': 'hAmount',

            },
            'amountUomId': {
                'title': '费率值单位',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.amountUomIdOptions
            },
            'rateAmountOff': {
                'title': '折扣费率值',
                'type': 'string',
                'format': 'hAmount'
            },
            'rateTypeParentId': {
                'title': '费率类型',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.parentTypeIdOptions
            },
            'saleChannelTypeId': {
                'title': '销售渠道',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.saleChannelTypeIdOptions
            },
            'rateFromDate':{
                'title':'生效日期',
                'type':'string',
                'format':'minDatePicker'
            },
            'rateThruDate':{
                'title':'失效日期',
                'type':'string',
                'format':'minDatePicker'
            }
        },
        required:['rateTypeParentId','saleChannelTypeId','workLess','workMore','rateAmount','amountUomId','rateAmountOff','rateFromDate','uomType','rateThruDate']
    },


    //基金经理form
    managerForm: [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'partyName',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'gender',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'birthDate',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'mothersMaidenName',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'educationBackground',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'graduateInsTitutions',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'corporateName',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'jobPosition',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'partyFromDate',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'partyThurDate',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'jobContent',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }],
    //基金经理schema
    managerSchema: {
        'type': 'object',
        'properties': {
            'partyName': {
                'title': '姓名',
                'type': 'string',
                'format': 'hDefault'
            },
            'gender': {
                'title': '性别',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.genderOptions
            },
            'birthDate': {
                'title': '出生日期',
                'type': 'string',
                'format': 'hDefault'
            },
            'mothersMaidenName': {
                'title': '国籍',
                'type': 'string',
                'format': 'hDefault'
            },
            'educationBackground': {
                'title': '学历',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.educationBackgroundOptions
            },
            'graduateInsTitutions': {
                'title': '毕业院校',
                'type': 'string',
                'format': 'hDefault'

            },
            'corporateName': {
                'title': '公司名称',
                'type': 'string',
                'format': 'hDefault'
            },
            'jobPosition': {
                'title': '工作职位',
                'type': 'string',
                'format': 'hDefault'
            },
            'partyFromDate': {
                'title': '开始时间',
                'type': 'string',
                'format': 'hDefault'
            },
            'partyThurDate': {
                'title': '结束时间',
                'type': 'string',
                'format': 'hDefault'
            },
            'jobContent': {
                'title': '工作内容',
                'type': 'string',
                'format': 'hDefault'
            }
        }
    },

};

module.exports = fundProductModalConstant;
