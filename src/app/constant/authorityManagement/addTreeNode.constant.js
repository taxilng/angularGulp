'use strict';

var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var channelNoConstant = require('./enum/channelNo.constant');
var menuStatusConstant = require('./enum/menuStatus.constant');
var menuLevelConstant = require('./enum/menuLevel.constant');

var addTreeNodeConstant = {

    // 查询面板
    formPanelOptions: {
        title: '菜单管理',
        hasIcon: false,
        panelClass: 'addform-panel',
        hasLine: true
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
            'menuUrl': {
                'title': '菜单URL',
                'type': 'string',
                'format': 'hDefault'
            },
            'menuLevel': {
                'title': '菜单层级',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': menuLevelConstant
            },
            'displayOrder': {
                'title': '菜单序号',
                'type': 'string',
                'format': 'hDefault'
            },
            'menuParentName': {
                'title': '上级菜单ID',
                'type': 'string',
                'format': 'hDefault'
            },
            'menuStatus': {
                'title': '菜单状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': menuStatusConstant.selectStatus
            },
            'channelNo': {
                'title': '所属系统',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': channelNoConstant.selectChannelNo
            },
            'menuDesc': {
                'title': '菜单描述',
                'type': 'string',
                'format': 'hTextarea'
            }
        },
        required:['menuName','menuSeriNo','menuLevel','menuStatus','channelNo','displayOrder']
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
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输菜单名称',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'menuSeriNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输菜单编号',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_NUM,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'menuUrl',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输菜单URL'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'menuLevel',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'displayOrder',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输菜单序号'
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'menuParentName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'readonly': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'menuStatus',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'channelNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label'
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-12 col-md-12 col-sm-12',
            items: [{
                'key': 'menuDesc',
                'divClass': 'col-lg-9 col-md-9 col-sm-9',
                'labelHtmlClass': 'col-lg-2 col-md-2 col-sm-2 form-label',
                'placeholder': '请输菜单描述'
            }]
        }]

    }],
}

module.exports = addTreeNodeConstant;
