'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var orgLevelConstant = require('./enum/orgLevle.constant');
var orgStatusConstant = require('./enum/orgStatus.constant');

var addOrgNodeConstant = {

    // 查询面板
    formPanelOptions: {
        title: '机构管理',
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
            'orgName': {
                'title': '机构名称',
                'type': 'string',
                'format': 'hDefault'
            },
            'orgSeriNo': {
                'title': '机构编号',
                'type': 'string',
                'format': 'hDefault'
            },
            'shortName': {
                'title': '机构简称',
                'type': 'string',
                'format': 'hDefault'
            },
            'orgLevel': {
                'title': '机构级别',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':orgLevelConstant
            },
            'status': {
                'title': '机构状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':orgStatusConstant.orgStatusSelete
            },
            'parentPrgId': {
                'title': '上级机构',
                'type': 'string',
                'format': 'hDefault'
            },
            'contacter': {
                'title': '机构联系人',
                'type': 'string',
                'format': 'hDefault'
            },
            'contacterMobile': {
                'title': '联系人电话',
                'type': 'string',
                'format': 'hDefault'
            },
            'displayOrder': {
                'title': '机构序号',
                'type': 'string',
                'format': 'hDefault'
            }
        },
        required:['orgName','orgSeriNo','orgLevel','status','displayOrder']
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
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输机构名称',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'orgSeriNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输机构编号',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_NUMENGLISH,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'shortName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输机构简称'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'orgLevel',
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
                'key': 'parentPrgId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'readonly': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'contacter',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输入机构联系人'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'contacterMobile',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输入联系人电话'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'displayOrder',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-3 col-md-3 col-sm-3 form-label',
                'placeholder': '请输机构序号'
            }]
        }]

    }]
}

module.exports = addOrgNodeConstant;
