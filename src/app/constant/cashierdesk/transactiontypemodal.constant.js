'use strict';

var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var actionTemplate = '<div class="ui-grid-cell-contents"><input type="checkbox" ng-checked ="grid.appScope.defaultCheck(row)"  ng-click="grid.appScope.addToCheck(row);"></div>';

var cardTypeConstant = [{
    value: '01',
    name: '借记卡'
}, {
    value: '02',
    name: '贷记卡'
}];

var transactionTypeModalConstant = {
    channelArr: [{
        value: '01',
        name: 'PC'
    }, {
        value: '02',
        name: 'APP'
    }],

    //pannel
    panelBanseInfoOptions: {
        title: '交易类型信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    panelPayMethodInfoOptions: {
        title: '交易类型支持的支付方式',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    panelBankInfoOptions: {
        title: '交易类型支持的银行卡',
        hasIcon: false,
        hasLine: true,
        panelClass: 'gridform-panel'
    },
    //
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'transactionTypeName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
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
                'key': 'transactionTypeCode',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'required': true,
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
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
                'key': 'englishFlag',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'required': true
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-12 col-md-12 col-sm-12',
            items: [{
                'key': 'discription',
                'divClass': 'col-lg-9 col-md-9 col-sm-9',
                'labelHtmlClass': 'col-lg-2 col-md-2 col-sm-2'
            }]
        }]
    }],

    investSchema: {
        'type': 'object',
        'properties': {
            'transactionTypeName': {
                'title': '交易类型名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'transactionTypeCode': {
                'title': '交易类型编码',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20,
            },
            'englishFlag': {
                'title': '英文标识',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20,
            },
            'discription': {
                'title': '描述',
                'type': 'string',
                'format': 'hTextarea',
                'maxLength': 200
            }
        }
    },

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [{
            name: '序号',
            field: 'checkbox',
            cellTemplate: actionTemplate,
            width: 100
        }, {
            name: '银行名称',
            field: 'bankName',
            width: 200
        }, {
            name: '银行行号',
            field: 'bankId',
            width: 200
        }, {
            name: '卡种',
            field: 'cardType',
            cellFilter: 'titleMapFilter:' + JSON.stringify(cardTypeConstant),
            width: 150
        }, {
            name: '单笔限额/元',
            field: 'singleLimit',
            width: 150
        }, {
            name: '单日限额/元',
            field: 'singleDayMoneyLimit',
            width: 150
        }],
        data: []
    }
};

module.exports = transactionTypeModalConstant;
