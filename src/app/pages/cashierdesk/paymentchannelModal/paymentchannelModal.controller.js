'use strict';
var _ = require('lodash');
module.exports = function($scope, params, toastr, ModalService, PaymentChannelService, BankinfoService, PaymentChannelModalConstant, ValidationService,$q) {
    var vm = this;
    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;
    var isAdd = true;
    vm.saveFunc = PaymentChannelService.save;
    vm.editFunc = PaymentChannelService.update;
    vm.searchFunc = BankinfoService.searchBankInfo;
    vm.page = {};
    vm.model = {};
    vm.defaultCheck = defaultCheck;
    vm.addToCheck = addToCheck;
    vm.checkAdded = checkAdded;
    vm.bankinfoList = [];
    vm.gridOptions = PaymentChannelModalConstant.investGridOptions;
    //grid
    vm.gridOptions.onRegisterApi = onRegisterApi;

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;
        gridApi.grid.appScope.addToCheck = function(row) {
            var item = row.entity;
            vm.addToCheck(item);
        };

        gridApi.grid.appScope.defaultCheck = function(row) {
            var item = row.entity;
            return vm.defaultCheck(item);
        };
    }

    //数据初始化
    init();

    function init() {
        vm.panelBanseInfoOptions = PaymentChannelModalConstant.panelBanseInfoOptions;
        vm.panelBankInfoOptions = PaymentChannelModalConstant.panelBankInfoOptions;

        vm.form = PaymentChannelModalConstant.investFormOptions;
        vm.schema = PaymentChannelModalConstant.investSchema;
        if (params.paymentChannelsId) {
            isAdd = false;
            vm.model = angular.copy(params);
            vm.model.channelsFee = Number(vm.model.channelsFee);
        }
    }

    function checkAdded(param) {
        var defer = $q.defer();
        var params = {
            channelCode: param.channelCode,
            pageSize: '999',
            startIndex: '1'
        };
        var promise = PaymentChannelService.search(params);
        promise.then(function(data) {
            if (data.paymentChannelsList && data.paymentChannelsList.length > 0) {
                toastr.warning('该交易渠道已增加');
                defer.resolve(true);
            } else {
                defer.resolve(false);
            }
        }).catch(function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    //设置选中checkbox
    function defaultCheck(param) {
        var bankInfoIdArr = [];
        /*for( var i = 0; i < arr.length; i++){
            bankInfoIdArr.push(arr[i].bankInfoId);//取银行信息Id数组
         }*/
        _.each(params.channelsToBankList, function(item, index) {
            bankInfoIdArr.push(item.bankInfoId);
        });
        if (_.indexOf(bankInfoIdArr, param.bankInfoId) > -1) {
            // param.checkbox = true;
            return true;
        } else {
            // param.checkbox = false;
            return false;
        }

    }

    function addToCheck(param) {
        if (param.checkbox == 'true') {
            param.checkbox = 'false';
        } else {
            param.checkbox = 'true';
        }
        /*var arr;
        //有银行列表，初始化
        if(params.bankinfoList){
            arr = params.bankinfoList;
        } else {
            arr = [];
            params.bankinfoList = arr;
        }
        if(_.indexOf(arr,param.bankId)===-1){
            if(param.checkbox){
                param.checkbox ='false';
            }else{
                param.checkbox = 'true';
            }
            //arr.push(param.bankId);
        } else {
            param.checkbox = 'false';
            //arr.splice(arr.indexOf(param.bankId),1);
        }*/
    }
    //银行信息初始化
    bankInfoListInit();


    function bankInfoListInit() {
        var pageInfo = {
            'startIndex': '1',
            'pageSize': '9999'
        };
        vm.searchFunc(pageInfo).then(function(data) {
            if (!data.bankInfoList || data.bankInfoList.length === 0) {
                toastr.error("未查到相应信息");
                return;
            }
            vm.page.total = data.totalCount;
            vm.bankinfoList = data.bankInfoList;
            vm.gridOptions.data = vm.bankinfoList;

            var bankInfoIdArr = [];
            _.each(params.channelsToBankList, function(item, index) {
                bankInfoIdArr.push(item.bankInfoId);
            });
            for (var i = vm.bankinfoList.length - 1; i >= 0; i--) {
                if (_.indexOf(bankInfoIdArr, vm.bankinfoList[i].bankInfoId) > -1) {
                    vm.bankinfoList[i].checkbox = 'true';
                } else {
                    vm.bankinfoList[i].checkbox = 'false';
                }
            }
            vm.gridOptions.data = vm.bankinfoList;

        });
    }

    function autoReceiveSure(ngForm) {
        var bankinfoId = getCheckedId(vm.gridOptions.data, 'bankInfoId');
        var newParams = angular.extend(bankinfoId, vm.model);
        newParams.channelsFee = newParams.channelsFee + '';
        // if(newParams.channelsFee){
        //     newParams.channelsFee = ValidationService.toStdAmount(newParams.channelsFee);
        // }
        if (!checkInput(newParams, ngForm)) {
            return;
        }
        if (isAdd) {
            save(newParams);
        } else {
            update(newParams);
        }
    }

    function save(params) {
        vm.checkAdded(params).then(function(data) {
            if (!data) {
                vm.saveFunc(params).then(function(result) {
                    toastr.success('新增成功');
                    closeModal();
                }).catch(function(err) {
                    // dismissModal();
                    toastr.error(err.message);
                });
            }
        }).catch(function(error) {

        });
    }

    function update(params) {
        vm.editFunc(params).then(function(result) {
            toastr.success('修改成功');
            closeModal();
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    //取消
    function dismissModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    function closeModal(value) {
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId, value);
    }

    //获取选中Id
    function getCheckedId(list, item) {
        var arr = [],
            list = list;

        if (!list) {
            return;
        }

        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].checkbox == 'true') {
                var obj = {
                    'bankInfoId': list[i][item]
                };
                arr.push(obj);
            }
        }
        var templist = {};
        templist.bankInfoList = arr;
        return templist;
    }

    function checkInput(params, ngForm) {
        ValidationService.validate(ngForm);
        if (ValidationService.isEmpty(params.paymentChannelsName)) {
            toastr.warning('请输入支付渠道名称');
            return false;
        } else {
            if (ValidationService.containSpecial(params.paymentChannelsName)) {
                toastr.warning('支付渠道名称不能包含特殊符号');
                return false;
            }
        }

        if (ValidationService.isEmpty(params.channelCode)) {
            toastr.warning('请输入渠道编码');
            return false;
        } else {
            if (!ValidationService.isIntChar(params.channelCode)) {
                toastr.warning('渠道编码为字母或数字');
                return false;
            }
        }

        if (ValidationService.isEmpty(params.channelsFee)) {
            toastr.warning('请输入渠道手续费');
            return false;
        } else {
            if (!ValidationService.isMoney(params.channelsFee, 8)) {
                toastr.warning('渠道手续费为8位以内的整数或小数');
                return false;
            }
        }

        if (ValidationService.isEmpty(params.productId)) {
            toastr.warning('请输入支付产品编号');
            return false;
        } else {
            if (!ValidationService.isInteger(params.productId)) {
                toastr.warning('支付产品编号为数字');
                return false;
            }
        }
        return true;
    }
};
