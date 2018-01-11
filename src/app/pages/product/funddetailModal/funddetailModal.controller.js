'use strict';

module.exports = function(params, toastr, ModalService, FundProductService, ValidationService, FundProductModalConstant, titleMapFilterFilter, $scope, supplierService, FundConstant,FundManagerService) {
    var vm = this;
    vm.initForm = initForm;
    vm.model = {};
    vm.tabs = [{
        title: '基金基本信息',
        content: 'Dynamic content 1'
    }, {
        title: '基金费率信息',
        content: 'Dynamic content 2'
    }];
    vm.supplierInfo = [];
    vm.productAmountUomId = [{
        'value': 'QUANTITY',
        'name': '份'
    }, {
        'value': 'AMOUNT',
        'name': '元'
    }];

    vm.statusIdOptions = [{
        'value': 'ON_SALE',
        'name': '在售'
    },{
        'value': 'OFF_SALE',
        'name': '已下架'
    }];

    vm.uomTypes = FundProductModalConstant.uomTypes;
    vm.amountUomIds = FundProductModalConstant.amountUomIds;

    vm.selectFun = selectFun;
    vm.initModel = initModel;

    vm.uomTypes = FundProductModalConstant.uomTypes;
    vm.amountUomIds = FundProductModalConstant.amountUomIds;
    vm.initForm();

    initFundManagerList();
    vm.productManagerInfos = [];
    function initFundManagerList(){
        var pageInfo = {
            'pageInfo': {
                startIndex: '1',
                pageSize: '100'
            }
        };
        FundManagerService.search(pageInfo).then(function(data){
            var productManagerList = data.ProductManagerList;
            for (var i = productManagerList.length - 1; i >= 0; i--) {
                vm.productManagerInfos.push({
                    name: productManagerList[i].partyName,
                    value: productManagerList[i].partyId
                });
            }
        });
    }

    function selectFun(index) {
        if (index === 1) {
            $(window).resize(function() {
                $('.ui-grid-header-viewport').css({
                    'overflow': 'visible'
                });
                $('.ui-grid-cell-contents').css({
                    'overflow': 'visible'
                });
                $('.ui-grid-row').css({
                    'overflow': 'visible'
                });
            });
        }
    }

    function initModel() {
        if (params.productId) {
            var detailParam = angular.extend({}, vm.model, params);
            FundProductService.searchDetail(detailParam).then(function(data) {
                //初始化数据
                vm.model = angular.copy(data.ProductDetail);
                //基本数据转化
                //供应商信息
                vm.model.manffacturerPartyId = titleMapFilterFilter(vm.model.manffacturerPartyId, vm.supplierInfo);
                //产品类型
                vm.model.productTypeId = titleMapFilterFilter(vm.model.productTypeId, FundConstant.productTypeIdOptions);
                //规模
                vm.model.productAmount = vm.model.productAmount + titleMapFilterFilter(vm.model.productAmountUomId, vm.productAmountUomId);
                //限额
                vm.model.minAmount = vm.model.minAmount + '元';
                vm.model.maxAmount = vm.model.maxAmount + '元';
                //风险等级
                vm.model.riskLevel = titleMapFilterFilter(vm.model.riskLevel, FundConstant.riskLevelOptions);
                //收费方式
                vm.model.chargeType = titleMapFilterFilter(vm.model.chargeType, FundConstant.chargeTypeOptions);
                //是否可赎回
                vm.model.redemption = titleMapFilterFilter(vm.model.redemption, FundConstant.redemptionOptions);
                //分红方式
                vm.model.dividend = titleMapFilterFilter(vm.model.dividend, FundConstant.dividendOptions);
                //首页推荐
                vm.model.pageRecommend = titleMapFilterFilter(vm.model.pageRecommend, FundConstant.pageRecommendOptions);

                vm.model.partyId = titleMapFilterFilter(vm.model.partyId,vm.productManagerInfos);
                //基金托管费
                if(vm.model.trusteeFee){
                    vm.model.trusteeFee = vm.model.trusteeFee + '元';
                }

                if(vm.model.managementCost){
                    vm.model.managementCost = vm.model.managementCost +'元';
                }

                vm.model.statusId = titleMapFilterFilter(vm.model.statusId,vm.statusIdOptions);
                vm.gridOptions.data = data.rateDetailList;
                vm.gridOptions.columnDefs.splice(vm.gridOptions.columnDefs.length - 1, 1);
                _.each(data.rateDetailList, function(item, index) {
                    var moneyFilter = titleMapFilterFilter(item.uomType, vm.uomTypes);
                    item.rateCombo = item.workLess + moneyFilter + '－' + item.workMore + moneyFilter;
                    item.rateNumber = item.rateAmount + titleMapFilterFilter(item.amountUomId, vm.amountUomIds);
                    item.rateNumberOff = item.rateAmountOff + titleMapFilterFilter(item.amountUomId, vm.amountUomIds);
                });
            }).then(function(err) {
                //toastr.error(err.message);
            })
        }
    }

    function initForm() {
        vm.gridOptions = angular.copy(FundProductModalConstant.gridOptions);
        vm.detailSchema = {
            'type': 'object',
            'properties': {
                'productName': {
                    'title': '基金产品名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'externalProductCode': {
                    'title': '基金代码',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'productTypeId': {
                    'title': '产品类型',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'prodMenuLevel': {
                    'title': '菜单层级',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'manffacturerPartyId': {
                    'title': '供应商',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'internalName': {
                    'title': '内部名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'brandName': {
                    'title': '基金公司名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'productAmount': {
                    'title': '基金规模',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'productAmountUomId': {
                    'title': '产品规模单位',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'productFoundDate': {
                    'title': '成立日期',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'statusId': {
                    'title': '产品状态',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'comments': {
                    'title': '备注',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'maxAmount': {
                    'title': '最大限额',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'maxAmountType': {
                    'title': '最大限额单位',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'minAmount': {
                    'title': '最小限额',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'minAmountType': {
                    'title': '最小限额单位',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'managementCost': {
                    'title': '基金管理费',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'trusteeFee': {
                    'title': '基金托管费',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'fundManagementCompany': {
                    'title': '基金管理公司',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'fundCustodianInstitutions': {
                    'title': '基金托管机构',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'fundSaleInstitutions': {
                    'title': '基金销售机构',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'chargeType': {
                    'title': '收费方式',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'riskLevel': {
                    'title': '风险等级',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'redemption': {
                    'title': '期限内可否赎回',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'dividend': {
                    'title': '分红方式',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'pageRecommend': {
                    'title': '首页推荐',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'partyId':{
                    'title':'基金经理',
                    'type':'string',
                    'format':'hLabel'
                }
            }
        };
        vm.detailForm = [{
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
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'productTypeId',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'manffacturerPartyId',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'internalName',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'brandName',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
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
            },
            /*{
                       type: 'section',
                       htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                       items: [{
                           key: 'productAmountUomId',
                           labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                           divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                       }]
                   }, */
            {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'productFoundDate',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'maxAmount',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            },
            /*{
                       type: 'section',
                       htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                       items: [{
                           key: 'maxAmountType',
                           labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                           divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                       }]
                   }, */
            {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'minAmount',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            },
            /*{
                       type: 'section',
                       htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                       items: [{
                           key: 'minAmountType',
                           labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                           divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                       }]
                   }, */
            {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'managementCost',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'trusteeFee',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            },{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'fundManagementCompany',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'fundCustodianInstitutions',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'fundSaleInstitutions',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'riskLevel',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            },{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'productTypeId',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'chargeType',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'redemption',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'dividend',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            },{
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'partyId',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'statusId',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'pageRecommend',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }/*, {
                type: 'section',
                htmlClass: 'col-lg-6 col-md-6 col-sm-6',
                items: [{
                    key: 'comments',
                    labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                    divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
                }]
            }*/
        ];

        //供应商详情
        var pageInfo = {
            startIndex: '1',
            pageSize: '100'
        };
        //查询供应商信息
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
            }
            vm.initModel();
        }).catch(function(error) {
            toastr.error(error.message);
        });

        if (params.productId) {
            FundProductService.searchDetail(params).then(function(data) {
                //初始化数据
                data.ProductDetail.productFoundDate = data.ProductDetail.productFoundDate.substring(0,10);
                vm.model = angular.copy(data.ProductDetail);
                //基本数据转化
                //供应商信息
                vm.model.manffacturerPartyId = titleMapFilterFilter(vm.model.manffacturerPartyId, vm.supplierInfo);
                //产品类型
                vm.model.productTypeId = titleMapFilterFilter(vm.model.productTypeId, FundConstant.productTypeIdOptions);
                //规模
                vm.model.productAmount = vm.model.productAmount + titleMapFilterFilter(vm.model.productAmountUomId, vm.productAmountUomId);
                //限额
                vm.model.minAmount = vm.model.minAmount + '元';
                vm.model.maxAmount = vm.model.maxAmount + '元';
                //风险等级
                vm.model.riskLevel = titleMapFilterFilter(vm.model.riskLevel, FundConstant.riskLevelOptions);
                //收费方式
                vm.model.chargeType = titleMapFilterFilter(vm.model.chargeType, FundConstant.chargeTypeOptions);
                //是否可赎回
                vm.model.redemption = titleMapFilterFilter(vm.model.redemption, FundConstant.redemptionOptions);
                //分红方式
                vm.model.dividend = titleMapFilterFilter(vm.model.dividend, FundConstant.dividendOptions);
                //首页推荐
                vm.model.pageRecommend = titleMapFilterFilter(vm.model.pageRecommend, FundConstant.pageRecommendOptions);

                // vm.model.productFoundDate = vm.model.productFoundDate.substring(0,10);
                //基金托管费
                vm.model.trusteeFee = vm.model.trusteeFee + '元';
                vm.gridOptions.data = data.rateDetailList;
                vm.gridOptions.columnDefs.splice(vm.gridOptions.columnDefs.length - 1, 1);
                _.each(data.rateDetailList, function(item, index) {
                    var moneyFilter = titleMapFilterFilter(item.uomType, vm.uomTypes);
                    item.rateCombo = item.workLess + moneyFilter + '－' + item.workMore + moneyFilter;
                    item.rateNumber = item.rateAmount + titleMapFilterFilter(item.amountUomId, vm.amountUomIds);
                    item.rateNumberOff = item.rateAmountOff + titleMapFilterFilter(item.amountUomId, vm.amountUomIds);
                });
            }).then(function(err) {
                //toastr.error(err.message);
            });

        }
    }
};
