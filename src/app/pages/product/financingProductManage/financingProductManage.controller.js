'use strict';

var financingProductModal = require('../financingProductModal');
var financingDetailModal = require('../financingdetailModal');
module.exports = function(financingProductService, ModalService, toastr, FinanacingProductManageConstant, ValidationService, $ngBootbox, CommonService) {
    var vm = this;
    vm.searchFunc = financingProductService.search;
    vm.delmode = delmode; //删除
    vm.addmode = addmode; //新增
    vm.editmode = editmode; //编辑
    vm.detailmode = detailmode;
    vm.model = {
        status: 'ALL'
    };
    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };
    vm.searchInfo = searchInfo;
    vm.reset = reset;
    vm.doCtrlPagingAct = doCtrlPagingAct;

    vm.gridOptions = FinanacingProductManageConstant.investGridOptions;
    //grid
    vm.gridOptions.onRegisterApi = onRegisterApi;
    //数据初始化
    init();

    function init() {
        //form
        vm.form = FinanacingProductManageConstant.investFormOptions;
        vm.schema = FinanacingProductManageConstant.investSchema;
        //pannel
        vm.formPanelOptions = FinanacingProductManageConstant.formPanelOptions;
        vm.gridPanelOptions = FinanacingProductManageConstant.gridPanelOptions;
        search(vm.page);
    }

    function searchInfo() {
        vm.page.startIndex = 1;
        search(vm.page);
    }

    //新增
    function addmode() {
        var params = {};
        ModalService.showModal({
            modalId: 'financingProductModal',
            template: financingProductModal.html,
            modalTitle: '新增理财产品信息',
            controller: ['params', 'toastr', 'ModalService', 'FinancingProductService', 'titleMapFilterFilter',
                'SupplierService', 'ValidationService', '$scope',financingProductModal.controller
            ],
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
    //修改
    function editmode(params) {
        ModalService.showModal({
            modalId: 'financingProductModal',
            template: financingProductModal.html,
            modalTitle: '修改理财产品信息',
            controller: ['params', 'toastr', 'ModalService', 'FinancingProductService', 'titleMapFilterFilter',
                'SupplierService', 'ValidationService', '$scope', financingProductModal.controller
            ],
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
    //删除
    function delmode(params) {
        financingProductService.del(params).then(function(data) {
            toastr.success('删除成功');
        }).catch(function(data) {
            toastr.error(data.returnMsg);
        });
    }

    function detailmode(params) {
        ModalService.showModal({
            modalId: 'financingDetailModal',
            template: financingDetailModal.html,
            modalTitle: '理财产品信息详情',
            controller: ['params', 'toastr', 'ModalService', 'FinancingProductService', 'titleMapFilterFilter', 'SupplierService', financingDetailModal.controller],
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
    //查询
    function search(param) {
        vm.model.primaryProductCategoryId = "FINANCING";
        var pageinfo = {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        };
        var newParam = angular.extend({}, vm.model, { 'pageInfo': pageinfo });
        if (!checkInput(newParam)) {
            return;
        }
        vm.searchFunc(newParam).then(function(data) {
            console.log(data);
            if (!data.FinancingProductList || data.FinancingProductList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = data.FinancingProductList;
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.FinancingProductList;
            }

        }).catch(function(data) {
            toastr.error('没有数据');
        });
    }


    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.editmode = function(row) {
            var item = row.entity;
            vm.editmode(item);
        };


        gridApi.grid.appScope.delmode = function(row) {
            var item = row.entity;
            vm.delmode(item);
        };


        gridApi.grid.appScope.detailmode = function(row) {
            var item = row.entity;
            vm.detailmode(item);
        };

        //上架
        gridApi.grid.appScope.productOnSale = function(row, status) {
            if (status == 'productOnSale') {
                if (row.entity.status == 'OFF_SALE') {
                    return true;
                } else {
                    return false;
                }
            }

            $ngBootbox.confirm('确定上架' + row.entity.productName + '吗？').then(function() {
                var params = {
                    productId: row.entity.productId,
                    userName: 'admin'
                };
                // 服务通讯
                financingProductService.productOnSale(params).then(function(data) {
                    toastr.success('成功')
                    search(vm.page);

                }).catch(function(error) {
                    toastr.error(error.message)
                });
            }, function() {});

        };

        //下架
        gridApi.grid.appScope.productOffSale = function(row, status) {
            if (status == 'productOffSale') {
                if (row.entity.status == 'ON_SALE') {
                    return true;
                } else {
                    return false;
                }
            }

            $ngBootbox.confirm('确定下架' + row.entity.productName + '吗？').then(function() {
                var params = {
                    productId: row.entity.productId,
                    userName: 'admin'
                };
                // 服务通讯
                financingProductService.productOffSale(params).then(function(data) {
                    toastr.success('成功')
                    search(vm.page);

                }).catch(function(error) {
                    toastr.error(error.message)
                });
            }, function() {});

        };

    }


    function reset() {
        vm.model = {
            primaryProductCategoryId: 'FINANCING',
            status: 'ALL'
        };

        // 清空下拉框
        var clearArr = ['全部'];
        CommonService.clearSelectText(clearArr);

        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        search(vm.page);
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

    function checkInput(params) {
        if (params.productId) {
            if (!ValidationService.isInteger(params.productId)) {
                toastr.warning('产品编号必须是数字类型');
                return false;
            }
        }
        if (params.productName) {
            if (ValidationService.containSpecial(params.productName)) {
                toastr.warning('产品名称不能包含特殊符号');
                return false;
            }
        }
        return true;
    }

};
