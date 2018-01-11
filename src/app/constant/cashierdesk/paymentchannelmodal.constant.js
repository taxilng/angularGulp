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

var paymentChannelModalConstant = {
    panelBanseInfoOptions: {
        title: '支付渠道信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    panelBankInfoOptions: {
        title: '渠道支持的银行卡信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'gridform-panel'
    },
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'paymentChannelsName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'channelCode',
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
                'key': 'channelsFee',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'max':'99999999'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'productId',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]
    }],

    investSchema: {
        type: 'object',
        properties: {
            'paymentChannelsName': {
                'title': '支付渠道名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'channelsFee': {
                'title': '渠道手续费',
                'type': 'number',
                'format': 'hDefault'
            },
            'channelCode': {
                'title': '渠道编码',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'productId': {
                'title': '支付产品编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            }
        },
        required:['paymentChannelsName','channelCode','channelsFee','productId']
    },

    //Griad
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '序号',
            field: 'checkbox',
            cellTemplate: actionTemplate,
            width: 100
        }, {
            name: '银行名称',
            field: 'bankName',
            width: 150
        }, {
            name: '银行行号',
            field: 'bankId',
            width: 160
        }, {
            name: '卡种',
            field: 'cardType',
            cellFilter: 'titleMapFilter:' + JSON.stringify(cardTypeConstant),
            width: 110
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
}

module.exports = paymentChannelModalConstant;
