'use strict';

var regularExpressionConstant = require('../regularExpression/regularExpression.constant');
var actionTemplate = 
    '<div class="ui-grid-cell-contents">' +
    '<a href="javascript:;" class="opr-edit" ng-click="grid.appScope.editbankmode(row)">修改</a>' + 
    '<a href="javascript:;" class="opr-del" ng-click="grid.appScope.delbankmode(row)">删除</a>' + 
    '<a href="javascript:;" class="opr-detail" ng-click="grid.appScope.detailbankmode(row)">详情</a>' + 
    '</div>'

var cardTypeConstant = [{
    value: '01',
    name: '借记卡'
}, {
    value: '02',
    name: '贷记卡'
}];
var bankinfomanageConstant = {

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

    //表单form
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'bankName',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
                'placeholder': '请输银行名称',
                'onKeyup':function($event,form,object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE,'');
                    object.ngModel.$setViewValue($event.target.value);
                }
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'bankId',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3',
                'placeholder': '请输入银行行号'
            }]
        }]

    }, {
        'type': 'section',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right',
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
        'type': 'object',
        'properties': {
            'bankName': {
                'title': '银行名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            },
            'bankId': {
                'title': '银行行号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength': 20
            }
        }
        // "required": [
        //     "bankName",
        //     "bankId"
        // ]
    },


    // 表格
    investGridOptions: {
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,
        enableSorting:false,
        columnDefs: [{
            name: '银行名称',
            field: 'bankName'
        }, {
            name: '银行行号',
            field: 'bankId'
        }, {
            name: '卡种',
            field: 'cardType',
            cellFilter: 'titleMapFilter:' + JSON.stringify(cardTypeConstant)
        }, {
            name: '单笔限额/元',
            field: 'singleLimit'
        }, {
            name: '单日限额/元',
            field: 'singleDayMoneyLimit'
        }, {
            name: '操作',
            field: 'adjustId',
            cellTemplate: actionTemplate,
            width: 200
        }],
        data: []
    }
};

module.exports = bankinfomanageConstant;
