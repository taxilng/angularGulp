'use strict';
var checkingSystemIdConstant = [];
var isAllConstant = require('./enum/isAll.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-edit opr-leftbtn"  ng-click="grid.appScope.handleSetInfo(row)">处理</a>' +
    '<a class="opr-detail" ng-click="grid.appScope.detail(row)">查看</a>' +
    '</div>';

var queryCheckingGroupViewConstant = {
    // 查询面板
    formPanelOptions: {
        title: '查询条件',
        hasIcon: true,
        iconClass: 'icon-search',
        panelClass: 'form-panel'
    },
    // 返回结果面板
    gridPanelOptions: {
        title: '查询内容',
        hasIcon: true,
        iconClass: 'icon-content',
        panelClass: 'grid-panel'
    },
    // 表单头部
    investSchema: {
        'type': 'object',
        'properties': {
            'checkingSystemId': {
                'title': '对账系统',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':checkingSystemIdConstant
            },
            'isAll': {
                'title': '状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': isAllConstant
            },
            'checkingStartDate': {
                'title': '对账日期',
                'type': 'string',
                'format': 'date'
            }
        }
    },
    // 表单输入
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'checkingSystemId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'fieldhtmlclass': 'ess-input'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'isAll',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                key: 'checkingStartDate',
                readonly: true,
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                divClass: 'col-lg-8 col-md-8 col-sm-8 col-xs-11',
                opened: false,
                dateOptions: {
                    formatYear: 'yy',
                    maxDate: new Date(),
                    // minDate: new Date(),
                    startingDay: 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
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
            'onClick': 'vm.searchErrorCheckingResultFun({})'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '重置',
            'onClick': 'vm.resetAll()'
        }]
    }],

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            field: 'checkbox',
            displayName: '序号',
            cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>',
            width: 60
        }, {
            name: '交易流水',
            field: 'transactionId',
            width: 200
        }, {
            name: '金额',
            field: 'amount'
        }, {
            name: '交易状态',
            field: 'transStatus'
        }, {
            name: '对账状态',
            field: 'statusId'
        }, {
            name: '处理方式',
            field: 'adjustId'
        }, {
            name: '操作',
            field: 'caozuo',
            cellTemplate: actionTemplate
        }],
        data: []
    }
}

module.exports = queryCheckingGroupViewConstant;
