'use strict';

var liquidationConstant = require('./enum/liquidation.constant');
var rateTypeConstant = require('./enum/rateType.constant');
var proxyStatusConstant = require('./enum/proxyStatus.constant');

var proxyAgreementModalConstant = {
    // 基本信息面板
    formPanelOptions: {
        title: '代理协议管理',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

    //form 表单
    investFormOptions: [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'supplyId',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'rateType',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'productId',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'rateAmount',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'liquidationType',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'liquidationDate',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'liquidationTool',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'agreementDate',
            labelHtmlClass: 'col-lg-4 col-md-4 col-sm-4',
            divClass: 'col-lg-7 col-md-7 col-sm-7',
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
    }],

    //schema
    investSchema: {
        'type': 'object',
        'properties': {
            'supplyId': {
                'title': '供应商编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'rateType': {
                'title': '费率方式',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': rateTypeConstant
            },
            'productId': {
                'title': '产品编号',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'rateAmount': {
                'title': '费率',
                'type': 'string',
                'format': 'hDefault'
            },
            'liquidationType': {
                'title': '清算方式',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': liquidationConstant.type
            },
            'liquidationDate': {
                'title': '清算日',
                'type': 'string',
                'format': 'hDefault'
            },
            'liquidationTool': {
                'title': '清算工具',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': liquidationConstant.tool
            },
            'agreementDate': {
                'title': '协议时间',
                'type': 'string',
                'format': 'date'
            }
        },
        required:[ 'supplyId','rateAmount','agreementDate','rateType','liquidationType','liquidationDate','liquidationTool']
    }
};

module.exports = proxyAgreementModalConstant;
