'use strict';
var objectData = require('./enum/objectData.constant');
var reCheckingTemplate = '<a class="opr-edit" ng-click="grid.appScope.queryUnknownPOStatus(row)">同步订单</a>';

var queryUnknownPaymentConstant = {

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
            'startDateTime':{
                'title':'起始日期',
                'type':'string',
                'format':'date'
            },
            'endDateTime':{
                'title':'截止日期',
                'type':'string',
                'format':'date'
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
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
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
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
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
            }]

        },{
        	'type': 'fieldset',
	        'htmlClass': 'text-center mt-14',
	        'items': [{
	            'htmlClass': 'col-xs-6 text-right',
	            'type': 'button',
	            'style': 'btn-blue btn-reset btn-margin-r',
	            'title': '查询',
	            'onClick': 'vm.sbumitQueryPOSummary({})'
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
            name: '付款人账号',
            field: 'payerAccountNumber'
        },{
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
        //     width: 120,
        //     cellTemplate: reCheckingTemplate
        // }
        ],
        data: []
    }
}

module.exports = queryUnknownPaymentConstant;
