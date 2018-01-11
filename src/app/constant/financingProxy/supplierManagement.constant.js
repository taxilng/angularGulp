'use strict';
var supplyTypeMap = require('./enum/supplyType.constant');
var cooperationStatusMap = require('./enum/cooperateStatus.constant');

var actionTemplate =
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editSupplierInfo(row)">修改</a>' +
    '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.supplyInfoEffect(row)" ng-bind="row.entity.cooperationStatus == \'0\'? \'合作\':\'解除合作\'"></a>' +
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailSupplierInfo(row)">详情</a>' + 
    '</div>';
var supplierManagementConstant = {
    // 查询面板
    formPanelOptions: {
        title: '查询条件',
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
            'supplyName': {
                'title': '供应商名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'supplyType': {
                'title': '公司行业',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':supplyTypeMap
            },
            'cooperationStatus': {
                'title': '合作状态',
                'type': 'string',
                'format': 'hSelect',
                'titleMap':cooperationStatusMap
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
                'key': 'supplyName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'supplyType',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }]
    }, {
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'cooperationStatus',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
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
            'onClick': 'vm.resetAll()'
        }]
    }],
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '供应商名称',
            field: 'supplyName'
        }, {
            name: '法人代表',
            field: 'legalPersonName'
        }, {
            name: '联系方式',
            field: 'contactNo'
        },{
            name:'卡号',
            field:'cardNo'
        },{
            name: '成立日期',
            field: 'supplyFoundTime',
            cellFilter:'timeFormatFilter'
        }, {
            name: '公司地址',
            field: 'address'
        }, {
            name: '合作日期',
            field: 'cooperationTime',
            cellFilter:'timeFormatFilter',
            width:120
        },
        {
            name:'合作状态',
            field:'cooperationStatus',
            cellFilter:'titleMapFilter:' + JSON.stringify(cooperationStatusMap),
            width:110
        },{
            name:'操作',
            field:'adjustId',
            cellTemplate:actionTemplate,
            width: 200
        }]
    }
};

module.exports = supplierManagementConstant;
