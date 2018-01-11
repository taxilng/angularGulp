'use strict';
var orgStatusConstant = require('./enum/orgStatus.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' + '<a class="opr-detail opr-leftbtn"  ng-click="grid.appScope.orgDetail(row)">详情</a></div>';

var orgManagementConstant = {
    // 机构目录
    panelOrgOptions:{
        title: '机构目录',
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
            'orgName': {
                'title': '机构名称',
                'type': 'string',
                'format': 'hDefault',
                'readonly':true
            },
            'orgSeriNo': {
                'title': '机构编码',
                'type': 'string',
                'format': 'hDefault',
                'readonly':true
            },
            // 'status': {
            //     'title': '状态',
            //     'type': 'string',
            //     'format': 'hSelect',
            //     'titleMap':orgStatusConstant.orgStatusAll
            // }
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
                'key': 'orgName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输机构名称'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'orgSeriNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输机构编码'
            }]
        }
        // , {
        //     type: 'section',
        //     htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        //     items: [{
        //         'key': 'status',
        //         'divClass': 'col-lg-8 col-md-8 col-sm-8',
        //         'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        //     }]
        // }
        ]

    }
    // , {
    //     'type': 'section',
    //     'htmlClass': 'text-center',
    //     'items': [{
    //         'htmlClass': 'col-xs-6 text-right btn-margin-r',
    //         'type': 'button',
    //         'style': 'btn btn-default btn-sm btn-margin-r btn-blue btn-reset',
    //         'title': '查询',
    //         'onClick': 'vm.orgChildInfoRequestFun({})'
    //     }, {
    //         'htmlClass': 'col-xs-6 text-left button-row',
    //         'type': 'button',
    //         'style': 'btn btn-default btn-sm btn-reset',
    //         'title': '重置',
    //         'onClick': 'vm.resetAll()'
    //     }]
    // }
    ],

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '机构编码',
            field: 'orgSeriNo'
        }, {
            name: '机构名称',
            field: 'orgName',
            width:200
        }, {
            name: '上级机构编码',
            field: 'parentPrgId'
        }, {
            name: '状态',
            field: 'status',
            cellFilter:'titleMapFilter:'+ JSON.stringify(orgStatusConstant.orgStatusSelete)
        }, {
            name: '操作',
            field: 'operation',
            cellTemplate: actionTemplate
        }],
        data: []
    }
}

module.exports = orgManagementConstant;
