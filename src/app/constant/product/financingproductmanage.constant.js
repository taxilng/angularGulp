'use strict';

var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var actionTemplate = 
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editmode(row)">修改</a>' +
    '<a href="javascript:;" class="opr-del" ng-if="grid.appScope.productOnSale(row,\'productOnSale\')" ng-click="grid.appScope.productOnSale(row)">上架</a>' +
    '<a href="javascript:;" class="opr-del" ng-if="grid.appScope.productOffSale(row,\'productOffSale\')" ng-click="grid.appScope.productOffSale(row)">下架</a>' +
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailmode(row)">详情</a>' + '</div>'

var paymentMethodType = [{
    'value': '01',
    'name': '按月付息，到期还本'
}, {
    'value': '02',
    'name': '一次性还本付息'
}];
var statusOptions = [{
    value: 'ALL',
    name: '全部'
}, {
    value: 'ON_SALE',
    name: '在售'
}, {
    value: 'OFF_SALE',
    name: '已下架'
}];

var finanacingProductManageConstant = {
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
    investFormOptions: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'productName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        },/*{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'externalProductCode',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }, */{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'status',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }]
    }, {
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
            /*'productId': {
                'title': '产品Id',
                'type': 'string',
                'format': 'hDefault'
            },*/
            'externalProductCode':{
                'title':'外部产品代码',
                'type':'string',
                'format':'hDefault'
            },
            'productName': {
                'title': '产品名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':'20'
            },
            'status': {
                'title': '产品状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': statusOptions
            }
        }
    },

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '产品名称',
            field: 'productName'
        }, {
            name: '兑付方式',
            field: 'paymentMethod'
            //cellFilter: 'titleMapFilter:' + JSON.stringify(paymentMethodType),
        }, {
            name: '年化收益',
            field: 'price'
        }, {
            name: '理财期限',
            field: 'productTerm'
        }, {
            name: '起购金额',
            field: 'startAmount'
        }, {
            name: '剩余可投金额',
            field: 'availableAmount'

        }, {
            name: '产品状态',
            field: 'status',
            cellFilter: 'titleMapFilter:' + JSON.stringify(statusOptions)
        }, {
            name: '操作',
            field: 'adjustId',
            cellTemplate: actionTemplate,
            width:200
        }],
        data: []
    }

};

module.exports = finanacingProductManageConstant;
