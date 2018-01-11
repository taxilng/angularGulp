'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var supplyTypeMap = require('./enum/supplyType.constant');
var cooperationStatusMap = require('./enum/cooperateStatus.constant');
var supplierModalConstant = {
    panelBanseInfoOptions: {
        title: '供应商信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'supplyName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'address',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'legalPersonName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'website',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'contactNo',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'supplyScale',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'unifiedSocialCreditCode',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'supplyType',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]
    }, {
        'type': 'section',
        'htmlClass': 'row',
        'items': [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'type': 'label',
                'title': '成立日期',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }, {
                'key': 'supplyFoundTime',
                'required': true,
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'opened': false,
                'readonly': true,
                'dateOptions': {
                    'formatYear': 'yy',
                    'maxDate': new Date(),
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
                'key': 'institutionCode',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'cooperationStatus',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'cardNo',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]
    },{
        'type': 'section',
        'htmlClass': 'row',
        'items': [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'type': 'label',
                'title': '合作日期',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }, {
                'key': 'cooperationTime',
                'required': true,
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'opened': false,
                'readonly': true,
                'dateOptions': {
                    'formatYear': 'yy',
                    'minDate': new Date(),
                    'startingDay': 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        }]
    }],

    investSchema: {
        'type': 'object',
        'properties': {
            'supplyName': {
                'title': '供应商名称',
                'type': 'string',
                'format': 'hDefault'
            },
            'address': {
                'title': '公司地址',
                'type': 'string',
                'format': 'hDefault'
            },
            'legalPersonName': {
                'title': '法人代表',
                'type': 'string',
                'format': 'hDefault'
            },
            'website': {
                'title': '公司网址',
                'type': 'string',
                'format': 'hDefault'
                // 'pattern':'/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/'
            },
            'contactNo': {
                'title': '联系方式',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':12
            },
            'supplyScale': {
                'title': '公司规模',
                'type': 'string',
                'format': 'hDefault'
            },
            'unifiedSocialCreditCode': {
                'title': '工商行政代码',
                'type': 'string',
                'format': 'hDefault',
                // 'pattern':'^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{18}$',
                'maxLength':18
                // 'minLength':18
            },
            'supplyType': {
                'title': '公司行业',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': supplyTypeMap
            },
            'supplyFoundTime': {
                'title': '成立日期',
                'type': 'string',
                'format': 'minDatePicker',
                'readonly': true,
            },
            'institutionCode': {
                'title': '机构代码',
                'type': 'string',
                'format': 'hDefault'
            },
            'cooperationStatus': {
                'title': '合作状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': cooperationStatusMap
            },
            'cardNo': {
                'title': '结算账号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'cooperationTime':{
                'title':'合作开始日期',
                'type':'string',
                'format':'minDatePicker',
                'readonly':true
            }
        },
        required:['supplyName','address','legalPersonName','website','contactNo','supplyScale','unifiedSocialCreditCode','supplyType','supplyFoundTime','institutionCode','cooperationStatus','cardNo','cooperationTime']
    }
};

module.exports = supplierModalConstant;
