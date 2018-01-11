'use strict';


var liquidationConstant = require('./enum/liquidation.constant');
var rateTypeConstant = require('./enum/rateType.constant');
var proxyStatusConstant = require('./enum/proxyStatus.constant');

var actionTemplate =
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editProxyInfo(row)">修改</a>' +
    '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.effectProxyInfo(row)" ng-bind="row.entity.status == \'0\'? \'生效\':\'失效\'"></a>' +
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailProxyInfo(row)">详情</a>' + '</div>';

var proxyAgreementConstant = {
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
            'startDate': {
                'title': '开始时间',
                'type': 'string',
                'format': 'date'
            },
            'endDate': {
                'title': '结束时间',
                'type': 'string',
                'format': 'date'
            },
            'supplyName': {
                'title': '供应商名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'status': {
                'title': '是否生效',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':proxyStatusConstant
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
                key: 'startDate',
                readonly: true,
                labelHtmlClass: 'col-lg-3 col-md-3 col-sm-3 col-xs-11',
                divClass: 'col-lg-7 col-md-7 col-sm-7 col-xs-11',
                opened: false,
                dateOptions: {
                    formatYear: 'yy',
                    maxDate: null,
                    // minDate: new Date(),
                    startingDay: 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'endDate',
                readonly: true,
                labelHtmlClass: 'col-lg-3 col-md-3 col-sm-3 col-xs-11',
                divClass: 'col-lg-7 col-md-7 col-sm-7 col-xs-11',
                opened: false,
                dateOptions: {
                    formatYear: 'yy',
                    // maxDate: new Date(),
                    minDate: null,
                    startingDay: 1
                },
                onClick: function($event, form) {
                    form.opened = true;
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
                'key': 'supplyName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3',
                 onBlur: function($event, form) {
                    alert()
                }
            }]

        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'status',
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
            name:'代理协议编号',
            field:'agencyId'
        },{
            name:'供应商名称',
            field:'supplyName'
        },{
            name: '费率方式',
            field: 'rateType',
            cellFilter:'titleMapFilter:'+ JSON.stringify(rateTypeConstant)
        }, {
            name: '基金名称',
            field: 'productName'
        }, {
            name: '费率',
            field: 'rateAmount'
        }, {
            name: '清算方式',
            field: 'liquidationType',
            cellFilter:'titleMapFilter:'+ JSON.stringify(liquidationConstant.type)
        }, {
            name: '清算日',
            field: 'liquidationDate'
        }, {
            name:'清算工具',
            field: 'liquidationTool',
            cellFilter:'titleMapFilter:'+ JSON.stringify(liquidationConstant.tool)
        }, {
            name: '协议时间',
            field: 'agreementDate',
            cellFilter: 'timeFormatFilter'
        }, {
            name:'状态',
            field: 'status',
            cellFilter:'titleMapFilter:'+ JSON.stringify(proxyStatusConstant)
        }, {
            name:'操作',
            field:'adjustId',
            cellTemplate:actionTemplate,
            width:180
        }],
        data: []
    }
}

module.exports = proxyAgreementConstant;
