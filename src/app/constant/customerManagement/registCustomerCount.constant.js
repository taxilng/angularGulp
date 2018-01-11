'use strict';


var userlevelConstant = require('./enum/userlevel.constant');
var cardtypeConstant = require('./enum/cardtype.constant');
var registCustomerCountConstant = {
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
            'startTime': {
                'title': '开始时间',
                'type': 'string',
                'format': 'date'
            },
            'endTime': {
                'title': '结束时间',
                'type': 'string',
                'format': 'date'
            },
            'userLevel': {
                'title': '用户等级',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': userlevelConstant
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
                key: 'startTime',
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
        },{
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                key: 'endTime',
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
        },{
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'userLevel',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
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
            name:'客户ID',
            field:'userId'
        },{
            name: '手机号',
            field: 'mobile'
        }, {
            name: '用户姓名',
            field: 'userName'
        }, {
            name: '证件类型',
            field: 'cerType',
            cellFilter:'titleMapFilter:'+ JSON.stringify(cardtypeConstant)
        }, {
            name: '证件号码',
            field: 'cerNum'
        }, {
            name: '用户等级',
            field: 'userLevel',
            cellFilter: 'titleMapFilter:' + JSON.stringify(userlevelConstant)
        },{
            name:'注册时间',
            field: 'registerTime',
            cellFilter:'timeFormatFilter'
        }],
        data: []
    }
}

module.exports = registCustomerCountConstant;
