'use strict';
var scanTypeConstant = require('./enum/scanType.constant');
var systemIdConstant = require('./enum/systemId.constant');
var frequencyIDConstant = require('./enum/frequencyID.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-edit"  ng-click="grid.appScope.toUpdateScanSchedulePage(row)">修改</a>' +
    '<a class="opr-del" ng-click="grid.appScope.deleteJobSchedule(row)">删除</a>' + 
    '</div>';
var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var timingConfigurationConstant = {

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
            'systemId': {
                'title': '系统标识',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': systemIdConstant
            },
            'scheduleId': {
                'title': '定时编号',
                'type': 'integer',
                'format': 'hDefault',
                'maxLength': '20'
            },
            'scheduleName': {
                'title': '定时名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': '20'
            },
            'scanType': {
                'title': '定时类型',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': scanTypeConstant
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
                'key': 'systemId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'scheduleId',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输定时编号',
                'onKeyup': function($event, form, object) {
                    if ($event.target.value.length > 20) {
                        $event.target.value = $event.target.value.substr(0, 20);
                        object.ngModel.$setViewValue($event.target.value);
                    }
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'scheduleName',
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                'placeholder': '请输定时名称',
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
                'divClass': 'col-lg-8 col-md-8 col-sm-8',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        }]

    }],

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting: false,
        columnDefs: [
            // {
            //     name: '序号',
            //     field: 'roleCode',
            //     cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>',
            //     width: 60
            // },
            {
                name: '定时编号',
                field: 'scheduleId'
            }, {
                name: '名称',
                field: 'scheduleName'
            }, {
                name: '定时类型',
                field: 'scanType',
                cellFilter: 'titleMapFilter:' + JSON.stringify(scanTypeConstant)
            }, {
                name: '执行频率',
                field: 'frequency',
                cellFilter: 'titleMapFilter:' + JSON.stringify(frequencyIDConstant)
            }, {
                name: '执行间隔',
                field: 'interval'
            }, {
                name: '起始时间',
                field: 'startTime'
            }, {
                name: '通道编号',
                field: 'filePipelineId'
            }, {
                name: '作业标识',
                field: 'jobModelNum'
            }, {
                name: '操作',
                field: 'operation',
                width: 120,
                cellTemplate: actionTemplate
            }
        ],
        data: []
    }
}

module.exports = timingConfigurationConstant;
