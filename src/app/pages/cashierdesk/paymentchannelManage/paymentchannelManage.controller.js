'use strict';
var paymentchannelModal = require('../paymentchannelModal');
var comboAddModal = require('../../modalPages/comboAddModal');
var paymentchanneldetailModal = require('../paymentchanneldetailModal');
module.exports = function(PaymentChannelService, ModalService, toastr, PaymentChannelManageConstant, $ngBootbox, validationService) {
    var vm = this;
    vm.searchFunc = PaymentChannelService.search;
    vm.delFunc = PaymentChannelService.del;
    vm.addpaymentchannelmode = addpaymentchannelmode;
    vm.editpaymentchannelmode = editpaymentchannelmode;
    vm.delpaymentchannelmode = delpaymentchannelmode;
    vm.doCtrlPagingAct = doCtrlPagingAct;

    vm.searchInfo = searchInfo;
    vm.reset = reset;
    vm.checkPaymentchanneldetail = checkPaymentchanneldetail;
    vm.model = {};
    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };
    //form
    vm.form = PaymentChannelManageConstant.investFormOption;
    vm.schema = PaymentChannelManageConstant.investSchema;
    //pannel
    vm.formPanelOptions = PaymentChannelManageConstant.formPanelOptions;
    vm.gridPanelOptions = PaymentChannelManageConstant.gridPanelOptions;
    vm.gridOptions = PaymentChannelManageConstant.investGridOptions;
    //grid
    vm.gridOptions.onRegisterApi = onRegisterApi;
    //初始化数据
    init();

    function init() {
        search(vm.page);
    }

    function searchInfo() {
        vm.page.startIndex = 1;
        search(vm.page);
    }


    function checkInput(params) {
        if (params.paymentChannelsName) {
            if (validationService.containSpecial(params.paymentChannelsName)) {
                toastr.warning('支付渠道名称不能包含特殊符号');
                return false;
            }
        }

        if (params.channelsFee) {
            if (!validationService.isMoney(params.channelsFee, 8)) {
                toastr.warning('手续费金额为8位以内的整数或小数');
                return false;
            }
        }

        if (params.channelCode) {
            if(!validationService.isIntChar(params.channelCode)){
                toastr.warning('渠道编码为字母或数字');
                return false;
            }
        }

        if (params.productId) {
            if (!validationService.isInteger(params.productId)) {
                toastr.warning('支付产品编号必须是数字');
                return false;
            }
        }
        return true;
    }


    function search(param) {
        var newParam = angular.extend(vm.model, {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        });
        // if(newParam.channelsFee){
        //     newParam.channelsFee = validationService.toStdAmount(newParam.channelsFee);
        // }

        //输入校验
        if (!checkInput(newParam)) {
            return;
        }

        vm.searchFunc(newParam).then(function(data) {
            if (!data.paymentChannelsList || data.paymentChannelsList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = data.paymentChannelsList;
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.paymentChannelsList;
            }
        });
    }

    //新增弹窗
    function addpaymentchannelmode() {
        var params = {};
        ModalService.showModal({
            modalId: 'paymentchannelModal',
            template: paymentchannelModal.html,
            modalTitle: '新增交易渠道信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'PaymentChannelService', 'BankinfoService', 'PaymentChannelModalConstant', 'ValidationService','$q', paymentchannelModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            toastr.success('新增成功');
            init();
        });
    }

    function editpaymentchannelmode(params) {
        ModalService.showModal({
            modalId: 'paymentchannelModal',
            template: paymentchannelModal.html,
            modalTitle: '修改交易渠道信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'PaymentChannelService', 'BankinfoService', 'PaymentChannelModalConstant', 'ValidationService','$q', paymentchannelModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            toastr.success('修改成功');
            init();
        });
    }

    function delpaymentchannelmode(params) {
        $ngBootbox.confirm('确认要删除该支付渠道吗？').then(function() {
            vm.delFunc(params).then(function(data) {
                toastr.success('删除成功');
                init();
            });
        }, function() {});
    }

    function reset() {
        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        vm.model = {};
        search(vm.page);
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.editpaymentchannelmode = function(row) {
            var item = row.entity;
            vm.editpaymentchannelmode(item);
        };


        gridApi.grid.appScope.delpaymentchannelmode = function(row) {
            var item = row.entity;
            vm.delpaymentchannelmode(item);
        };


        gridApi.grid.appScope.detailpaymentchannelmode = function(row) {
            var item = row.entity;
            vm.checkPaymentchanneldetail(item);
        };
    }

    function checkPaymentchanneldetail(params) {
        ModalService.showModal({
            modalId: 'paymentchanneldetailModal',
            template: paymentchanneldetailModal.html,
            modalTitle: '查看交易渠道详情',
            controller: ['params', 'toastr', 'ModalService', 'PaymentChannelService', 'BankinfoService', 'PaymentChannelModalConstant', 'ValidationService', paymentchanneldetailModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            init();
        });
    }

    //分页
    function doCtrlPagingAct(page, pageSize, total) {
        var param = {
            'startIndex': page,
            'pageSize': pageSize
        };
        if (page === 1) {
            vm.page = param;
        }
        search(param);
    };
};
