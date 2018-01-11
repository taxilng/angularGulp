'use strict';

module.exports = function($scope, params, toastr, ModalService, supplierService, supplierModalConstant, timeFormatFilterFilter, CONFIG,SupplyTypeMapConstant,titleMapFilterFilter,CooperationStatusConstant) {
    var vm = this;
    vm.model = {};
    init();

    function init() {
        vm.model = angular.copy(params);
        vm.model.supplyType = titleMapFilterFilter(vm.model.supplyType,SupplyTypeMapConstant);
        vm.model.cooperationStatus = titleMapFilterFilter(vm.model.cooperationStatus,CooperationStatusConstant);
;        vm.form = [{
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
                key: 'address',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'legalPersonName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'website',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'contactNo',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'supplyScale',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'unifiedSocialCreditCode',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'supplyType',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'supplyFoundTime',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'institutionCode',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'cooperationStatus',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'cardNo',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'cooperationTime',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }];

        vm.schema = {
            'type': 'object',
            'properties': {
                'supplyName': {
                    'title': '供应商名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'address': {
                    'title': '公司地址',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'legalPersonName': {
                    'title': '法人代表',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'website': {
                    'title': '公司网址',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'contactNo': {
                    'title': '联系方式',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'supplyScale': {
                    'title': '公司规模',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'unifiedSocialCreditCode': {
                    'title': '工商行政代码',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'supplyType': {
                    'title': '公司行业',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'supplyFoundTime': {
                    'title': '成立日期',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'institutionCode': {
                    'title': '机构代码',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'cooperationStatus': {
                    'title': '合作状态',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'cardNo': {
                    'title': '结算账号',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'cooperationTime': {
                    'title': '合作开始日期',
                    'type': 'string',
                    'format': 'hLabel'
                }
            }
        }
    }
};
