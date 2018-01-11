'use strict';
var _ = require('lodash');
var transactiontypeModal = require('../transactiontypeModal');
var trsanctiondetailModal = require('../trsanctiondetailModal');
module.exports = function(transactiontypeService, toastr, ModalService, TransactionTypeManageConstant, $ngBootbox, validationService) {
    var vm = this;
    vm.page = {};
    vm.model = {};
    vm.searchtransactiontype = transactiontypeService.search;
    vm.addtransactiontypemode = addtransactiontypemode;
    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };

    vm.edittransactiontypemode = edittransactiontypemode;
    vm.deltransactiontypemode = deltransactiontypemode;
    vm.delFunc = transactiontypeService.del;
    vm.doCtrlPagingAct = doCtrlPagingAct;
    vm.reset = reset;
    vm.searchInfo = searchInfo;
    vm.viewDetail = viewDetail;
    vm.gridOptions = TransactionTypeManageConstant.investGridOptions;
    vm.gridOptions.onRegisterApi = onRegisterApi;
    //初始化
    init();

    function init() {
        //form
        vm.form = TransactionTypeManageConstant.investFormOptions;
        vm.schema = TransactionTypeManageConstant.investSchema;
        //pannel
        vm.formPanelOptions = TransactionTypeManageConstant.formPanelOptions;
        vm.gridPanelOptions = TransactionTypeManageConstant.gridPanelOptions;
        search(vm.page);
    }

    function searchInfo() {
        vm.page.startIndex = 1;
        search(vm.page);
    }


    function checkInput(params) {
        if (params.transactionTypeName) {
            if (validationService.containSpecial(params.transactionTypeName)) {
                toastr.warning('交易类型名称不能包含特殊字符');
                return false;
            }
        }

        if (params.transactionTypeCode) {
            if(!validationService.isIntChar(params.transactionTypeCode)){
                toastr.warning('交易类型编码为字母或数字');
                return false;
            }
        }
        return true;
    }

    function edittransactiontypemode(params) {
        ModalService.showModal({
            modalId: 'transactiontypeModal',
            template: transactiontypeModal.html,
            modalTitle: '修改交易类型信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'transactiontypeService', 'CashierdeskService', 'BankinfoService', 'TransactionTypeModalConstant', 'ValidationService', transactiontypeModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).
        result.then(function(data) {
            init();
        });
    }


    function viewDetail(params) {
        ModalService.showModal({
            modalId: 'trsanctiondetailModal',
            template: trsanctiondetailModal.html,
            modalTitle: '查看交易类型详情',
            controller: ['params', 'toastr', 'ModalService', 'TransactionTypeModalConstant', 'BankinfoService', 'titleMapFilterFilter', 'CashierdeskService', trsanctiondetailModal.controller],
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


    function deltransactiontypemode(params) {
        $ngBootbox.confirm('确定要删除该条交易方式吗？').then(function() {
            vm.delFunc(params).then(function(result) {
                toastr.success('删除成功');
                init();
            });
        }, function() {})
    }


    function search(param) {
        var newParam = angular.extend({}, vm.model, {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        });

        //输入校验
        if (!checkInput(newParam)) {
            return;
        }


        vm.searchtransactiontype(newParam).then(function(data) {
            if (!data.transactionTypeList || data.transactionTypeList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = data.transactionTypeList;
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            }
            vm.page.total = data.totalSize;
            vm.gridOptions.data = data.transactionTypeList;
        });
    }

    //新增页面弹窗
    function addtransactiontypemode() {
        var params = {};
        ModalService.showModal({
            modalId: 'transactiontypeModal',
            template: transactiontypeModal.html,
            modalTitle: '新增交易类型信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'transactiontypeService', 'CashierdeskService', 'BankinfoService', 'TransactionTypeModalConstant', 'ValidationService', transactiontypeModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).
        result.then(function(data) {
            init();
        });
    }
    //查询条件置空
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

        gridApi.grid.appScope.edittransactiontypemode = function(row) {
            var item = row.entity;
            vm.edittransactiontypemode(item);
        };


        gridApi.grid.appScope.deltransactiontypemode = function(row) {
            var item = row.entity;
            vm.deltransactiontypemode(item);
        };


        gridApi.grid.appScope.detailtransactiontypemode = function(row) {
            var item = row.entity;
            vm.viewDetail(item);
        };
    }

    //分页
    function doCtrlPagingAct(page, pageSize, total) {
        var param = {
            'startIndex': page,
            'pageSize': pageSize
        };
        if (page === 1) {
            vm.page.startIndex  = param.startIndex;
            vm.page.pageSize = param.pageSize;
        }
        search(param);
    };

};
