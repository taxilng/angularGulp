'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var userStatusConstant = require('./enum/userStatus.constant');

var userUpdateConstant = {

    // 查询面板
    formPanelOptions: {
        title: '柜员管理',
        hasIcon: false,
        panelClass: 'addform-panel',
        hasLine: true
    },

    // 表单头部
    investSchema: {
        'type': 'object',
        'properties': {
            'employeeId': {
                'title': '柜员编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'userName': {
                'title': '柜员名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'orgName': {
                'title': '所属机构',
                'type': 'string',
                'format': 'hDefault'
            },
            'mobile': {
                'title': '手机号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':11
                // 'pattern':/^0?1[3|4|5|8|7][0-9]\d{8}$/
            },
            'address': {
                'title': '地址',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':50
            },
            'email': {
                'title': '邮箱',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':50
            },
            'password': {
                'title': '登录密码',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':6
            },
            'userStatus': {
                'title': '状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':userStatusConstant
            }
        },
        required:['employeeId','userName','orgName','mobile','email','password','userStatus']
    },

    // 表单输入
    investFormOptions : [{
        'type': 'fieldset',
        'htmlClass': 'row',
        'items': [{
            'key': 'employeeId',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'placeholder': '请输入柜员编号'
        }, {
            'key': 'userName',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'placeholder': '请输入柜员名称'
        }]
    }, {
        'type': 'fieldset',
        'htmlClass': 'row',
        'items': [{
            'key': 'orgName',
            'fieldButtonRight': true,
            'buttonClass': 'btn-default',
            'buttonLabel': '选择',
            'onClick': 'vm.selectOrg()',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6 margin-no',
            'divClass': 'col-lg-8 col-md-8 col-sm-8 div-padding',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4 label-padding',
            'placeholder': '请选择所属机构'
        }, {
            'key': 'mobile',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'placeholder': '请输入手机号'
        }]
    },{
        'type': 'fieldset',
        'htmlClass': 'row',
        'items': [{
            'key': 'address',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'placeholder': '请输入地址'
        }, {
            'key': 'email',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'placeholder': '请输入邮箱'
        }]
    },{
        'type': 'fieldset',
        'htmlClass': 'row',
        'items': [{
            'key': 'password',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'placeholder': '请输入登录密码',
            'onKeyup':function($event,form,object) {
                $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_NUMENGLISH,'');
                object.ngModel.$setViewValue($event.target.value);
            }
        }, {
            'key': 'userStatus',
            'htmlClass': 'col-lg-6 col-md-6 col-sm-6',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }]

}

module.exports = userUpdateConstant;
