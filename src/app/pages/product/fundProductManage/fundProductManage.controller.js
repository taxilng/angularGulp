'use strict';

var fundProductModal = require('../fundProductModal');
var funddetailModal = require('../funddetailModal');
module.exports = function(fundProductService, ModalService, toastr, FundProductManageConstant, ValidationService, $ngBootbox, commonService, EventBusService) {
    var vm = this;
    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };
    vm.addmode = addmode;
    vm.editmode = editmode;
    vm.delmode = delmode;
    vm.searchInfo = searchInfo;
    vm.reset = reset;
    vm.doCtrlPagingAct = doCtrlPagingAct;
    vm.detailmode = detailmode;
    vm.model = {
        productTypeId: '',
        status: 'ALL',
        startAmount: '',
        brandName: ''
    };
    vm.gridOptions = FundProductManageConstant.investGridOptions;
    //grid
    vm.gridOptions.onRegisterApi = onRegisterApi;
    //初始化
    init();

    function init() {
        //form
        vm.form = FundProductManageConstant.investFormOptions;
        vm.schema = FundProductManageConstant.investSchema;
        //pannel
        vm.formPanelOptions = FundProductManageConstant.formPanelOptions;
        vm.gridPanelOptions = FundProductManageConstant.gridPanelOptions;

        search(vm.page);
    }

    function searchInfo() {
        vm.page.startIndex = 1;
        search(vm.page);
    }

    function addmode() {
        var params = {};
        ModalService.showModal({
            modalId: 'fundProductModal',
            template: fundProductModal.html,
            modalTitle: '新增基金产品信息',
            controller: ['params', 'toastr', 'ModalService', 'FundProductService', 'ValidationService', 'FundProductModalConstant', 'titleMapFilterFilter', 'FundManagerService', '$timeout', '$scope', 'SupplierService', 'CommonService', 'FundConstant', '$q',fundProductModal.controller],
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

    function editmode(params) {
        ModalService.showModal({
            modalId: 'fundProductModal',
            template: fundProductModal.html,
            modalTitle: '修改基金产品信息',
            controller: ['params', 'toastr', 'ModalService', 'FundProductService', 'ValidationService', 'FundProductModalConstant', 'titleMapFilterFilter', 'FundManagerService', '$timeout', '$scope', 'SupplierService', 'CommonService', 'FundConstant', '$q',fundProductModal.controller],
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


    function detailmode(params) {
        ModalService.showModal({
            modalId: 'funddetailModal',
            template: funddetailModal.html,
            modalTitle: '基金产品详情',
            controller: ['params', 'toastr', 'ModalService', 'FundProductService', 'ValidationService', 'FundProductModalConstant', 'titleMapFilterFilter', '$scope', 'SupplierService', 'FundConstant', 'FundManagerService',funddetailModal.controller],
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

    function delmode(params) {
        fundProductService.del(params).then(function(data) {
            toastr.success('删除成功');
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function search(param) {
        vm.model.primaryProductCategoryId = "FUND";
        var pageinfo = {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        };
        var newParam = angular.extend({}, vm.model, { 'pageInfo': pageinfo });
        if (!checkInput(newParam)) {
            return;
        }

        fundProductService.search(newParam).then(function(data) {
            console.log(data);
            if (!data.fundList || data.fundList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.fundList;
            }
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function reset() {
        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        vm.model = {
            primaryProductCategoryId: 'FUND',
            productTypeId: '',
            status: 'ALL',
            startAmount: '',
            brandName: ''
        };
        var clearArr = ['全部', '全部', '全部', '全部'];
        commonService.clearSelectText(clearArr);
        search(vm.page);
    }


    function ClearSelectText() {
        var selects = document.getElementsByTagName("select");
        for (var i = 0; i < selects.length; i++) {
            selects[i].previousElementSibling.children[0].children[0].innerText = '全部';
        }
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
                fundProductService.productOnSale(params).then(function(data) {
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
                fundProductService.productOffSale(params).then(function(data) {
                    toastr.success('成功')
                    search(vm.page);

                }).catch(function(error) {
                    toastr.error(error.message)
                });
            }, function() {});

        };
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
    }

    function checkInput(params) {
        if (params.brandName) {
            if (!ValidationService.validateChinese(params.brandName)) {
                toastr.warning('基金品牌必须是中文类型');
                return false;
            }
        }
        return true;
    }

};
