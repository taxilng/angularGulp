'use strict';
var actionTemplate = '<div class="ui-grid-cell-contents">' + '<a class="opr-edit"  ng-click="grid.appScope.deleteRateItem(row)">删除</a>' + '</div>';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var taskCreateRoleConstant = {

    // 查询面板
    formPanelOptions: {
        title: '基本信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    // 返回结果面板
    gridPanelOptions: {
        title: '添加其他信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    // 表单头部
    investSchema: {
        'type': 'object',
        'properties': {
            'taskName': {
                'title': '作业名称',
                'type': 'string',
                'format': 'hDefault'
            },
            'jobModelNum': {
                'title': '作业标识',
                'type': 'string',
                'format': 'hDefault'
            },
            'runTime': {
                'title': '计划执行时间',
                'type': 'string',
                'format': 'date',
                'required': true
            },
            'runByInstanceId': {
                'title': '执行实例ID',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            }
        },
        required: ['runByInstanceId', 'runTime']
    },
    configSchemaOptions: {
        'type': 'object',
        'properties': {
            'paraUp': {
                'title': '参数标识',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'paraValue': {
                'title': '参数值',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            }
        }
    },
    configFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'paraUp',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'paraValue',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }]
    }],


    // 表单输入
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'taskName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'readonly': true
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'jobModelNum',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'readonly': true
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'runTime',
                readonly: true,
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                divClass: 'col-lg-7 col-md-7 col-sm-7 col-xs-11',
                opened: false,
                dateOptions: {
                    formatYear: 'yy',
                    // maxDate: new Date(),
                    // minDate: new Date(),
                    startingDay: 1
                },
                'checkTime': true,
                'timeOptions': {
                    mytime: new Date(moment().format('YYYY-MM-DD hh:mm:ss')),
                    hstep: 1,
                    mstep: 1,
                    ismeridian: false
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'runByInstanceId',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
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
        enableSorting: false,
        columnDefs: [{
            name: '参数标识',
            field: 'paraUp'
        }, {
            name: '参数值',
            field: 'paraValue'
        }, {
            name: '操作',
            field: 'option',
            cellTemplate: actionTemplate
        }],
        data: []
    }
}

module.exports = taskCreateRoleConstant;
