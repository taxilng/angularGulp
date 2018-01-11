'use strict';


var investmentConstant = require('./enum/investment.constant');

var actionTemplate =
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.updatePlanConfig(row)">修改</a>' +
    '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.deletePlanConfig(row)">删除</a>' + 
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.prodConfigDetail(row)">详情</a>' +'</div>';

var investPlanConfigModalConstant = {
        // 基本信息面板
    formPanelOptions: {
        title: '投资方案推荐规则管理',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

    //form 表单
    investFormOptions: [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'planId',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'planName',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'savingDepositProp',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7',
            percentSign: true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'cashDepositProp',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7',
            percentSign: true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'fixedIncomeProp',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7',
            percentSign: true
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'floatIncomeProp',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7',
            percentSign: true
        }]
    }],

    //schema
    investSchema: {
        'type': 'object',
        'properties': {
            'planId': {
                'title': '方案编号',
                'type': 'string',
                'format': 'hDefault',
                'readonly': true,
            },
            'planName': {
                'title': '方案名称',
                'type': 'string',
                'format': 'hDefault',
                'readonly': true,
            },
            'savingDepositProp': {
                'title': '储蓄存款类比重',
                'type': 'string',
                'format': 'hDefault'
            },
            'cashDepositProp': {
                'title': '现金存款类比重',
                'type': 'string',
                'format': 'hDefault'
            },
            'fixedIncomeProp': {
                'title': '固定收益类比重',
                'type': 'string',
                'format': 'hDefault'
            },
            'floatIncomeProp': {
                'title': '浮动收益类比重',
                'type': 'string',
                'format': 'hDefault'
            }
        },
    }
}

module.exports = investPlanConfigModalConstant;
