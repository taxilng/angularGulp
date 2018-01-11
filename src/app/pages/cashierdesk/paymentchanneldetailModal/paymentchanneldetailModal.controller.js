'use strict';
var _ = require('lodash');
module.exports = function(params, toastr, modalService, paymentChannelService, bankinfoService, paymentChannelModalConstant, validationService) {
    var vm = this;
    vm.init = init;
    vm.searchFunc = bankinfoService.searchBankInfo;
    init();

    function init() {
        vm.form = [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'paymentChannelsName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'channelCode',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'channelsFee',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'productId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }];


        vm.schema = {
            'type': 'object',
            'properties': {
                'paymentChannelsName': {
                    'title': '支付渠道名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'channelsFee': {
                    'title': '渠道手续费',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'channelCode': {
                    'title': '渠道编码',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'productId': {
                    'title': '支付产品编号',
                    'type': 'string',
                    'format': 'hLabel'
                }
            }
        };
        vm.panelBanseInfoOptions = paymentChannelModalConstant.panelBanseInfoOptions;
        vm.panelPayMethodInfoOptions = paymentChannelModalConstant.panelBankInfoOptions;
        vm.gridOptions = angular.copy(paymentChannelModalConstant.investGridOptions);
        vm.gridOptions.columnDefs.splice(0,1);
        vm.formModal = {
            paymentChannelsName: params.paymentChannelsName,
            channelsFee: params.channelsFee,
            channelCode: params.channelCode,
            productId: params.productId
        };
        if (params.channelsToBankList && params.channelsToBankList.length > 0) {
            var pageInfo = {
            'startIndex': '1',
            'pageSize': '9999'
            };
            vm.searchFunc(pageInfo).then(function(data) {
                console.log(data.bankInfoList);
                vm.bankList = [];
                _.each(data.bankInfoList, function(item, index) {
                    var isFind = _.find(params.channelsToBankList, function(bItem, bIndex) {
                        return bItem.bankInfoId === item.bankInfoId;
                    });
                    if (isFind) {
                        vm.bankList.push(item);
                    }
                });
                vm.gridOptions.data = vm.bankList;
            });
        }
    }
};
