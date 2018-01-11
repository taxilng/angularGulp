'use strict';
var jobStatusConstant = require('./enum/jobStatus.constant');
var stepTypeConstant = require('./enum/stepType.constant');
var actionTemplate = '<div class="ui-grid-cell-contents">' +
    '<a class="opr-detail"  ng-click="grid.appScope.checkDataList(row)">查看数据</a>' +
    '</div>';
 // + '<a class="opr-detail"  ng-click="grid.appScope.stepDetail(row)">详情</a>'
var stepModalConstant = {
    panelBanseInfoOptions: {
        title: '查看步骤',
        hasIcon: false,
        hasLine: true,
        panelClass: 'gridform-panel'
    },
    gridOptions:{
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs:[{
            name:'步骤编号',
            field:'stepNum'
        },{
            name:'步骤名称',
            field:'stepName',
            width:200
        },{
            name:'状态',
            field:'state',
            cellFilter:'titleMapFilter:'+ JSON.stringify(jobStatusConstant)
        },{
            name:'步骤类型',
            field:'stepTypeId',
            cellFilter:'titleMapFilter:'+ JSON.stringify(stepTypeConstant)
        },{
            name:'失败次数',
            field:'failCount'
        },{
            name:'开始时间',
            field:'runTime',
            cellFilter:'timeFormatFilter'
        },{
            name:'操作',
            field:'operation',
            width:200,
            cellTemplate:actionTemplate
        }],
        data:[]
    }
};

module.exports = stepModalConstant;
