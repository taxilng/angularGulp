'use strict';

module.exports = function($scope,params,CardtypeConstant,titleMapFilterFilter) {
    var vm = this;
    vm.model = {};

    //银行信息详情初始化
    bankInfoDetailInit();

    function bankInfoDetailInit(){
    vm.model.bankOrder = params.bankOrder;
    vm.model.singleMonthMoneyLimit = params.singleMonthMoneyLimit;
    vm.model.bankIcon = params.bankIcon;
    vm.model.state = params.state;
    vm.model.bankName = params.bankName;
    vm.model.cardType = titleMapFilterFilter(params.cardType,CardtypeConstant);
    vm.model.bankInfoId = params.bankInfoId;
    vm.model.bankId = params.bankId;
    vm.model.singleMonthTradeLimit = params.singleMonthTradeLimit;
    vm.model.singleDayTradeCountLimit = params.singleDayTradeCountLimit;
    vm.model.singleLimit = params.singleLimit;
    vm.model.description = params.description;
    vm.model.singleDayMoneyLimit = params.singleDayMoneyLimit;
    vm.model.createPerson = params.createPerson;
    vm.model.createDate = params.createDate;
	}


    vm.form = [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'bankName',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'bankId',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'singleLimit',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'singleDayMoneyLimit',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'singleDayTradeCountLimit',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'singleMonthMoneyLimit',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'singleMonthTradeLimit',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'cardType',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-last',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }/*, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'description',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }*/];


    vm.schema = {
        'type': 'object',
        'properties': {
            'bankName': {
                'title': '银行名称',
                'type': 'string',
                'format': 'hLabel'
            },
            'bankId': {
                'title': '行号',
                'type': 'string',
                'format': 'hLabel'
            },
            'singleLimit': {
                'title': '单笔限额',
                'type': 'string',
                'format': 'hLabel'
            },
            'singleDayMoneyLimit': {
                'title': '单日限额',
                'type': 'string',
                'format': 'hLabel'
            },
            'singleDayTradeCountLimit': {
                'title': '单日限次',
                'type': 'string',
                'format': 'hLabel'
            },
            'singleMonthMoneyLimit': {
                'title': '单月限额',
                'type': 'string',
                'format': 'hLabel'
            },
            'singleMonthTradeLimit': {
                'title': '单月限次',
                'type': 'string',
                'format': 'hLabel'
            },
            'description': {
                'title': '描述',
                'type': 'string',
                'format': 'hLabel'
            },
            'cardType':{
                'title': '卡类型',
                'type': 'string',
                'format': 'hLabel'
            }
        }
    };
};
