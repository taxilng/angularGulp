'use strict';
var _ = require('lodash');
module.exports = function(
    $scope, params, toastr, ModalService, CashierdeskService, $timeout, $filter,titleMapFilterFilter) {
    var vm = this;
    vm.model = {};
    vm.methodLabel = [{
        value: 'QUICK',
        name: '快捷支付'
    }, {
        value: 'ACCOUNT',
        name: '钱包支付'
    }, {
        value: 'OTHER',
        name: '第三方支付'
    }];
    paymodeInit();


    function paymodeInit() {
        vm.model.payMethodId = params.payMethodId;
        vm.model.payMethodName = params.payMethodName;
        vm.model.description = params.description;
        vm.model.methodLabel = titleMapFilterFilter(params.methodLabel, vm.methodLabel);
        vm.model.state = params.state;
    }
    vm.form = [/*{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'payMethodId',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, */{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'payMethodName',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-label-last',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'methodLabel',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label-last',
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
            'payMethodName': {
                'title': '支付方式名称',
                'type': 'string',
                'format': 'hLabel'
            },
            'methodLabel': {
                'title': '分类标签',
                'type': 'string',
                'format': 'hLabel'
            },
            'description': {
                'title': '描述',
                'type': 'string',
                'format': 'hLabel'
            },
            'payMethodId': {
                'title': '支付方式编号',
                'type': 'string',
                'format': 'hLabel'
            }
        }
    };
};
