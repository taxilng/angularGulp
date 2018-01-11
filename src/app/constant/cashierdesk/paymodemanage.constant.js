'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var methodLabelConstant = require('./enum/methodLabel.constant');
var actionTemplate =
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editPaymode(row)">修改</a>' +
    '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.deletePaymode(row)">删除</a>' +
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailPaymode(row)">详情</a>' +
    '</div>'
var paymodemanageConstant = {

    // 查询面板
    formPanelOptions: {
        title: '查询条件',
        hasIcon: true,
        iconClass: 'icon-search',
        panelClass: 'form-panel'
    },

    gridPanelOptions: {
        title: '查询内容',
        hasIcon: true,
        iconClass: 'icon-content',
        panelClass: 'grid-panel'
    },
    // 表单头部
    investSchema: {
        type: 'object',
        properties: {
            'payMethodName': {
                'title': '支付方式名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            }, 'methodLabel': {
                'title': '分类标签',
                'type': 'string',
                'format': 'hSelect',
                'class': 'form-control select2',
                'placeholder': '请输入查询内容',
                titleMap: [{
                    value: '',
                    name: '全部'
                }, {
                    value: 'QUICK',
                    name: '快捷支付'
                }, {
                    value: 'ACCOUNT',
                    name: '钱包支付'
                }, {
                    value: 'OTHER',
                    name: '第三方支付'
                }]
            }
            /*'createDate': {
                'type': 'string',
                'format': 'minDatePicker'
            },
            'endDate': {
                'type': 'string',
                'format': 'maxDatePicker'
            }*/
        }
    },
    // 表单输入
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'payMethodName',
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
                divClass: 'col-lg-6 col-md-6 col-sm-6',
                'onKeyup': function ($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'methodLabel',
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
                divClass: 'col-lg-6 col-md-6 col-sm-6'
            }]
        }/*{
            'type': 'section',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6 no-padding-left',
            'items': [{
                'type': 'label',
                'title': '查询时间：',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 text-left'
            }, {
                'key': 'createDate',
                'required': true,
                'divClass': 'col-lg-4 col-md-4 col-sm-4 text-left',
                'opened': false,
                'dateOptions': {
                    'formatYear': 'yy',
                    'maxDate': new Date(),
                    'startingDay': 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }, {
                'type': 'adjecent',
                'title': '至',
                'labelHtmlClass': 'col-lg-1 col-md-1 col-sm-1 toSpan'
            }, {
                'key': 'endDate',
                'required': true,
                'divClass': 'col-lg-4 col-md-4 col-sm-4 text-left',
                'opened': false,
                'dateOptions': {
                    'formatYear': 'yy',
                    'maxDate': new Date(),
                    'startingDay': 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        }*/]
    }],

    methodLabel: [{
        value: 'QUICK',
        name: '快捷支付'
    }, {
        value: 'ACCOUNT',
        name: '钱包支付'
    }, {
        value: 'OTHER',
        name: '第三方支付'
    }],
    // 表格
    investGridOptions: {
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [{
            name: '支付方式名称',
            field: 'payMethodName'
        }, {
            name: '分类标签',
            field: 'methodLabel',
            cellFilter: 'titleMapFilter:' + JSON.stringify(methodLabelConstant)
        }, /*{
            name: '创建人',
            field: 'createPerson',
            width: 110
        }, {
            name: '创建时间',
            field: 'createDate',
            width: 120
        },*/ {
            name: '描述',
            field: 'description'
        }, {
            name: '操作',
            field: 'adjustId',
            cellTemplate: actionTemplate,
            width: 320
        }],
        data: []
    }
}

module.exports = paymodemanageConstant;
