'use strict';

var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var orgStatusConstant = require('./enum/orgStatus.constant');
var userStatusConstant = require('./enum/userStatus.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-edit"  ng-click="grid.appScope.userUpdate(row)">修改</a>'+
    '<a class="opr-edit" ng-if="grid.appScope.userEnable(row.entity.userStatus,\'userEnable\')" ng-click="grid.appScope.userEnable(row)">启用</a>'+
    '<a class="opr-del"  ng-if="grid.appScope.userDelete(row.entity.userStatus,\'userDelete\')" ng-click="grid.appScope.userDelete(row)">冻结</a>'+
    '<a class="opr-del"  ng-if="grid.appScope.userlogout(row.entity.userStatus,\'userlogout\')" ng-click="grid.appScope.userlogout(row)">签退</a>'+
    '<a class="opr-detail"  ng-click="grid.appScope.userAllocationRole(row)">分配角色</a>'+
    '<a class="opr-detail"  ng-click="grid.appScope.userDetail(row)">详情</a>' +
    '</div>';

var userManagementConstant = {
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
            'userName': {
                'title': '柜员名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'employeeId': {
                'title': '柜员编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            // 'userStatus': {
            //     'title': '状态',
            //     'type': 'string',
            //     'format': 'hSelect',
            //     'titleMap':orgStatusConstant.orgStatusAll
            // },
            'orgName': {
                'title': '所属机构',
                'type': 'string',
                'format': 'hDefault',
                'readonly': true
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
                'key': 'userName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输柜员名称',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'employeeId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输柜员编号',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_NUM,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        },
        // {
        //     type: 'section',
        //     htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        //     items: [{
        //         'key': 'userStatus',
        //         'divClass': 'col-lg-8 col-md-8 col-sm-8',
        //         'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        //     }]
        // },
        {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'orgName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]

    }, {
        'type': 'section',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right',
            'type': 'button',
            'style': 'btn-blue btn-reset btn-margin-r',
            'title': '查询',
            'onClick': 'vm.userPageSelectReqFun({})'
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
            name: '柜员名称',
            field: 'userName'
        }, {
            name: '柜员编号',
            field: 'employeeId'
        }, {
            name: '状态',
            field: 'userStatus',
            cellFilter:'titleMapFilter:'+ JSON.stringify(userStatusConstant)
        }, {
            name: '操作',
            field: 'operation',
            width:230,
            cellTemplate: actionTemplate
        }],
        data: []
    }
}

module.exports = userManagementConstant;
