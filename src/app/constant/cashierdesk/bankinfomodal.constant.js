'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var cardTypeInfo = require('./enum/cardtype.constant');


var bankinfomodalConstant = {
    // 基本信息面板
    formPanelOptions: {
        title: '银行信息管理',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

    //form 表单
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'bankName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输银行名称',
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
                'key': 'bankId',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输银行行号',
                'required': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'cardType',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请选择卡类型',
                'required': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'singleLimit',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输单笔限额',
                'min': '0',
                'max': '9999999999999',
                'required': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'singleDayMoneyLimit',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输单日限额',
                'required': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'singleDayTradeCountLimit',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输单日限次',
                'min': '0',
                'max': '99999999',
                'required': true,
                'onKeyup': function($event, form, object) {
                    if ($event.target.value.length > 8) {
                        $event.target.value = $event.target.value.substr(0, 8);
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'singleMonthMoneyLimit',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输单月限额',
                'required': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'singleMonthTradeLimit',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输单月限次',
                'min': '0',
                'max': '99999999',
                'required': true,
                'onKeyup': function($event, form, object) {
                    if ($event.target.value.length > 8) {
                        $event.target.value = $event.target.value.substr(0, 8);
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-12 col-md-12 col-sm-12',
            items: [{
                'key': 'description',
                'divClass': 'col-lg-9 col-md-9 col-sm-9',
                'labelHtmlClass': 'col-lg-2 col-md-2 col-sm-2',
                'placeholder': '请输备注信息'
            }]
        }]
    }],

    //schema
    investSchema: {
        'type': 'object',
        'properties': {
            'bankName': {
                'title': '银行名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'bankId': {
                'title': '银行行号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'cardType': {
                'title': '卡种',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': cardTypeInfo
            },
            'singleLimit': {
                'title': '单笔限额',
                'type': 'string',
                'format': 'hAmount'
            },
            'singleDayMoneyLimit': {
                'title': '单日限额',
                'type': 'string',
                'format': 'hAmount'
            },
            'singleDayTradeCountLimit': {
                'title': '单日限次',
                'type': 'integer',
                'format': 'hDefault'
            },
            'singleMonthMoneyLimit': {
                'title': '单月限额',
                'type': 'string',
                'format': 'hAmount'
            },
            'singleMonthTradeLimit': {
                'title': '单月限次',
                'type': 'integer',
                'format': 'hDefault'
            },
            'description': {
                'title': '备注',
                'type': 'string',
                'format': 'hTextarea',
                'maxLength': 200
            }
        },
    }
}

module.exports = bankinfomodalConstant;
