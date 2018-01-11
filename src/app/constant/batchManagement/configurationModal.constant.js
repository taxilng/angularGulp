'use strict';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var systemIdConstant = require('./enum/systemId.constant');
var prioritySwitchConstant = require('./enum/prioritySwitch.constant');
var scanTypeMap = require('./enum/scanType.constant');
var frequencyMap = require('./enum/frequencyID.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-detail opr-leftbtn"  ng-click="grid.appScope.checkConfig(row)">选择</a>' + 
    '</div>';
var configurationModalConstant = {
    jobformOptions: {
        title: '配置作业查询',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    gridformOptions: {
        title: '',
        hasIcon: false,
        hasLine: true,
        panelClass: 'gridform-panel'
    },
    configformOptions: {
        title: '配置作业计划',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },
    // 表单头部
    jobschema: {
        'type': 'object',
        'properties': {
            'jobModelId': {
                'title': '作业编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': '20'
            },
            'jobModelNum': {
                'title': '作业标识',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': '20'
            },
            'jobModelName': {
                'title': '作业名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': '20'
            },
            'systemId': {
                'title': '系统标识',
                'format': 'hDefault',
                'titleMap': systemIdConstant,
                'type': 'string',
                'readonly': true
            }
        }
    },
    configSchema: {
        'type': 'object',
        'properties': {
            'jobModelNum': {
                'title': '作业标识',
                'type': 'string',
                'format': 'hDefault',
                'readonly': true
            },
            'systemId': {
                'title': '系统标识',
                'format': 'hDefault',
                'titleMap': systemIdConstant,
                'type': 'string',
                'readonly': true
            },
            'scheduleName': {
                'title': '定时名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'scanType': {
                'title': '执行类型',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': scanTypeMap
            },
            'frequency': {
                'title': '执行频率',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': frequencyMap
            },
            'interval': {
                'title': '执行间隔',
                'type': 'number',
                'format': 'hDefault',
                'maxLength': 5
            },
            'startTime': {
                'title': '执行起始时间',
                'type': 'string',
                'format': 'date'
            },
            'runByInstanceId': {
                'title': '执行实例ID',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            }
        },
        required: ['scheduleName', 'scanType', 'frequency', 'startTime', 'runByInstanceId']
    },

    configForm: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'row',
            items: [{
                type: 'section',
                htmlClass: 'row',
                items: [{
                    type: 'section',
                    htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                    items: [{
                        'key': 'jobModelNum',
                        'required': true,
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
                        'key': 'systemId',
                        'divClass': 'col-lg-7 col-md-7 col-sm-7',
                        'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                    }]
                }]
            }]
        }, {
            type: 'section',
            htmlClass: 'row',
            items: [{
                type: 'section',
                htmlClass: 'row',
                items: [{
                    type: 'section',
                    htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                    items: [{
                        'key': 'scheduleName',
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
                        'key': 'scanType',
                        'divClass': 'col-lg-7 col-md-7 col-sm-7',
                        'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                    }]
                }]
            }]
        }, {
            type: 'section',
            htmlClass: 'row',
            items: [{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    'key': 'frequency',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    'key': 'interval',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                }]
            }]
        }, {
            type: 'section',
            htmlClass: 'row',
            items: [{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    'key': 'startTime',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'readonly': true,
                    'opened': false,
                    'checkTime': true,
                    'timeOptions': {
                        mytime: new Date('2017-1-10 14:20:20'),
                        hstep: 1,
                        mstep: 11,
                        ismeridian: false
                    },
                    'dateOptions': {
                        formatYear: 'yy',
                        minDate: new Date(),
                        // minDate: new Date(),
                        startingDay: 1
                    },
                    'onClick': function($event, form) {
                        form.opened = true;
                    }
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    'key': 'runByInstanceId',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            }]
        }]
    }],
    // 表单输入
    jobform: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'row',
            items: [{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    'key': 'jobModelId',
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
                    'key': 'jobModelNum',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'onKeyup': function($event, form, object) {
                        $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }]
            }]
        }, {
            type: 'section',
            htmlClass: 'row',
            items: [{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    'key': 'jobModelName',
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
                    'key': 'systemId',
                    'divClass': 'col-lg-7 col-md-7 col-sm-7',
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
                'onClick': 'vm.searchForm()'
            }, {
                'htmlClass': 'col-lg-6 col-md-6 col-sm-6 text-left',
                'type': 'button',
                'style': 'btn-clear btn-reset btn-margin-dl',
                'title': '重置',
                'onClick': 'vm.resetAll()'
            }]
        }]
    }],
    jobgridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [{
            field: 'choose',
            name: '选择',
            cellTemplate: '<div class="ui-grid-cell-contents">' + '<input type="radio" ng-checked="grid.appScope.ischeckedConfig(row)" class="table-input" name="radio" ng-click="grid.appScope.checkConfig(row)">' + '</div>'
        }, {
            name: '作业编号',
            field: 'jobModelId'
        }, {
            name: '作业名称',
            field: 'jobModelName'
        }, {
            name: '作业标识',
            field: 'jobModelNum'
        }, {
            name: '优先级',
            field: 'prioritySwitch',
            cellFilter: 'titleMapFilter:' + JSON.stringify(prioritySwitchConstant)
        }, {
            name: '操作',
            field: 'operation',
            cellTemplate: actionTemplate
        }],
        data: []
    }
};


module.exports = configurationModalConstant;
