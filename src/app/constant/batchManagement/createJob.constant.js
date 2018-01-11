'use strict';
var systemIdConstant = require('./enum/systemId.constant');

var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-edit"  ng-click="grid.appScope.task_create(row)">创建任务</a>' +
    '</div>';

var createJobConstant = {

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
            'jobModelNum':{
                'title':'作业标识',
                'type':'string',
                'format':'hDefault',
                'maxLength':'20'
            },
            'jobModelName':{
                'title':'作业名称',
                'type':'string',
                'format':'hDefault',
                'maxLength':'20'
            }
       }
    },
    // 表单输入
    investFormOptions: [{
            type:'section',
            htmlClass:'row',
            items: [{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    'key': 'systemId',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
                items:[{
                    'key':'jobModelNum',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'placeholder': '请输作业标识'
                }]
            },{
                type:'section',
                htmlClass:'col-lg-6 col-md-6 col-sm-6',
                items:[{
                    'key':'jobModelName',
                    'divClass': 'col-lg-8 col-md-8 col-sm-8',
                    'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
                    'placeholder': '请输作业名称'
                }]
            }]

        }],

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [
        {
            name: '序号',
            field: 'indexOf',
            cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>',
            width: 60
        }, {
            name: '作业标识',
            field: 'jobModelNum'
        }, {
            name: '作业名称',
            field: 'jobModelName'
        }, {
            name: '操作',
            field: 'operation',
            cellTemplate: actionTemplate
        }],
        data: []
    }
}

module.exports = createJobConstant;
