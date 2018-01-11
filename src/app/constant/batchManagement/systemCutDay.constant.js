'use strict';

var systemCutDayConstant = {
    // 查询面板
    formPanelOptions: {
        title: '系统切日',
        hasIcon: true,
        iconClass: 'icon-search',
        panelClass: 'form-panel'
    },
    // 表单头部
    investSchema: {
        'type': 'object',
        'properties': {
            'cuttingDate': {
                'title': '系统日期',
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
                key: 'cuttingDate',
                readonly: true,
                labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                divClass: 'col-lg-4 col-md-4 col-sm-4 col-xs-11',
                opened: false,
                disabled:true,
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
    }]
}

module.exports = systemCutDayConstant;
