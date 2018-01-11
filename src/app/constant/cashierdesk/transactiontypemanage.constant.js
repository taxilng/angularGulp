'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.edittransactiontypemode(row)">修改</a>'
    +'<a href="javascript:;" class="opr-del" ng-click="grid.appScope.deltransactiontypemode(row)">删除</a>'
    +'<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailtransactiontypemode(row)">详情</a>'
    + '</div>'

var transactionTypeManageConstant = {
	//pannel
	formPanelOptions : {
        title: '查询条件',
        hasIcon: false,
        panelClass: 'form-panel'
    },
    gridPanelOptions :{
        title:'查询内容',
        hasIcon: false,
        panelClass: 'grid-panel'
    },
	//form
	investFormOptions:[{
            type:'section',
            htmlClass:'row',
            items: [
            {
                type:'section',
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
                items:[{
                    'key':'transactionTypeName',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
                    'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
                    'onKeyup':function($event,form,object) {
                        $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }]
            },{
                type:'section',
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
                items:[{
                    'key':'transactionTypeCode',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
                    'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
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
            'onClick': 'vm.searchInfo()'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '重置',
            'onClick':'vm.reset()'
        }]
    }],


    //schema
	investSchema:{
       'type': 'object',
       'properties': {
            'transactionTypeName':{
                'title':'交易类型名称',
                'type':'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'transactionTypeCode':{
                'title':'交易类型编码',
                'type':'string',
                'format':'hDefault',
                'maxLength': 20
            }
       }
    },


    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '交易类型名称',
            field: 'transactionTypeName'
        }, {
            name: '交易类型编码',
            field: 'transactionTypeCode'
        }, {
            name: '英文标识',
            field: 'englishFlag'
        },{
            name: '操作',
            field: 'adjustId',
            cellTemplate: actionTemplate
        }],
        data: []
    }
};

module.exports = transactionTypeManageConstant;
