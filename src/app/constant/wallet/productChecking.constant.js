'use strict';

var productCheckingConstant = {
    // 查询面板
    formPanelOptions: {
        title: '基金对账',
        hasIcon: true,
        iconClass: 'icon-search',
        panelClass: 'form-panel'
    },
        //对账日期
    investSchema: {
        'type': 'object',
        'properties': {
            'balOfAccDate': {
                'title': '对账日期',
                'type': 'string',
                'format': 'date'
            }
        }
    },
        // 表单输入
    investFormOptions: [{
        type: 'section',
        htmlClass: 'row',
        items: [ {
            type: 'section',
            htmlClass: 'col-lg-12 col-md-12 col-sm-12',
            items: [{
                key: 'balOfAccDate',
                readonly: true,
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                divClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                opened: false,
                dateOptions: {
                    formatYear: 'yy',
                    maxDate: new Date(),
                    // minDate: new Date(),
                    startingDay: 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
        }]
    },{
        'type': 'fieldset',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right',
            'type': 'button',
            'style': 'btn-blue btn-reset btn-margin-r',
            'title': '申购对账',
            'onClick': 'vm.applyRedeemChecking("1")'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '申购对账结果更新',
            'onClick': 'vm.resultReChecking("1")'
        }]
    },{
        'type': 'fieldset',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right',
            'type': 'button',
            'style': 'btn-blue btn-reset btn-margin-r',
            'title': '赎回对账',
            'onClick': 'vm.applyRedeemChecking("2")'
        }, {
            'htmlClass': 'col-xs-6 text-left',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-l',
            'title': '赎回对账更新',
            'onClick': 'vm.resultReChecking("2")'
        }]
    },{
        'type': 'fieldset',
        'htmlClass': 'text-center mt-14',
        'items': [{
            'htmlClass': 'col-xs-6 text-right',
            'type': 'button',
            'style': 'btn-clear btn-reset btn-margin-r',
            'title': '收益对账结果更新',
            'onClick': 'vm.resultReChecking("3")'
        }]
    }]
}

module.exports = productCheckingConstant;
