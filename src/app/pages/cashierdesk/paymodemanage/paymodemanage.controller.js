'use strict';
var cashierdeskModal = require('../cashierdeskModal');
//var detailModal = require('../../modalPages/detailModal');
var comboAddModal = require('../../modalPages/comboAddModal');
var paymodedetailModal = require('../paymodedetailModal');
''
module.exports = function(cashierdeskService, toastr, ModalService, paymodemanageConstant, $scope, $ngBootbox, validationService, timeFormatFilterFilter, commonService) {
    var vm = this;
    // 提交后端model模型
    vm.createDate = window.moment().add(-3, 'M')['_d'];
    vm.model = {
        methodLabel: '',
        createDate: vm.createDate,
        endDate: new Date()
    };
    vm.searchInfo = searchInfo;
    vm.searchFunc = cashierdeskService.searchPaymodes;
    vm.editPaymode = editPaymode;
    vm.addPaymode = addPaymode;
    vm.detailPaymode = detailPaymode;
    vm.deletePaymode = deletePaymode;
    vm.formPanelOptions = paymodemanageConstant.formPanelOptions;
    vm.gridPanelOptions = paymodemanageConstant.gridPanelOptions;
    vm.schema = paymodemanageConstant.investSchema;
    vm.form = paymodemanageConstant.investFormOptions;
    vm.gridOptions = paymodemanageConstant.investGridOptions;
    vm.doCtrlPagingAct = doCtrlPagingAct;
    vm.clear = clear;

    vm.pageSize = 10;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };

    init();

    function init() {
        $scope.select2Options = {
            allowClear: true
        };

        vm.checkAll = false;

        vm.options = [
            // '选择',
            '支付方式名称',
            '分类标签',
            '创建人',
            '创建时间',
            '描述',
            '操作'
        ];
        search(vm.page);
    }


    function searchInfo() {
        vm.page.startIndex = 1;
        search(vm.page);
    }


    function clear() {
        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        vm.model = {
            createDate: vm.createDate,
            endDate: new Date(),
            methodLabel: ''
        };
        var clearArr = ['全部'];
        commonService.clearSelectText(clearArr);
        search(vm.page);
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



    function checkInput(params) {
        if (params.payMethodName) {
            if (validationService.containSpecial(params.payMethodName)) {
                toastr.warning('支付方式不能包含特殊字符');
                return false;
            }
        }

        if (params.createDate && params.endDate) {
            if (!validationService.compareTwoDate(params.createDate, params.endDate, '起始日期', '截止日期')) {
                return false;
            }
        }
        return true;
    }

    /**
     * 带参数搜索
     * @param  {[type]} param [description]
     * @return {[type]}       [description]
     */
    function search(param) {
        var params = angular.extend({}, vm.model, {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        });

        //输入校验
        if (!checkInput(params)) {
            return;
        }
        //时间转换
        if (params.createDate) {
            params.createDate = timeFormatFilterFilter(params.createDate, 'YYYYMMDD');
        }

        if (params.endDate) {
            params.endDate = timeFormatFilterFilter(params.endDate, 'YYYYMMDD');
        }

        vm.searchFunc(params).then(function(data) {
            // if (data[vm.dataKey] && data[vm.dataKey].length === 0) {
            //     vm.gridOptions.data = [];
            //     $ngBootbox.alert('未查到相关数据');
            //
            //     return;
            // }
            //
            // vm.page['total'] = data.totalCount;

            // vm.gridOptions.data = data[vm.dataKey];
            if (!data.payMethodList || data.payMethodList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = data.payMethodList;
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            }
            // vm.page.total = data.totalCount;
            // pageSize:每页的数目 startIndex:当前页数 totalSize:总条数
            vm.page.total = data.totalSize;
            // vm.page.pageSize = params.countNum;
            // vm.page.currentPage = params.pageNum;
            vm.gridOptions.data = data.payMethodList;
        });
    }

    /**
     * 修改支付方式
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    function editPaymode(params) {
        /* if (!params.checkbox) {
             toastr.warning('请先选择一条支付方式');
             return;
         }*/
        ModalService.showModal({
            modalId: 'cashierdeskModal',
            template: cashierdeskModal.html,
            modalTitle: '支付方式修改',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'CashierdeskService', '$timeout', 'ValidationService','$q', cashierdeskModal.controller],
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

    function detailPaymode(params) {
        ModalService.showModal({
            modalId: 'paymodedetailModal',
            template: paymodedetailModal.html,
            modalTitle: '支付方式详情',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'CashierdeskService', '$timeout', '$filter', 'titleMapFilterFilter', paymodedetailModal.controller],
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
    /**
     * 新增支付方式
     */
    function addPaymode() {
        var params = {};
        ModalService.showModal({
            modalId: 'cashierdeskModal',
            template: cashierdeskModal.html,
            modalTitle: '新增支付方式',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'CashierdeskService', '$timeout', 'ValidationService','$q', cashierdeskModal.controller],
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


    function deletePaymode(params) {
        $ngBootbox.confirm('确定删除该条支付方式吗?').then(function() {
            var newParams = angular.extend({}, vm.model, params);
            cashierdeskService.delPaymode(newParams).then(function(data) {
                toastr.success('删除支付方式成功');
                init();
            }).catch(function(err) {
                toastr.error(err.message);
            });
        }, function() {});
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

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.editPaymode = function(row) {
            var item = row.entity;
            vm.editPaymode(item);
        };

        gridApi.grid.appScope.deletePaymode = function(row) {
            var item = row.entity;
            vm.deletePaymode(item);
        };

        gridApi.grid.appScope.detailPaymode = function(row) {
            var item = row.entity;
            vm.detailPaymode(item);
        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
