'use strict';
var _ = require('lodash');
module.exports = function(params, toastr, ModalService, TransactionTypeModalConstant, bankinfoService, titleMapFilterFilter, cashierdeskService, $timeout) {
    var vm = this;
    vm.init = init;
    vm.searchFunc = bankinfoService.searchBankInfo;
    vm.channelArr = TransactionTypeModalConstant.channelArr;
    vm.searchPaymodesFunc = cashierdeskService.searchPaymodes;
    init();

    function init() {
        vm.tabs = [{
            title: '交易类型信息',
            content: ''
        }, {
            title: '交易类型支持的支付方式',
            content: ''
        }, {
            title: '交易类型支持的银行卡',
            content: ''
        }];
        vm.form = [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'transactionTypeName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'transactionTypeCode',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'englishFlag',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }/*, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'discription',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }*/];


        vm.schema = {
            'type': 'object',
            'properties': {
                'transactionTypeName': {
                    'title': '交易类型名称',
                    'type': 'string',
                    'format': 'hLabel',
                },
                'transactionTypeCode': {
                    'title': '交易类型编码',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'englishFlag': {
                    'title': '英文标识',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'discription': {
                    'title': '描述',
                    'type': 'string',
                    'format': 'hLabel'
                }
            }
        };
        vm.panelBanseInfoOptions = TransactionTypeModalConstant.panelBanseInfoOptions;
        vm.panelPayMethodInfoOptions = TransactionTypeModalConstant.panelPayMethodInfoOptions;
        vm.panelBankInfoOptions = TransactionTypeModalConstant.panelBankInfoOptions;
        vm.gridOptions = angular.copy(TransactionTypeModalConstant.investGridOptions);
        vm.gridOptions.columnDefs.splice(0, 1);
        vm.paygridOptions = {
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableColumnMenus: false,
            enableSorting: false,
            columnDefs: [{
                name: '支付方式',
                field: 'payMethodName',
                width: 425
            }, {
                name: '支付渠道',
                field: 'channelStr',
                width: 425
            }],
            data: []
        };
        vm.selectFun = selectFun;

        vm.formModal = {
            transactionTypeName: params.transactionTypeName,
            transactionTypeCode: params.transactionTypeCode,
            englishFlag: params.englishFlag,
            discription: params.discription
        };

        payMethodInit();
        //支付方式
        var pageInfo = {
            'startIndex': '1',
            'pageSize': '9999'
        };
        //后台默认不传分页参数时pagesize =15 ,查询的银行信息数据不全
        vm.searchFunc(pageInfo).then(function(data) {
            console.log(data.bankInfoList);
            vm.bankList = [];
            _.each(data.bankInfoList, function(item, index) {
                var isFind = _.find(params.bankInfoList, function(bItem, bIndex) {
                    return bItem.bankInfoId === item.bankInfoId;
                });
                if (isFind) {
                    vm.bankList.push(item);
                }
            });
            vm.gridOptions.data = vm.bankList;
        });
    }

    function payMethodInit() {
        var pageInfo = {
            'startIndex': '1',
            'pageSize': '9999'
        };
        vm.searchPaymodesFunc(pageInfo).then(function(data) {
            vm.payMethodMap = [];

            //组装全量支付方式
            _.each(data.payMethodList, function(item, index) {
                var source = {
                    value: item.payMethodId,
                    name: item.payMethodName
                };
                vm.payMethodMap.push(source);
            });
            vm.payMethodList = [];
            _.each(params.payMethodList, function(item) {
                var payItem = {
                    payMethodName: titleMapFilterFilter(item.payMethodId, vm.payMethodMap),
                    channelStr: ''
                };
                _.each(item.transactionChannelsList, function(cItem) {
                    payItem.channelStr += titleMapFilterFilter(cItem.transactionChannels, vm.channelArr) + ' ';
                });
                vm.payMethodList.push(payItem);
            });
            vm.paygridOptions.data = vm.payMethodList;
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
                $('#grid2').css({
                    'display': 'block'
                });
            });

        } else if (index === 2) {
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
                $('#grid3').css({
                    'display': 'block'
                });
            });
        }
    }

};
