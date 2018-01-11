'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-edit"  ng-click="grid.appScope.distributionAuthority(row)">分配权限</a>'+
    '<a class="opr-edit"  ng-click="grid.appScope.roleUpdate(row)">修改</a>'+
    '<a class="opr-del" ng-if="grid.appScope.roleEnable(row.entity.status,\'roleEnable\')"  ng-click="grid.appScope.roleEnable(row)">启用</a>'+
    '<a class="opr-del" ng-if="grid.appScope.roleDelete(row.entity.status,\'roleDelete\')" ng-click="grid.appScope.roleDelete(row)">冻结</a>' +
    '</div>';

var roleManagementConstant = {

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
            'roleName':{
                'title':'角色名称',
                'type':'string',
                'format':'hDefault',
                'maxLength':20
            },
            'roleCode':{
                'title':'角色编号',
                'type':'string',
                'format':'hDefault',
                'maxLength':20
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
                    'key':'roleName',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'placeholder': '请输角色名称',
                    'onKeyup':function($event,form,object) {
                        $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }]
            },{
                type:'section',
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
                items:[{
                    'key':'roleCode',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'placeholder': '请输角色编号',
                    'onKeyup':function($event,form,object) {
                        $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_NUM,'');
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }]
            }]

        }],

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [
        {
            name: '角色编号',
            field: 'roleCode'
        }, {
            name: '角色名称',
            field: 'roleName'
        }, {
            name: '角色描述',
            field: 'roleDesc'
        }, {
            name: '状态',
            field: 'status',
            cellFilter: 'titleMapFilter:' + JSON.stringify([{value: '1',name: '正常'},{value: '0',name: '冻结'}]),
        },{
            name: '操作',
            field: 'operation',
            cellTemplate: actionTemplate
        }],
        data: []
    }
}

module.exports = roleManagementConstant;
