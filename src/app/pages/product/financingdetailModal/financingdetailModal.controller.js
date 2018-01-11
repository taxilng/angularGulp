'use strict';

module.exports = function(params, toastr, ModalService, financingProductService, titleMapFilterFilter, supplierService) {
    var vm = this;

    vm.statusIdOptions = [{
        name: '在售',
        value: 'ON_SALE'
    }, {
        name: '下架',
        value: 'OFF_SALE'
    }];
    vm.riskLevelOptions = [{
        value: 'R5',
        name: '激进型'
    }, {
        value: 'R4',
        name: '进取型'
    }, {
        value: 'R3',
        name: '平衡型'
    }, {
        value: 'R2',
        name: '稳健型'
    }, {
        value: 'R1',
        name: '谨慎型'
    }];

    vm.productTermTypeOptions = [{
        value: 'DAY',
        name: '天'
    }, {
        value: 'MONTH',
        name: '月'
    }, {
        value: 'YEAR',
        name: '年'
    }];
    vm.newCustomerVipOptions = [{
        name: '是',
        value: '1'
    }, {
        name: '否',
        value: '0'
    }];
    vm.pageRecommendOptions = [{
        name: '是',
        value: '1'
    }, {
        name: '否',
        value: '0'
    }];
    vm.productAmountUomId = [{
        'value': 'QUANTITY',
        'name': '份'
    }, {
        'value': 'AMOUNT',
        'name': '元'
    }];
    vm.paymentMethod = [{
        'value': '1',
        'name': '按月付息，到期还本'
    }, {
        'value': '2',
        'name': '一次性还本付息'
    }];

    vm.supplierInfo = [];
    //初始化数据
    init();

    function init() {
        //供应商详情
        var pageInfo = {
            startIndex: '1',
            pageSize: '100'
        };
        supplierService.querySupplierInfo(pageInfo).then(function(data) {
            if (!data.SupplyDetailList || data.SupplyDetailList.length === 0) {
                vm.supplierInfo.push({
                    name: '查询无记录',
                    value: ''
                });
            } else {
                for (var i = data.SupplyDetailList.length - 1; i >= 0; i--) {
                    vm.supplierInfo.push({
                        name: data.SupplyDetailList[i].supplyName,
                        value: data.SupplyDetailList[i].supplyId,
                    });
                }
                //查询详情信息
                if (params.productId) {
                    //查询详情并初始化
                    var detailParam = angular.extend({}, vm.model, params);
                    financingProductService.searchDetail(detailParam).then(function(data) {
                        vm.model = angular.copy(data.ProductDetail);
                        vm.model.statusId = titleMapFilterFilter(vm.model.statusId, vm.statusIdOptions);
                        vm.model.riskLevel = titleMapFilterFilter(vm.model.riskLevel, vm.riskLevelOptions);
                        vm.model.productTerm = vm.model.productTerm + titleMapFilterFilter(vm.model.productTermType, vm.productTermTypeOptions);
                        vm.model.minAmount = vm.model.minAmount + '元',
                            vm.model.maxAmount = vm.model.maxAmount + '元',
                            vm.model.productAmount = vm.model.productAmount + titleMapFilterFilter(vm.model.productAmountUomId, vm.productAmountUomId);
                        vm.model.newCustomerVip = titleMapFilterFilter(vm.model.newCustomerVip, vm.newCustomerVipOptions);
                        vm.model.pageRecommend = titleMapFilterFilter(vm.model.pageRecommend, vm.pageRecommendOptions);
                        vm.model.paymentMethod = titleMapFilterFilter(vm.model.paymentMethod, vm.paymentMethod);
                        //供应商信息
                        vm.model.productFoundDate = vm.model.productFoundDate.substring(0, 10);
                        vm.model.manffacturerPartyId = titleMapFilterFilter(vm.model.manffacturerPartyId, vm.supplierInfo);
                    });
                }
            }
        }).catch(function(error) {
            toastr.error(error.message);
        });

    }

    vm.form = [{
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
                key: 'externalProductCode',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'manffacturerPartyId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'internalName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'productAmount',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'interestStartDate',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'interestEndDate',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'statusId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'riskLevel',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'productFoundDate',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'price',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'productTerm',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'minAmount',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'maxAmount',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'receiptDate',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'paymentMethod',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'fundManagementCompany',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'fundCustodianInstitutions',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        },{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'fundSaleInstitutions',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'newCustomerVip',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'pageRecommend',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }
        // ,{
        //     type: 'section',
        //     htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        //     items: [{
        //         key: 'comments',
        //         labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
        //         divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        //     }]
        // }
    ];

    vm.schema = {
        type: 'object',
        properties: {
            'productName': {
                'title': '产品名称',
                'type': 'string',
                'format': 'hLabel'
            },
            'externalProductCode': {
                'title': '外部产品代码',
                'type': 'string',
                'format': 'hLabel'
            },
            'manffacturerPartyId': {
                'title': '供应商',
                'type': 'string',
                'format': 'hLabel',
            },
            'productAmount': {
                'title': '产品规模',
                'type': 'string',
                'format': 'hLabel'
            },
            'productFoundDate': {
                'title': '成立日期',
                'type': 'string',
                'format': 'hLabel'
            },
            'interestStartDate': {
                'title': '起息日',
                'type': 'string',
                'format': 'hLabel'
            },
            'interestEndDate': {
                'title': '结息日',
                'type': 'string',
                'format': 'hLabel'
            },
            'statusId': {
                'title': '状态',
                'type': 'string',
                'format': 'hLabel',
            },
            'riskLevel': {
                'title': '风险等级',
                'type': 'string',
                'format': 'hLabel',
            },
            'receiptDate': {
                'title': '收款日',
                'type': 'string',
                'format': 'hLabel'
            },
            'price': {
                'title': '预期年化收益',
                'type': 'string',
                'format': 'hLabel'
            },
            'productTerm': {
                'title': '理财期限',
                'type': 'string',
                'format': 'hLabel'
            },
            'startAmount': {
                'title': '起购金额',
                'type': 'string',
                'format': 'hLabel'
            },
            'minAmount': {
                'title': '最小限额',
                'type': 'string',
                'format': 'hLabel'
            },
            'maxAmount': {
                'title': '最大限额',
                'type': 'string',
                'format': 'hLabel'
            },
            'internalName': {
                'title': '内部名称',
                'type': 'string',
                'format': 'hLabel'
            },
            // 'comments': {
            //     'title': '备注',
            //     'type': 'string',
            //     'format': 'hLabel'
            // },
            'newCustomerVip': {
                'title': '新客专享产品',
                'type': 'string',
                'format': 'hLabel'
            },
            'paymentMethod': {
                'title': '兑付方式',
                'type': 'string',
                'format': 'hLabel'
            },
            'pageRecommend': {
                'title': '首页推荐',
                'type': 'string',
                'format': 'hLabel'
            },
            'fundManagementCompany': {
                'title': '受托投资管理机构',
                'type': 'string',
                'format': 'hLabel'
            },
            'fundCustodianInstitutions': {
                'title': '托管机构',
                'type': 'string',
                'format': 'hLabel'
            },
            'fundSaleInstitutions': {
                'title': '发行机构',
                'type': 'string',
                'format': 'hLabel'
            }
        }
    };
};
