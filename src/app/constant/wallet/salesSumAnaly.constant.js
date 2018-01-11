'use strict';

var queryDimensionConstant = require('./enum/queryDimension.constant');

var salesSumAnalyConstant = {
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
            'startDay': {
                'title': '开始时间',
                'type': 'string',
                'format': 'date'
            },
            'endDay': {
                'title': '结束时间',
                'type': 'string',
                'format': 'date'
            },
            'queryDimension': {
                'title': '分析维度',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': queryDimensionConstant
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
                key: 'startDay',
                readonly: true,
                labelHtmlClass: 'col-lg-3 col-md-3 col-sm-3 col-xs-11',
                divClass: 'col-lg-7 col-md-7 col-sm-7 col-xs-11',
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
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'endDay',
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
                'key': 'queryDimension',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3',
                'onChange': 'vm.selectDimension(modelValue)'
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
            'onClick': 'vm.search()'
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
            name:'产品名称',
            field:'productName'
        },{
            name:'渠道名称',
            field:'channelName',
            visible: false
        },{
            name: '交易金额',
            field: 'transAmount'
        }],
        data: []
    },
}

module.exports = salesSumAnalyConstant;
