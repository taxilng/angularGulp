'use strict';
var bankinfoModal = require('../bankinfoModal');
var bankinfodetailModal = require('../bankinfodetailModal');

module.exports = function(bankinfoService, toastr, ModalService, BankInfoManageConstant, $ngBootbox, validationService, Upload, fileReader) {
    var vm = this;
    vm.model = {};
    vm.form = [];
    vm.schema = {};
    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };
    vm.detailbankmode = detailbankmode;
    vm.delbankmode = delbankmode;
    vm.editbankmode = editbankmode;
    vm.addbankmode = addbankmode;
    vm.doCtrlPagingAct = doCtrlPagingAct;
    vm.searchInfo = searchInfo;
    vm.reset = reset;
    vm.searchFunc = bankinfoService.searchBankInfo;
    vm.delBankInfo = bankinfoService.delBankInfo;
    vm.gridOptions = BankInfoManageConstant.investGridOptions;
    //grid
    vm.gridOptions.onRegisterApi = onRegisterApi;


    //页面银行信息初始化
    init();

    function init() {
        //初始化表单
        vm.form = BankInfoManageConstant.investFormOptions;
        vm.schema = BankInfoManageConstant.investSchema;
        //初始化panel
        vm.formPanelOptions = BankInfoManageConstant.formPanelOptions;
        vm.gridPanelOptions = BankInfoManageConstant.gridPanelOptions;
        search(vm.page);
    }

    function searchInfo() {
        vm.page.startIndex = 1;
        search(vm.page);
    }

    function reset() {
        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        vm.model = {};
        search(vm.page);
    }

    function checkInput(params) {
        if (params.bankName) {
            if (validationService.containSpecial(params.bankName)) {
                toastr.warning('银行信息不能包含特殊符号');
                return false;
            }
        }

        if (params.bankId) {
            if (!validationService.isInteger(params.bankId)) {
                toastr.warning('银行编号必须是数字');
                return false;
            }
        }
        return true;
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.editbankmode = function(row) {
            var item = row.entity;
            vm.editbankmode(item);
        };


        gridApi.grid.appScope.delbankmode = function(row) {
            $ngBootbox.confirm('确认删除该银行信息吗？').then(function() {
                var item = row.entity;
                vm.delbankmode(item);
            }, function() {});
        };


        gridApi.grid.appScope.detailbankmode = function(row) {
            var item = row.entity;
            vm.detailbankmode(item);
        };
    }

    function detailbankmode(params) {
        ModalService.showModal({
            modalId: 'bankinfodetailModal',
            template: bankinfodetailModal.html,
            modalTitle: '银行信息详情',
            controller: ['$scope', 'params','CardtypeConstant','titleMapFilterFilter',bankinfodetailModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        });
    }



    function addbankmode() {
        var params = {};
        ModalService.showModal({
            modalId: 'bankinfoModal',
            template: bankinfoModal.html,
            modalTitle: '新增银行信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'BankinfoService', 'BankInfoModalConstant', 'ValidationService', 'Upload', 'fileReader','CardtypeConstant','SupplierService','$q',bankinfoModal.controller],
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

    //搜索银行列表信息
    function search(param) {
        var params = angular.extend({}, vm.model, {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        });

        //输入校验
        if (!checkInput(params)) {
            return;
        }

        vm.searchFunc(params).then(function(data) {
            if (!data.bankInfoList || data.bankInfoList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = data.bankInfoList;
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            }
            vm.page.total = data.totalSize;
            vm.gridOptions.data = data.bankInfoList;
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }
    //修改银行信息
    function editbankmode(params) {
        ModalService.showModal({
            modalId: 'bankinfoModal',
            template: bankinfoModal.html,
            modalTitle: '编辑银行信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'BankinfoService', 'BankInfoModalConstant', 'ValidationService', 'Upload','fileReader','CardtypeConstant','SupplierService','$q',bankinfoModal.controller],
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
    //删除银行信息
    function delbankmode(params) {
        var newParams = angular.extend({}, vm.model, params);
        vm.delBankInfo(newParams).then(function(result) {
            toastr.success('删除银行信息成功');
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
