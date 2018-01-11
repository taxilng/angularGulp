'use strict';
var jobStatusConstant = require('./enum/jobStatus.constant');
var prioritySwitchConstant = require('./enum/prioritySwitch.constant');
var systemIdConstant = require('./enum/systemId.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-detail"  ng-click="grid.appScope.checkStep(row)">查看步骤</a>' +
    '<a class="opr-del" ng-if="row.entity.state===\'FAIL\'" ng-click="grid.appScope.errorInfo(row)">错误信息</a>' +
    '</div>';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var viewTaskConstant = {
    formPanelOptions: {
        title: '查看任务',
        hasIcon: true,
        iconClass: 'icon-search',
        panelClass: 'form-panel'
    },
    gridPanelOptions: {
        title: '查询内容',
        hasIcon: true,
        iconClass: 'icon-content',
        panelClass: 'grid-panel'
    },
    investSchema: {
        'type': 'object',
        'properties': {
            'refPayNo': {
                'title': '批量流水号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':'20'
            },
            'startTime': {
                'title': '启动时间',
                'type': 'string',
                'format': 'date'
            },
            'endTime': {
                'title': '截止时间',
                'type': 'string',
                'format': 'date'
            },
            'jobName': {
                'title': '任务名',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':'20'
            },
            'state': {
                'title': '状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': jobStatusConstant
            },
            'systemId': {
                'title': '系统标识',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': systemIdConstant
            },
        }
    },
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'refPayNo',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup':function($event,form,object) {
                    if ($event.target.value.length > 20) {
                        $event.target.value = $event.target.value.substr(0,20);
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                key: 'startTime',
                readonly: true,
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                divClass: 'col-lg-8 col-md-8 col-sm-8 col-xs-11',
                opened: false,
                dateOptions: {
                    formatYear: 'yy',
                    // maxDate: new Date(2020, 5, 22),
                    maxDate: new Date(),
                    startingDay: 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                key: 'endTime',
                readonly: true,
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                divClass: 'col-lg-8 col-md-8 col-sm-8 col-xs-11',
                opened: false,
                dateOptions: {
                    formatYear: 'yy',
                    // maxDate: new Date(2020, 5, 22),
                    maxDate: new Date(),
                    startingDay: 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'jobName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'state',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-4 col-md-4 col-sm-4',
            items: [{
                'key': 'systemId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]
    }, {
        'type': 'fieldset',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right',
            'type': 'button',
            'style': 'btn-blue btn-reset btn-margin-r',
            'title': '查询',
            'onClick': 'vm.searchInfo({})'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '重置',
            'onClick': 'vm.resetAll();'
        }]
    }],
    gridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [
            // {
            //     field: 'checkbox',
            //     displayName: '序号',
            //     cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>',
            // },
            {
                name: '任务编号',
                field: 'jobId'
            }, {
                name: '任务名称',
                field: 'jobName',
                width: 200
            }, {
                name: '批量流水号',
                field: 'refPayNo'
            }, {
                name: '状态',
                field: 'state',
                cellFilter: 'titleMapFilter:' + JSON.stringify(jobStatusConstant)
            }, {
                name: '优先级',
                field: 'prioritySwitch',
                cellFilter: 'titleMapFilter:' + JSON.stringify(prioritySwitchConstant)
            },
            //  {
            //     name: '启动时间',
            //     field: 'createdStamp'
            // },
            {
                name: '操作',
                field: 'operation',
                width: 200,
                cellTemplate: actionTemplate
            }
        ],
        data: []
    }
};

module.exports = viewTaskConstant;
