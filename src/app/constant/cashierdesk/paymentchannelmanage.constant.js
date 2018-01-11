'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var actionTemplate = 
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editpaymentchannelmode(row)">修改</a>' + 
    '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.delpaymentchannelmode(row)">删除</a>' + 
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailpaymentchannelmode(row)">详情</a>' + 
    '</div>';

var productOptions = [{
    'name': '支付产品1',
    'value': 'prod01'
}, {
    'name': '支付产品2',
    'value': 'prod02'
}];

var paymentChannelManage = {

    //pannel
    formPanelOptions: {
        title: '查询条件',
        hasIcon: false,
        panelClass: 'form-panel'
    },
    gridPanelOptions: {
        title: '查询内容',
        hasIcon: false,
        panelClass: 'grid-panel'
    },
    //form
    investFormOption: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'paymentChannelsName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'channelCode',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }]
    }, /*{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'channelsFee',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'productId',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }]
    }, */{
        'type': 'fieldset',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right',
            'type': 'button',
            'style': 'btn-blue btn-reset btn-margin-r',
            'title': '查询',
            'onClick': 'vm.searchInfo()'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '重置',
            'onClick': 'vm.reset()'
        }]

    }],
    //schema
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
                'type': 'string',
                'format': 'hAmount'
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
        }
    },
    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [{
            name: '支付渠道名称',
            field: 'paymentChannelsName'
        }, {
            name: '渠道手续费',
            field: 'channelsFee'
        }, {
            name: '渠道编码',
            field: 'channelCode'
        }, {
            name: '支付产品编号',
            field: 'productId'
                //cellFilter: 'titleMapFilter:' + JSON.stringify(productOptions),
        }, {
            name: '操作',
            field: 'adjustId',
            cellTemplate: actionTemplate
        }],
        data: []
    }

};
module.exports = paymentChannelManage;
