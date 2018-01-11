'use strict';

var liquidationConstant = require('../../../constant/financingProxy/enum/liquidation.constant');
var rateTypeConstant = require('../../../constant/financingProxy/enum/rateType.constant');
var proxyStatusConstant = require('../../../constant/financingProxy/enum/proxyStatus.constant');

module.exports = function($scope, params, titleMapFilter) {
    var vm = this;
    vm.model = {};

    //代理协议详情初始化
    proxyAgreementDetailInit();

    function proxyAgreementDetailInit(){
    	vm.model = angular.copy(params);
	    vm.model.rateType = titleMapFilter(params.rateType, rateTypeConstant);
	    vm.model.liquidationType = titleMapFilter(params.liquidationType, liquidationConstant.type);
	    vm.model.liquidationTool = titleMapFilter(params.liquidationTool, liquidationConstant.tool);
	    vm.model.status = titleMapFilter(params.status, proxyStatusConstant);
	}

    vm.form = [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'agencyId',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'supplyId',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'supplyName',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'rateType',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'productName',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'rateAmount',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'liquidationType',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'liquidationDate',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'liquidationTool',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'agreementDate',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'status',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label-last',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }];


    vm.schema = {
        'type': 'object',
        'properties': {
            'agencyId': {
                'title': '代理协议ID',
                'type': 'string',
                'format': 'hLabel'
            },
            'supplyId': {
                'title': '供应商ID',
                'type': 'string',
                'format': 'hLabel'
            },
            'supplyName': {
                'title': '供应商名称',
                'type': 'string',
                'format': 'hLabel'
            },
            'rateType': {
                'title': '费率方式',
                'type': 'string',
                'format': 'hLabel'
            },
            'productName': {
                'title': '基金名称',
                'type': 'string',
                'format': 'hLabel'
            },
            'rateAmount': {
                'title': '费率',
                'type': 'string',
                'format': 'hLabel'
            },
            'liquidationType': {
                'title': '清算方式',
                'type': 'string',
                'format': 'hLabel'
            },
            'liquidationDate': {
                'title': '清算日',
                'type': 'string',
                'format': 'hLabel'
            },
            'liquidationTool': {
                'title': '清算工具',
                'type': 'string',
                'format': 'hLabel'
            },
            'agreementDate': {
                'title': '协议时间',
                'type': 'string',
                'format': 'hLabel'
            },
            'status':{
                'title': '状态',
                'type': 'string',
                'format': 'hLabel'
            }
        }
    };
};
