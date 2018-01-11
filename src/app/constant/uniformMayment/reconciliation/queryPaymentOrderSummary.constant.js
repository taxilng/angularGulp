'use strict';
var tranStatusConstant = require('./enum/tranStatus.constant');
var oldMediumConstant = require('./enum/oldMedium.constant');
var objectData = require('./enum/objectData.constant');
var multiSelect = require('../../../components/template/multiSelect.html');
var outObjectData = [];
var objectDataConstant = [];


var processReceivePaymentTemplate = '<a class="opr-del" ng-click="grid.appScope.processReceivePayment(row)" ng-show="grid.appScope.processReceivePaymentShow(row.entity.statusId)">订单收付款</a>';
var cancelPaymentOrderTemplate = '<a class="opr-edit" ng-click="grid.appScope.cancelPaymentOrder(row)" ng-show="grid.appScope.cancelPaymentOrderShow(row.entity.statusId)">订单冲正</a>';

var queryPaymentOrderSummaryConstant = {

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
            'checkingSystemId':{
                'title':'订单类型',
                'type':'string',
                'format':'hSelect',
                'titleMap': tranStatusConstant
            },
            'startDateTime':{
                'title':'起始日期',
                'type':'string',
                'format':'date'
            },
            'endDateTime':{
                'title':'截止日期',
                'type':'string',
                'format':'date'
            },
            'oldMedium':{
                'title':'发起渠道',
                'type':'string',
                'format':'hSelect',
                'titleMap': oldMediumConstant
            },
            'amount': {
                    'title': '订单金额',
                    'type': 'string',
                    'format': 'hDefault'
            },
            'payerAccountNumber': {
                    'title': '付款人账号',
                    'type': 'integer',
                    'format': 'hDefault',
                    'maxLength':20
            },
            'payeeAccountNumber': {
                    'title': '收款人账号',
                    'type': 'integer',
                    'format': 'hDefault',
                    'maxLength':20
            },
            'orderTypeId': {
                    'title': '路由订单类型',
                    'type': 'string',
                    'format':'hSelect',
                    // 'titleMap': [{name:'--请选择--',value:''},{name:'单笔',value:'SINGLE'},{name:'批量',value:'BATCH'}]
                    'titleMap': [{name:'--请选择--',value:''},{name:'单笔',value:'SINGLE'}]
            },
            'statusId': {
                    'title': '订单状态',
                    'type': 'string',
                    'format': 'hSelect',
                    'titleMap': []
            }
       }
    },
    // 表单输入
    investFormOptions: [{
            type:'section',
            htmlClass:'row',
            items: [
            {
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items:[{
                    'key':'checkingSystemId',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'onChange': 'vm.checkingSystemIdOnChange(modelValue)'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items:[{
                    'key':'statusId',
                    'type': 'template',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'template': multiSelect,
                    'objectData': objectDataConstant,
                    'outObjectData': tranStatusConstant,
                    'localLang': {
                        selectAll: '全选',
                        selectNone: '重置',
                        reset: '',
                        search: '搜索...',
                        nothingSelected: ''
                    }
                }]
            },{
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items: [{
                    key: 'startDateTime',
                    readonly: true,
                    labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                    divClass: 'col-lg-8 col-md-8 col-sm-8 col-xs-11',
                    opened: false,
                    dateOptions: {
                        formatYear: 'yy',
                        // maxDate: new Date(2020, 5, 22),
                        maxDate: new Date(),
                        startingDay: 1
                    },
                    onClick: function($event, form) {
                        form.opened = true;
                    }
                }]
            },{
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items: [{
	                key: 'endDateTime',
	                readonly: true,
	                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
	                divClass: 'col-lg-8 col-md-8 col-sm-8 col-xs-11',
	                opened: false,
	                dateOptions: {
	                    formatYear: 'yy',
	                    // maxDate: new Date(2020, 5, 22),
	                    maxDate: new Date(),
	                    startingDay: 1
	                },
	                onClick: function($event, form) {
	                    form.opened = true;
	                }
	            }]
            },
            // {
            //     type:'section',
            //     htmlClass:'col-lg-4 col-md-4 col-sm-4',
            //     items:[{
            //         'key':'oldMedium',
            //         'divClass': 'col-lg-8 col-md-8 col-sm-8',
            //         'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            //     }]
            // },
            {
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items:[{
                    'key':'amount',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items:[{
                    'key':'payerAccountNumber',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items:[{
                    'key':'payeeAccountNumber',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-4 col-md-4 col-sm-4',
                items:[{
                    'key':'orderTypeId',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            }]
        },{
        	'type': 'section',
	        'htmlClass': 'text-center mt-14',
	        'items': [{
	            'htmlClass': 'col-xs-6 text-right',
	            'type': 'button',
	            'style': 'btn-blue btn-reset btn-margin-r',
	            'title': '查询',
	            'onClick': 'vm.queryPaymentOrderRequestFun({})'
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
            width: 60,
            field: 'checkbox',
            displayName: '序号',
            cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
        }, {
            name: ' 交易时间',
            field: 'orderDate'
        }, {
            name: '订单金额',
            field: 'amount'
        },{
            name: '币种',
            field: 'currencyUomId'
        },{
            name: ' 订单状态',
            field: 'statusId',
            cellFilter: 'titleMapFilter:' + JSON.stringify(objectData.tranStatus0)
        },{
            width: 150,
            name: '付款人账号',
            field: 'payerAccountNumber'
        },{
            width: 150,
            name: '付款人户名',
            field: 'payerAccountName'
        },{
            name: '收款人账号',
            field: 'payeeAccountNumber'
        },{
            name: '收款人户名',
            field: 'payeeAccountName'
        }
        // ,{
        //     name: '同步订单状态',
        //     field: 'remark',
        //     width: 200,
        //     cellTemplate: processReceivePaymentTemplate+cancelPaymentOrderTemplate
        // }
        ],
        data: []
    }
}

module.exports = queryPaymentOrderSummaryConstant;
