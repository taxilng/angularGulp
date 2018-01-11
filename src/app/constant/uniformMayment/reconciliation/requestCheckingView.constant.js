'use strict';
var checkingSystemIdConstant = [];

var queryErrorCheckingResultConstant = {

    // 查询面板
    formPanelOptions: {
        title: '日终对账',
        hasIcon: true,
        iconClass: 'icon-search',
        panelClass: 'form-panel'
    },

	// 表单头部
	investSchema: {
       'type': 'object',
       'properties': {
            'dataSource':{
                'title':'对账系统',
                'type':'string',
                'format':'hSelect',
                'titleMap': checkingSystemIdConstant
            },
            'checkingBeginDate':{
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
                    'key':'dataSource',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
                items: [{
	                key: 'checkingBeginDate',
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
	            'title': '对账',
	            'onClick': 'vm.requestChecking({})'
	        }, {
	            'htmlClass': 'col-xs-6 text-left',
	            'type': 'button',
	            'style': 'btn-clear btn-reset btn-margin-l',
	            'title': '重置',
	            'onClick': 'vm.resetAll()'
	        }]
    	}]
}

module.exports = queryErrorCheckingResultConstant;
