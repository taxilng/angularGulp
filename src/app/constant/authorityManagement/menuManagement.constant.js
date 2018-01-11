'use strict';
var channelNoConstant = require('./enum/channelNo.constant');
var menuStatusConstant = require('./enum/menuStatus.constant');
var menuLevelConstant = require('./enum/menuLevel.constant');

var actionTemplate = '<div class="ui-grid-cell-contents">' +
'<a class="opr-detail opr-leftbtn"  ng-click="grid.appScope.menuDetail(row)">详情</a>' + '</div>';

var menuManagementConstant = {
    // 机构目录
    panelOrgOptions:{
        title: '菜单目录',
        hasIcon: true,
        iconClass:'icon-menupanel',
        panelClass:'menutree-panel'
    },
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
            'menuName': {
                'title': '菜单名称',
                'type': 'string',
                'format': 'hDefault'
            },
            'menuSeriNo': {
                'title': '菜单编号',
                'type': 'string',
                'format': 'hDefault'
            },
            'menuStatus': {
                'title': '菜单状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': menuStatusConstant.allStatus
            },
            'channelNo': {
                'title': '所属系统',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': channelNoConstant.allChannelNo
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
                'key': 'menuName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输菜单名称',
                'readonly':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'menuSeriNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输菜单编号',
                'readonly':true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'menuStatus',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'channelNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]

    }, {
        'type': 'fieldset',
        'htmlClass': 'row col-lg-12 col-md-12 col-sm-12 text-center mt-14',
        'items': [{
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6 text-right',
            'type': 'button',
            'style': 'btn-blue btn-reset',
            'title': '查询',
            'onClick': 'vm.queryMenuNodeInfoRequestFun({})'
        }, {
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-dl',
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
            name: '菜单名称',
            field: 'prodMenuName'
        }, {
            name: '菜单层级',
            field: 'prodMenuLevel',
            cellFilter: 'titleMapFilter:' + JSON.stringify(menuLevelConstant)
        }, {
            name: '菜单状态',
            field: 'menuStatus',
            cellFilter: 'titleMapFilter:' + JSON.stringify(menuStatusConstant.allStatus)
        }, {
            name: '所属系统',
            field: 'prodMenuChannelNo'
        }, {
            name: '排列顺序号',
            field: 'displayOrder'
        }, {
            name: '操作',
            field: 'operation',
            cellTemplate: actionTemplate
        }],
        data: []
    }
}

module.exports = menuManagementConstant;
