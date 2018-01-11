'use strict';
var checkingSystemIdConstant = [];
var reCheckingTemplate = 
    '<div class="ui-grid-cell-contents">' +
    '<a class="opr-edit" ng-if="grid.appScope.reChecking(row.entity.statusId,0)" ng-click="grid.appScope.reChecking(row)">再次对账</a>'+
    '<a class="opr-del" ng-if="grid.appScope.checking(row.entity.statusId,1)" ng-click="grid.appScope.checking(row)">继续对账</a>' + 
    '</div>';

var queryErrorCheckingResultConstant = {

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
                'title':'对账系统',
                'type':'string',
                'format':'hSelect',
                'titleMap': checkingSystemIdConstant
            },
            'checkingStartDate':{
                'title':'对账日期',
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
                items:[{
                    'key':'checkingSystemId',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'fieldhtmlclass':'ess-input'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
                items: [{
	                key: 'checkingStartDate',
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
	            'onClick': 'vm.queryCheckingRequestFun({})'
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
            name: '对账系统',
            field: 'checkingSystemName'
        }, {
            name: '对账日期',
            field: 'checkingDate'
        }, {
            name: '开始日期',
            field: 'checkingStartDate'
        }, {
            name: '结束日期',
            field: 'checkingEndDate'
        }, {
            name: '对账状态',
            field: 'statusName'
        },{
            name: '备注说明',
            field: 'remark'
        },{
            name: '操作',
            field: 'statusId',
            width: 150,
            cellTemplate: reCheckingTemplate
        }],
        data: []
    }
}

module.exports = queryErrorCheckingResultConstant;
