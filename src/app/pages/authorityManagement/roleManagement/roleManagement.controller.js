'use strict';

var roleUpdate = require('../modalPages/roleUpdate');
var distributionAuthority = require('../modalPages/distributionAuthority');

module.exports = function($rootScope, $scope, AuthorityManagementService, RoleManagementConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, RoleUpdateConstant, UserAllocationRoleConstant,ValidationService) {
    var vm = this;

    // 提交后端model模型
    vm.model = {};

    //------------------------变量声明开始------------------------------//
    vm.page = {
        startIndex: '1',
        pageSize: '5',
        total: ''
    };

    //------------------------变量声明结束------------------------------//
    // 角色信息的分页查询
    vm.rolePageSelectRequestFun = rolePageSelectRequestFun;
    // 角色信息的分页查询函数
    vm.rolePageSelectRequest = AuthorityManagementService.rolePageSelectRequest;
    // 重置方法
    vm.resetAll = resetAll;
    // 分页方法
    vm.doCtrlPagingAct = doCtrlPagingAct;
    // 角色新增
    vm.roleAdd = roleAdd;
    // 角色信息删除函数
    vm.roleDelete = AuthorityManagementService.roleDelete;
    // 角色启用
    vm.roleEnable = AuthorityManagementService.roleUpdate;

    //------------------------方法声明开始------------------------------//

    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = RoleManagementConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = RoleManagementConstant.gridPanelOptions;
        // 表单头部
        vm.schema = RoleManagementConstant.investSchema;
        // 表单输入
        vm.form = RoleManagementConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(RoleManagementConstant.investGridOptions);
        // 角色信息的分页查询
        rolePageSelectRequestFun({});
    }

    // 角色信息的分页查询 - 按钮查询
    function rolePageSelectRequestFun(param) {
        var param = {
            startIndex: '1',
            pageSize: vm.page.pageSize + ''
        };
        rolePageSelect(param);
    }

    // 角色信息的分页查询
    function rolePageSelect(param) {
        var model = vm.model;
        var params = angular.extend(param, vm.model);


        // 服务通讯
        vm.rolePageSelectRequest(params).then(function(data) {
            // 清空表格
            vm.gridOptions.data = [];
            if (!data.roleListInfo || data.roleListInfo.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': '1',
                    'pageSize': '10',
                    'total': '0'
                };
                return;
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.roleListInfo;
            }
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    // 重置方法
    function resetAll() {
        // 清空表单
        vm.model = {};
        // 角色信息的分页查询
        rolePageSelectRequestFun({});
    }

    //分页回掉函数
    function doCtrlPagingAct(page, pageSize, total) {
        var pageParams = {
            startIndex: page + '',
            pageSize: pageSize + ''
        };

        if (page === 1) {
            vm.page = pageParams;
        }

        // 角色信息的分页查询
        rolePageSelect(pageParams)
    };


    // 角色新增
    function roleAdd() {
        var modalInstance = ModalService.showModal({
            modalId: 'roleAdd',
            modalTitle: '角色新增',
            template: roleUpdate.html,
            controller: ['ModalService', '$scope', 'toastr', 'RoleUpdateConstant', 'AuthorityManagementService', 'ValidationService',roleUpdate.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
        });

        modalInstance.result.then(function() {
            //得到数据之后
            init();
        }, function(error) {});
    }

    // grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 分配权限
        gridApi.grid.appScope.distributionAuthority = function(row) {
            ModalService.showModal({
                modalId: 'distributionAuthority',
                modalTitle: '角色权限控制',
                template: distributionAuthority.html,
                controller: ['ModalService', '$scope', 'toastr', 'TreeService', 'AuthorityManagementService', 'row', distributionAuthority.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    row: row
                }
            });
        };


        // 角色信息修改
        gridApi.grid.appScope.roleUpdate = function(row) {
            var modalInstance = ModalService.showModal({
                modalId: 'roleUpdate',
                modalTitle: '角色信息修改',
                template: roleUpdate.html,
                controller: ['ModalService', '$scope', 'toastr', 'RoleUpdateConstant', 'AuthorityManagementService', 'ValidationService','row', roleUpdate.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    row: row
                }
            });

            modalInstance.result.then(function() {
                //得到数据之后
                rolePageSelectRequestFun({});
            }, function(error) {});
        };

        // 冻结角色
        gridApi.grid.appScope.roleDelete = function(row, roleDelete) {
            if (roleDelete == 'roleDelete') {
                if (row == "1") {
                    return true
                } else {
                    return false
                }
            }

            $ngBootbox.confirm('确定冻结' + row.entity.roleName + '角色吗？').then(function() {
                var params = {
                        roleId: row.entity.roleId
                    }
                    // 服务通讯
                vm.roleDelete(params).then(function(data) {
                    toastr.success('角色信息冻结成功！');
                    // 角色信息查询
                    rolePageSelectRequestFun({});
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };

        // 启用角色
        gridApi.grid.appScope.roleEnable = function(row, roleEnable) {
            if (roleEnable == 'roleEnable') {
                if (row == "0") {
                    return true
                } else {
                    return false
                }
            }

            $ngBootbox.confirm('确定启用' + row.entity.roleName + '角色吗？').then(function() {
                var params = {
                        roleId: row.entity.roleId,
                        status: '1'
                    }
                    // 服务通讯
                vm.roleEnable(params).then(function(data) {
                    toastr.success('角色信息启用成功！');
                    // 角色信息查询
                    rolePageSelectRequestFun({});
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;
};
