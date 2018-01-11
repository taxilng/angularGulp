'use strict';


var investmentConstant = require('./enum/investment.constant');

var actionTemplate =
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.prodConfigDetail(row)">详情</a>' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.updatePlanConfig(row)">修改</a>' +
    // '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.deletePlanConfig(row)">删除</a>' + 
    '</div>';

var investPlanConfigConstant = {
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
        'type': 'object',
        'properties': {
            'planId': {
                'title': '方案编号',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':investmentConstant.planId
            },
            'planName': {
                'title': '方案名称',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':investmentConstant.planName
            },
            'period': {
                'title': '投资条件',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':investmentConstant.period
            },
            'riskLevel': {
                'title': ' ',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':investmentConstant.riskLevel
            }
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
                'key': 'planId',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'period',
                'divClass': 'col-lg-6 col-md-6 col-sm-6',
                'labelHtmlClass': 'col-lg-6 col-md-6 col-sm-6'
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-2 col-md-2 col-sm-2',
            items: [{
                'key': 'riskLevel',
                'divClass': 'col-lg-12 col-md-12 col-sm-12',
                'labelHtmlClass': ''
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'planName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3'
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
            'onClick': 'vm.search({})'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '重置',
            'onClick': 'vm.resetAll();'
        }]
    }],

    investGridOptions:{
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name:'方案编号',
            field:'planId'
        },{
            name: '方案名称',
            field: 'planName'
        },{
            name:'投资条件',
            field:'investmentCond'
        }, {
            name: '储蓄存款类比重',
            field: 'savingDepositProp'
        }, {
            name: '薪金存款类比重',
            field: 'cashDepositProp'
        }, {
            name: '固定收益类比重',
            field: 'fixedIncomeProp'
        }, {
            name: '浮动收益类比重',
            field: 'floatIncomeProp'
        }, {
            name:'操作',
            field:'adjustId',
            cellTemplate:actionTemplate,
            width:180
        }],
        data: []
    }
}

module.exports = investPlanConfigConstant;
