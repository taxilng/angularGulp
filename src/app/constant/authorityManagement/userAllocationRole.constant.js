'use strict';

var userAllocationRoleConstant = {

    // 查询面板
    formPanelOptions: {
        title: '角色维护',
        hasIcon: false,
        panelClass: 'form-panel'
    },
    // 返回结果面板
    gridPanelOptions: {
        title: '返回结果',
        hasIcon: false,
        panelClass: 'grid-panel'
    },
    // 表单头部
    investSchema: {
        'type': 'object',
        'properties': {
            'employeeId': {
                'title': '柜员编号',
                'type': 'string',
                'format': 'hDefault'
            },
            'userName': {
                'title': '柜员名称',
                'type': 'string',
                'format': 'hDefault'
            },
            'roleCode': {
                'title': '角色编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
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
                'key': 'employeeId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'readonly':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'userName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'readonly':true
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'roleCode',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输角色编号'
            }]
        }]

    }],

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            field: 'choose',
            name: '选择',
            cellTemplate: '<input type="radio" ng-checked="row.entity.assignRoleFlag == \'1\'" class="table-input" name="radio" ng-click="grid.appScope.rowSelected(row)">'
        }, {
            name: '角色编号',
            field: 'roleCode'
        }, {
            name: '角色名称',
            field: 'roleName'
        }, {
            name: '状态',
            field: 'assignRoleFlag',
            cellFilter: 'titleMapFilter:' + JSON.stringify([{value: '0',name: '未分配'}, {value: '1',name: '已分配'}])
        }],
        data: []
    }
}

module.exports = userAllocationRoleConstant;
