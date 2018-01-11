'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var channelNoConstant = require('./enum/channelNo.constant');

var roleUpdateConstant = {

    // 查询面板
    formPanelOptions: {
        title: '角色管理',
        hasIcon: false,
        panelClass: 'addform-panel',
        hasLine: true
    },
    
    // 表单头部
    investSchema: {
        'type': 'object',
        'properties': {
            'roleName': {
                'title': '角色名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'roleCode': {
                'title': '角色编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'channelNo': {
                'title': '角色所属渠道',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': channelNoConstant.selectChannelNo
            },
            'status': {
                'title': '状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':[{value:'1',name:'正常'},{value:'0',name:'冻结'}]
            },
            'roleDesc': {
                'title': '角色描述',
                'type': 'string',
                'format': 'hTextarea',
                'maxLength':200
            }
        },
        required:['roleName','roleCode',,'channelNo']
    },
    // 表单输入
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'roleName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输角色名称',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'roleCode',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输角色编号',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_NUM,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'channelNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'status',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'roleDesc',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输角色描述'
            }]
        }]

    }],
}

module.exports = roleUpdateConstant;
