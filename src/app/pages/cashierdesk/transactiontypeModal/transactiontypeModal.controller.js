'use strict';
var _ = require('lodash');
module.exports = function($scope,params,toastr,ModalService,transactiontypeService,cashierdeskService,bankinfoService,TransactionTypeModalConstant,ValidationService) {
    var vm = this;
    vm.page = {};
    vm.checkedAll = checkedAll;
    vm.searchPaymodesFunc = cashierdeskService.searchPaymodes;
    vm.searchFunc = bankinfoService.searchBankInfo;
    vm.saveFunc = transactiontypeService.save;
    vm.editFunc = transactiontypeService.update;
    vm.autoReceiveSure = autoReceiveSure;
    vm.save = save;
    vm.update = update;
    vm.model = {};
    var isAdd = true;
    vm.dismissModal = dismissModal;
    vm.defaultCheck = defaultCheck;
    vm.addToCheck = addToCheck;
    vm.onSelectSource = onSelectSource;

    vm.dataTarget = [];
    vm.addToTarget = addToTarget;
    vm.removeTarget = removeTarget;
    vm.onSelectTarget = onSelectTarget;
    vm.addChannelItem = addChannelItem;
    vm.checkInTarget = checkInTarget;
    vm.addChannelSource = addChannelSource;

    vm.currentSelectSource = {
        channelArr: []
    };
    vm.channelTip = '请选择支付渠道';
    vm.list =[];
    vm.channelInitArr = TransactionTypeModalConstant.channelArr;
    vm.channelArr = angular.copy(vm.channelInitArr);
    vm.gridOptions = TransactionTypeModalConstant.investGridOptions;
    vm.checkSource = checkSource;
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

    //设置选中checkbox
    function defaultCheck(param){
        var arr = params.bankInfoList;//银行信息数组
        var bankInfoIdArr =[];
        _.each(params.bankInfoList,function(item,index){
            bankInfoIdArr.push(item.bankInfoId);
        });
        if(_.indexOf(bankInfoIdArr,param.bankInfoId)>-1){
            return true;
        }else{
            return false;
        }
    }

    //数据初始化
    init();
    function init(){
        vm.panelBanseInfoOptions = TransactionTypeModalConstant.panelBanseInfoOptions;
        vm.panelPayMethodInfoOptions = TransactionTypeModalConstant.panelPayMethodInfoOptions;
        vm.panelBankInfoOptions = TransactionTypeModalConstant.panelBankInfoOptions;

        vm.form = TransactionTypeModalConstant.investFormOptions;
        vm.schema = TransactionTypeModalConstant.investSchema;

        if(params.transactionTypeId){
            console.log(params);
            isAdd = false;
            vm.form[0].items[1].items[0].readonly = true;
            vm.form[1].items[0].items[0].readonly = true;
            // vm.schema.properties.transactionTypeCode.readonly = true;
            // vm.schema.properties.englishFlag.readonly = true;
            vm.model.transactionTypeName = params.transactionTypeName;
            vm.model.transactionTypeCode = params.transactionTypeCode;
            vm.model.englishFlag = params.englishFlag;
            vm.model.discription = params.discription;
            vm.model.transactionTypeId = params.transactionTypeId;
            vm.model.state = params.state;
            vm.dataTarget = [];
            if(!params.payMethodList){
                params.payMethodList = [];
            }
        } else {
            vm.form[0].items[1].items[0].readonly = false;
            vm.form[1].items[0].items[0].readonly = false;
        }

        //源支付方式初始化
        payMethodInit();
    }

    function checkSource(source) {
        var hasFlag = false;
        _.each(params.payMethodList,function(item,index){
            if (item.payMethodId === source.value) {
                hasFlag = true;
            }
        });
        return hasFlag;
    }

    //全量银行信息初始化
    bankInfoListInit();
    function bankInfoListInit(){
        var pageInfo = {
            'startIndex': '1',
            'pageSize': '9999'
        };
        vm.searchFunc(pageInfo).then(function(data){
            if(!data.bankInfoList||data.bankInfoList.length === 0){
                toastr.error("未查到相应信息");
                return ;
            }
            vm.page.total = data.totalCount;
            vm.bankinfoList = data.bankInfoList;
            vm.gridOptions.data = data.bankInfoList;

            var bankInfoIdArr =[];
            _.each(params.bankInfoList,function(item,index){
                bankInfoIdArr.push(item.bankInfoId);
            });

            for (var i = vm.bankinfoList.length - 1; i >= 0; i--) {
                if(_.indexOf(bankInfoIdArr,vm.bankinfoList[i].bankInfoId)>-1){
                    vm.bankinfoList[i].checkbox = 'true';
                }else{
                    vm.bankinfoList[i].checkbox = 'false';
                }
            }

            vm.gridOptions.data = data.bankInfoList;
        });
    }

    function modifyPayInit(targetPay){

         _.each(vm.dataSource, function(item){
            item.check = false;
            if(item.payMethodId == targetPay.payMethodId){
                item.check = true;
                item.disabled = false;
            }
        });

        vm.channelArr = angular.copy(vm.channelInitArr);
        for (var j = targetPay.channelArr.length - 1; j >= 0; j--) {

            _.each(vm.channelArr, function(item){
                if(item.value == targetPay.channelArr[j].id){
                    item.checkbox = true;
                }
            });
        }
    };

    function payMethodInit(){
        var pageInfo = {
            'startIndex': '1',
            'pageSize': '9999'
        };
        vm.searchPaymodesFunc(pageInfo).then(function(data){
            console.log(data);
            var payInfoList = data.payMethodList;
            vm.payMethodMap = [];
            //组织参数
            for (var i = payInfoList.length - 1; i >= 0; i--) {
                // payInfoList[i].available = true;
                payInfoList[i].check = false;
                payInfoList[i].channelArr = [];
                payInfoList[i].disabled = false;
                var source = {
                    value:payInfoList[i].payMethodId,
                    name:payInfoList[i].payMethodName
                };
                vm.payMethodMap.push(source);
                // payInfoList[i].disabled = vm.checkSource(source);
            }
            console.log(vm.payMethodMap);
            vm.dataSource = payInfoList;

            if(params.transactionTypeId){

                for (var i = 0, len = params.payMethodList.length - 1; i <= len; i++) {
                    var obj ={};
                    var obj1={};
                    var arr =[];
                    // obj.payMethodName = params.payMethodList[i].payMethodId;
                    obj.payMethodId = params.payMethodList[i].payMethodId;
                    obj.check = (i == 0) ? true: false;

                    for (var j = params.payMethodList[i].transactionChannelsList.length - 1; j >= 0; j--) {
                        obj1 = {
                            "id":params.payMethodList[i].transactionChannelsList[j].transactionChannels
                        };
                        arr.push(obj1);
                    }
                    obj.channelArr = arr;
                    vm.dataTarget.push(obj);
                }
                modifyPayInit(vm.dataTarget[0]);
            }
        });
    }

    function autoReceiveSure(ngForm){
        if(isAdd){
            save(ngForm);
        }else{
            update(ngForm);
        }
    }
    function save(ngForm){

        for (var i = vm.dataTarget.length - 1; i >= 0; i--) {
            var obj = {};
            obj.payMethodId = vm.dataTarget[i].payMethodId;
            obj.transactionChannelsList = [];
            for (var j = vm.dataTarget[i].channelArr.length - 1; j >= 0; j--) {
                obj.transactionChannelsList.push({"transactionChannels":vm.dataTarget[i].channelArr[j].id});
            }
            vm.list.push(obj);
        }

        var bankinfoId = getCheckedId(vm.bankinfoList, 'bankInfoId');
        var newParams = angular.extend(bankinfoId, vm.model,
            {"payMethodList":vm.list});

        if(!checkInput(newParams,ngForm)){
            return ;
        }

        vm.saveFunc(newParams).then(function(result){
            toastr.success('新增成功');
            closeModal();
        }).catch (function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    function update(ngForm){
        console.log(vm.dataTarget);

        for (var i = vm.dataTarget.length - 1; i >= 0; i--) {
            var obj = {};
            obj.payMethodId = vm.dataTarget[i].payMethodId;
            obj.transactionChannelsList = [];
            for (var j = vm.dataTarget[i].channelArr.length - 1; j >= 0; j--) {
                obj.transactionChannelsList.push({"transactionChannels":vm.dataTarget[i].channelArr[j].id});
            }
            vm.list.push(obj);
        }
        var bankinfoId = getCheckedId(vm.bankinfoList, 'bankInfoId');
        var newParams = angular.extend(bankinfoId, vm.model,{"payMethodList":vm.list});
        if(!checkInput(newParams,ngForm)){
            return;
        }
        vm.editFunc(newParams).then(function(result){
            toastr.success('修改成功');
            closeModal();
        }).catch (function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    //取消
    function dismissModal(){
       var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }

    function closeModal(value) {
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId, value);
    }

    /**
     * 全选
     */
    function checkedAll() {
        vm.payMethodList = setChecked(vm.checkAll, vm.payMethodList);
    }

    //设置选中效果
    function setChecked(flag, list) {
        if (!list) {
            return;
        }
        var newArr = list.map(function(item) {
            if (flag) {
                item.checkbox = true;
            } else {
                item.checkbox = false;
            }
            return item;
        });
        return newArr;
    }


    //获取选中Id
    function getCheckedId(list, item) {
        var arr = [],
            list = list;

        if (!list) {
            return;
        }

        for (var i = 0, len = list.length; i < len; i++) {
            if(list[i].checkbox == 'true'){
                var obj = {
                    'bankInfoId':list[i][item]
                };
                arr.push(obj);
            }
        }
        var templist = {};
        templist.bankInfoList = arr;
        return templist;
    }

    function onSelectSource(item) {
        vm.isFirst = false;
        vm.channelArr = angular.copy(vm.channelInitArr);
        vm.currentSelectSource = {
            channelArr: []
        };
        item.channelArr = [];

        if(item.check &&　!item.disabled){
            vm.isFirst = true;
            vm.currentSelectSource = item;
        }
    }

    /**
     * 添加进target
     */
    function addToTarget() {
        vm.isSecond = false;
        vm.isFirst = false;
        console.log(vm.dataSource)
        var obj = {
            payMethodId: vm.currentSelectSource.payMethodId,
            channelArr: vm.currentSelectSource.channelArr
        };
        var isSetted = false;

        if (vm.currentSelectSource.channelArr && vm.currentSelectSource.channelArr.length>0) {

            obj.payMethodId = vm.currentSelectSource.payMethodId;

            obj.channelArr = vm.currentSelectSource.channelArr;


            _.each(vm.currentSelectSource.channelArr,function(item,index){
                item.id = item.value;
            });
        } else {
            alert('请先选择支付渠道');
            return;
        }

        _.each(vm.dataTarget, function(item){
            if(item.payMethodId == vm.currentSelectSource.payMethodId){
                isSetted = true;
                if(item.check){
                    item.channelArr = vm.currentSelectSource.channelArr;
                }
                else{
                    vm.channelArr = angular.copy(vm.channelInitArr);

                    // vm.currentSelectSource.channelArr = [];
                    alert('该条源已配置过');
                }

                return;
            }
        });

        if(!isSetted){
            _.each(vm.dataSource,function(item,index){
                if(item.payMethodId == vm.currentSelectSource.payMethodId){
                    item.disabled = true;
                }
            });

            vm.dataTarget.push(obj);
        }
    }

    function removeTarget(target) {
        if (_.indexOf(vm.dataTarget, target) > -1) {
            vm.dataTarget.splice(_.indexOf(vm.dataTarget, target), 1);
            // var sourceIndex = _.indexOf(vm.dataSource, target);
            _.each(vm.dataSource, function(item){
                if(item.payMethodId == target.payMethodId){
                    item.disabled = false;
                    item.check = false;
                    item.channelArr = [];
                }
            })
            // vm.dataSource[sourceIndex].disabled = false;
           /* vm.list.splice(target);*/
        }
        vm.channelArr = angular.copy(vm.channelInitArr);
        vm.currentSelectSource = {
            channelArr: []
        };
    }

    function onSelectTarget(selected) {
        _.each(vm.dataTarget, function(item){
            item.check = false;
            if(selected.payMethodId == item.payMethodId){

                item.check = true;
                modifyPayInit(selected);

                vm.currentSelectSource = item;
            }
        })
    }

    function addChannelItem(channel) {
        vm.isSecond = true;
        var itemIndex = -1;

        // _.each(vm.currentSelectSource.channelArr, function(item, index){
        //     if(item.value == channel.value){
        //         itemIndex = index;
        //     }

        // })
        // if(!vm.currentSelectSource.channelArr.length){
        //     vm.currentSelectSource.channelArr.push(channel);
        // }else{
        //     _.each(vm.currentSelectSource.channelArr, function(item, index){
        //         if(item.value == channel.value){
        //             itemIndex = index;
        //         }

        //     })
        // }

        if (vm.currentSelectSource){
            _.each(vm.currentSelectSource.channelArr, function(item, index){
                if(item.value == channel.value){
                    itemIndex = index;
                }

            })
            // var itemIndex = _.indexOf(vm.currentSelectSource.channelArr, channel);
            if (itemIndex === -1) {
                vm.currentSelectSource.channelArr.push(channel);
                vm.channelTip = null;
            } else {
                vm.currentSelectSource.channelArr.splice(itemIndex, 1);
            }
        }
        if (vm.currentSelectSource.channelArr && vm.currentSelectSource.channelArr.length===0) {
            vm.channelTip = '请选择支付渠道';
        }
    }

    function checkInTarget(channel) {
        var hasCheck = false;
        if (vm.currentSelectSource) {
            if (_.indexOf(vm.currentSelectSource.channelArr, channel) > -1) {
                hasCheck = true;
            } else {
                hasCheck = false;
            }
        }
        return hasCheck;
    }

    function addChannelSource() {

        if (vm.currentSelectSource.channelArr && vm.currentSelectSource.channelArr.length ===0) {
            vm.channelTip = '请选择支付渠道';
        }
    }

    function addToCheck(param) {
        if(param.checkbox == 'true'){
                param.checkbox ='false';
            }else{
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
            param.checkbox = 'true';
            // arr.push(param.bankId);
        } else {
            param.checkbox = 'false';
            // arr.splice(arr.indexOf(param.bankId),1);
        }*/
    }


    function checkInput(params,ngForm){
        ValidationService.validate(ngForm);
        if(ValidationService.isEmpty(params.transactionTypeName)){
            toastr.warning('请输入交易类型名称');
            return false;
        }else{
            if (ValidationService.containSpecial(params.transactionTypeName)) {
                toastr.warning('交易类型名称不能包含特殊字符');
                return false;
            }
        }

        if(ValidationService.isEmpty(params.transactionTypeCode)){
            toastr.warning('请输入交易类型编码');
            return false;
        }else{
            if(!ValidationService.isIntChar(params.transactionTypeCode)){
                toastr.warning('交易类型编码为字母或数字');
                return false;
            }
        }

        if(ValidationService.isEmpty(params.englishFlag)){
            toastr.warning('请输入英文标识');
            return false;
        }else{
            var reg = /^[a-zA-Z]+$/;
            if(!reg.test(params.englishFlag)) {
                toastr.warning('英文标识必须为字母');
                return false;
            }
        }

        if(params.payMethodList.length === 0){
            toastr.warning('请配置交易类型支持的支付方式');
            return false;
        }
        return true;
    }
};
