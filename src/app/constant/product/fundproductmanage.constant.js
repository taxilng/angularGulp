'use strict';

var actionTemplate = '<div class="ui-grid-cell-contents">' +
'<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editmode(row)">修改</a>' +
'<a href="javascript:;" class="opr-del" ng-if="grid.appScope.productOnSale(row,\'productOnSale\')" ng-click="grid.appScope.productOnSale(row)">上架</a>' +
'<a href="javascript:;" class="opr-del" ng-if="grid.appScope.productOffSale(row,\'productOffSale\')" ng-click="grid.appScope.productOffSale(row)">下架</a>' +
'<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailmode(row)">详情</a>' + '</div>';

var startAmountOptions = [{
    value:'',
    name:'全部'
},{
    value: 'A',
    name: '1000以下'
}, {
    value: 'B',
    name: '1000-5000'
}, {
    value: 'C',
    name: '5000-10000'
}, {
    value: 'D',
    name: '10000以上'
}];
var productTypeIdOptions = [{
    value:'',
    name:'全部'
}, {
    value: 'CURRENCYTYPE',
    name: '货币型'
}, {
    value: 'BONDTYPE',
    name: '债券型'
}, {
    value: 'STOCKTYPE',
    name: '股票型'
}, {
    value: 'MIXEDTYPE',
    name: '混合型'
},{
    name: 'QDII型',
    value: 'QDII'
},{
    name: '平衡型',
    value: 'BALANCE'
    }];
var statusOptions = [{
    value:'ALL',
    name:'全部'
},{
    value: 'ON_SALE',
    name: '在售'
}, {
    value: 'OFF_SALE',
    name: '已下架'
}];
var risklevelOptions = [{
    value:'',
    name:'全部'
},{
    value: 'HIGH',
    name: '高风险'
}, {
    value: 'MIDDLE',
    name: '中风险'
}, {
    value: 'LOW',
    name: '低风险'
}];

var fundProductManageConstant = {

    //pannel
    formPanelOptions: {
        title: '查询条件',
        hasIcon: false,
        panelClass: 'form-panel'
    },
    gridPanelOptions: {
        title: '查询内容',
        hasIcon: false,
        panelClass: 'grid-panel'
    },
    //form
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'brandName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'startAmount',
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
                'key': 'productTypeId',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'status',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }]
    }, {
        'type': 'fieldset',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right btn-margin-r',
            'type': 'button',
            'style': 'btn-blue btn-reset btn-margin-r',
            'title': '查询',
            'onClick': 'vm.searchInfo()'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '重置',
            'onClick': 'vm.reset()'
        }]
    }],

    //schema
    investSchema: {
        type: 'object',
        properties: {
            'brandName': {
                'title': '基金公司名称',
                'type': 'string',
                'format': 'hSelect',
                'enum':['南方','工银瑞信','易方达'],
                'titleMap':[{
                    name:'全部',
                    value:''
                },{
                    name:'南方',
                    value:'南方'
                },{
                    name:'工银瑞信',
                    value:'工银瑞信'
                },{
                    name:'易方达',
                    value:'易方达'
                }]
            },
            'startAmount': {
                'title': '基金起投金额',
                'type': 'string',
                'format': 'hSelect',
                titleMap: startAmountOptions
            },
            'productTypeId': {
                'title': '基金产品类型',
                'type': 'string',
                'format': 'hSelect',
                titleMap: productTypeIdOptions
            },
            'status': {
                'title': '基金产品状态',
                'type': 'string',
                'format': 'hSelect',
                titleMap: statusOptions
            }
        }
    },

    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '产品名称',
            field: 'productName'
        }, {
            name: '基金代码',
            field: 'externalProductCode'
        }, {
            name: '基金公司名称',
            field: 'brandName'
        },{
            name: '基金产品类型',
            field: 'productTypeId',
            cellFilter: 'titleMapFilter:' + JSON.stringify(productTypeIdOptions)
        },{
            name: '基金起投金额',
            field: 'startAmount'
        },{
            name: '产品状态',
            field: 'status',
            cellFilter: 'titleMapFilter:' + JSON.stringify(statusOptions)
        }, {
            name: '风险等级',
            field: 'risklevel'
            //cellFilter: 'titleMapFilter:' + JSON.stringify(risklevelOptions)
        }, {
            name: '操作',
            field: 'adjustId',
            cellTemplate: actionTemplate,
            width: 180
        }],
        data: []
    }
}

module.exports = fundProductManageConstant;
