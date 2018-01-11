'use strict';
var supplierModal = require('../modalPages/supplierModal');
var supplierdetailModal = require('../modalPages/supplierdetailModal');
module.exports = function(supplierManagementConstant, supplierService, timeFormatFilterFilter, $ngBootbox, validationService, toastr, ModalService, CommonService) {
    var vm = this;
    vm.init = init;
    vm.model = {
        supplyType: '',
        cooperationStatus: '',
        cooperateDate: new Date()
    };
    vm.pageSize = '5';
    vm.currentPage = '1';
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };

    vm.searchInfo = searchInfo;
    //重置
    vm.resetAll = resetAll;
    //供应商信息查询方法
    vm.querySupplierInfo = querySupplierInfo;
    //分页
    vm.doCtrlPagingAct = doCtrlPagingAct;
    //默认查询
    vm.addSupplierInfo = addSupplierInfo;

    //
    vm.editSupplierInfo = editSupplierInfo;
    init();

    function init() {
        vm.formPanelOptions = supplierManagementConstant.formPanelOptions;

        vm.gridPanelOptions = supplierManagementConstant.gridPanelOptions;

        vm.form = supplierManagementConstant.investFormOptions;

        vm.schema = supplierManagementConstant.investSchema;

        vm.gridOptions = supplierManagementConstant.investGridOptions;

        vm.querySupplierInfo(vm.page);

    }

    function resetAll() {
        vm.model = {};

        // 清空下拉框
        var clearArr = ['--请选择--', '--请选择--'];
        CommonService.clearSelectText(clearArr);

        vm.querySupplierInfo(vm.page);
    }

    function checkInput(params) {
        // if (params.supplierName) {
        //     if (!validationService.validateChinese(params.supplierName)) {
        //         toastr.warning('供应商名称必须是中文');
        //         return false;
        //     }
        // }


        // if (params.licenseCode) {
        //     if (!validationService.isInteger(params.licenseCode)) {
        //         toastr.warning('营业执照代码必须是数字');
        //         return false;
        //     }
        // }
        return true;
    }

    function searchInfo(param) {
        vm.page.startIndex = '1';

        vm.querySupplierInfo(vm.page);
    }

    function querySupplierInfo(param) {
        var pageInfo = {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        };

        var params = angular.extend({}, vm.model, pageInfo);

        //输入校验
        if (!checkInput(params)) {
            return;
        }


        //服务通讯
        supplierService.querySupplierInfo(params).then(function(data) {
            if (!data.SupplyDetailList || data.SupplyDetailList.length === 0) {
                $ngBootbox.alert('未查找到相关数据');
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            }
            vm.page.total = data.totalSize;
            vm.gridOptions.data = data.SupplyDetailList;
        }).catch(function(error) {
            toastr.error(error.message);
        })
    }


    function addSupplierInfo() {
        var params = {};
        ModalService.showModal({
            modalId: 'supplierModal',
            template: supplierModal.html,
            modalTitle: '新增供应商信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'SupplierService', 'SupplierModalConstant', 'timeFormatFilterFilter', 'CONFIG','ValidationService','SupplyTypeMapConstant','CooperationStatusConstant','Upload','fileReader','RegularExpressionConstant',supplierModal.controller],
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


    //分页
    function doCtrlPagingAct(page, pageSize, total) {
        var param = {
            'startIndex': page,
            'pageSize': pageSize
        };
        if (page === 1) {
            vm.page = param;
        }
        vm.querySupplierInfo(param);
    };

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;
        gridApi.grid.appScope.editSupplierInfo = function(row) {
            var item = row.entity;
            vm.editSupplierInfo(item);
        };

        gridApi.grid.appScope.supplyInfoEffect = function(row) {
            supplyInfoEffect(row.entity);
        };

        gridApi.grid.appScope.detailSupplierInfo = function(row) {
            var params = row.entity;
            ModalService.showModal({
                modalId: 'supplierdetailModal',
                template: supplierdetailModal.html,
                modalTitle: '供应商信息详情',
                controller: ['$scope', 'params', 'toastr', 'ModalService', 'SupplierService', 'SupplierModalConstant', 'timeFormatFilterFilter', 'CONFIG','SupplyTypeMapConstant','titleMapFilterFilter','CooperationStatusConstant',supplierdetailModal.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    params: params
                }
            }).
            result.then(function(data) {});
        }
    }

    function supplyInfoEffect(entity){
        var statusTip = entity.cooperationStatus == '0' ? '合作' : '解除合作关系';
        var cooperationStatus = entity.cooperationStatus == '0' ? '1' : '0';

        $ngBootbox.confirm('确定要与' + entity.supplyName + statusTip + '吗？').then(function() {
            var params = {
                supplyId: entity.supplyId,
                cooperationStatus: cooperationStatus
            };
            // 服务通讯
            supplierService.supplyInfoEffectStatus(params).then(function(data) {
                toastr.success(statusTip + '成功')
                searchInfo();

            }).catch(function(error) {
                toastr.error(error.message)
            });
        }, function() {});
    }

    function editSupplierInfo(params) {
        ModalService.showModal({
            modalId: 'supplierModal',
            template: supplierModal.html,
            modalTitle: '编辑供应商信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'SupplierService', 'SupplierModalConstant', 'timeFormatFilterFilter', 'CONFIG', 'ValidationService','SupplyTypeMapConstant','CooperationStatusConstant','Upload','fileReader','RegularExpressionConstant',supplierModal.controller],
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

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
// supplyInfoEffectStatus
