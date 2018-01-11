'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var fundConstant = require('./enum/fund.constant');
var actionTemplate = 
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editmode(row)">修改</a>' +
    // '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.delmode(row)">删除</a>' +
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailmode(row)">详情</a>' + '</div>';

var fundManagerManage = {
	//panel
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
	//form
	managerForm :[{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'partyName',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'onKeyup':function($event,form,object) {
                $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                object.ngModel.$setViewValue($event.target.value);
            }
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'corporateName',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'onKeyup':function($event,form,object) {
                $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                object.ngModel.$setViewValue($event.target.value);
            }
        }]
    },{
        'type': 'section',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right btn-margin-r',
            'type': 'button',
            'style': 'btn-blue btn-reset btn-margin-r',
            'title': '查询',
            'onClick': 'vm.searchInfo()'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '重置',
            'onClick': 'vm.reset()'
        }]
    }],

    //schema
    managerSchema: {
        'type': 'object',
        'properties': {
            'partyName': {
                'title': '基金经理姓名',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },'corporateName': {
                'title': '公司名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':50
            },
        }
    },

	// 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '基金经理姓名',
            field: 'partyName'
        }, {
            name: '性别',
            field: 'gender',
            cellFilter: 'titleMapFilter:' + JSON.stringify(fundConstant.genderOptions)
        }, {
            name: '学历',
            field: 'educationBackground',
            cellFilter: 'titleMapFilter:' + JSON.stringify(fundConstant.educationBackgroundOptions)
        },{
            name: '公司名称',
            field: 'corporateName'
        },{
            name: '操作',
            field: 'adjustId',
            cellTemplate: actionTemplate,
            width: 200
        }],
        data: []
    }

};

module.exports = fundManagerManage;
