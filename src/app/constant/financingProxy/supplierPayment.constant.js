'use strict';

var clearingStatusConstant = require('./enum/clearingStatus.constant');

var actionTemplate = 
    '<div class="ui-grid-cell-contents">' +
    // '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.settingPayment(row)" ng-bind="row.entity.status == \'0\'? \'清算\':\'结算\'"></a>'+
    '<a href="javascript:;" class="opr-edit" ng-if="row.entity.status == \'0\'" ng-click="grid.appScope.clearingPayment(row)">清算</a>' +
    '<a href="javascript:;" class="opr-detail" ng-if="row.entity.status == \'1\'" ng-click="grid.appScope.settlePayment(row)">结算</a>' + 
    '</div>';

var supplierPaymentConstant = {
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
            'clearingTime': {
                'title': '清算日期',
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
            htmlClass: 'col-lg-12 col-md-12 col-sm-12',
            items: [{
                key: 'clearingTime',
                readonly: true,
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                divClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
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
        }, {
            'htmlClass': 'col-lg-12 col-md-12 col-sm-12 text-center mt-14',
            'type': 'button',
            'style': 'btn  btn-sm btn-margin-r btn-blue btn-reset',
            'title': '查询',
            'onClick': 'vm.search({})'
        }]
    }],

    investGridOptions:{
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        columnDefs: [{
            name:'供应商名称',
            field:'supplyName'
        },{
            name: '清算日期',
            field: 'clearingTime',
            cellFilter:'timeFormatFilter'
        }, {
            name: '上一清算日',
            field: 'previousClearingTime'
        }, {
            name: '借方金额',
            field: 'debitAmount'
        }, {
            name: '贷方金额',
            field: 'creditAmount'
        }, {
            name: '手续费',
            field: 'commission'
        }, {
            name: '银行卡号',
            field: 'cardNo'
        }, {
            name: '开户行',
            field: 'depositBank'
        }, {
            name: '清算金额',
            field: 'clearingAmount'
        }, {
            name: '清算状态',
            field: 'status',
            cellFilter:'titleMapFilter:'+ JSON.stringify(clearingStatusConstant)
        }, {
            name:'操作',
            field:'adjustId',
            cellTemplate:actionTemplate
        }],
        data: []
    }
}

module.exports = supplierPaymentConstant;
