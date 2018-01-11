'use strict';

var userUpdate = require('../modalPages/userUpdate');
var userDetail = require('../modalPages/userDetail');
var userAllocationRole = require('../modalPages/userAllocationRole');

module.exports = function(TreeService, $rootScope, $scope, AuthorityManagementService, UserManagementConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, EventBusService, UserUpdateConstant, UserAllocationRoleConstant, CommonService, titleMapFilterFilter) {
    var vm = this;

    // 提交后端model模型
    vm.model = {
    };

    //------------------------变量声明开始------------------------------//
    // 分页参数
    vm.page = {
        startIndex: '1',
        pageSize: '5',
        total: ''
    };

    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//

    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//
    // 重置
    vm.resetAll = resetAll;
    // 分页函数
    vm.doCtrlPagingAct = doCtrlPagingAct;
    // 用户信息的分页查询
    vm.userPageSelectReqFun = userPageSelectReqFun;
    // 用户信息的分页查询函数
    vm.userPageSelectRequest = AuthorityManagementService.userPageSelectRequest;
    // 柜员新增
    vm.userAdd = userAdd;
    // 柜员删除函数
    vm.userDelete = AuthorityManagementService.userDelete;
    // 柜员修改
    vm.userUpdate = AuthorityManagementService.userUpdate;


    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {

        // 机构查询
        AuthorityManagementService.queryOrgData({
            orgSeriNo: $rootScope.orgSeriNo
        }).then(function(data) {
            if (data.orgInfoListJsonStr.indexOf("\\")) {
                // json串需要反转义
                var orgInfoListJsonStr = angular.fromJson(data.orgInfoListJsonStr.replace("\\", ""));
            } else {
                var orgInfoListJsonStr = data.orgInfoListJsonStr;
            }

            var param = {
                id: 'orgSeriNo', // 目录节点码
                title: 'orgName', // 目录节点码名称
                parentID: 'parentOrgId', // 目录父节点ID
                hasLeaf: 'orgLevel', // 是否有子节点: '1' 是  '0' 否
                shortName: 'shortName', // 机构简称
                orgLevel: 'orgLevel', // 机构级别:0总行  1分行 2一级支行 3二级支行
                status: 'status', // 机构状态:1正常  0冻结
                contacter: 'contacter', // 机构联系
                contacterMobile: 'contacterMobile', // 机构联系人手机号
                displayOrder: 'displayOrder', // 排列顺序
                orgDesc: 'orgDesc', // 机构描述
                orgId: 'orgId' // 机构主键
            };
            //权限树接口获取的数据字段转换为treenode需要的字段
            var nodes = TreeService.convertToTreeNodes(orgInfoListJsonStr, param);
            vm.nodeData = nodes;

            // 查询机构后,查询机构信息
            // userPageSelectReqFun({});
        });

        // 机构面板
        vm.panelOrgOptions = UserManagementConstant.panelOrgOptions;
        // 查询面板
        vm.formPanelOptions = UserManagementConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = UserManagementConstant.gridPanelOptions;
        // 表单头部
        vm.schema = UserManagementConstant.investSchema;
        // 表单输入
        vm.form = UserManagementConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(UserManagementConstant.investGridOptions);
    }

    // 重置
    function resetAll() {
        // 表单数据
        vm.model = {};

        // 清空下拉框
        var clearArr = ['全部'];
        CommonService.clearSelectText(clearArr);

        // 分页
        vm.page.total = "";
        // 表格
        vm.gridOptions.data = [];
        // 查询机构后,查询机构信息
        // userPageSelectReqFun({});
    }

    // 分页函数
    function doCtrlPagingAct(page, pageSize, total) {
        var pageParams = {
            startIndex: page + '',
            pageSize: pageSize + ''
        };

        if (page === 1) {
            vm.page.startIndex  = pageParams.startIndex;
            vm.page.pageSize = pageParams.pageSize;
        }

        // 用户信息的分页查询
        userPageSelect(pageParams);
    }

    /**
     * [description] 订阅organizationTree事件传播
     */
    EventBusService.subscribe('organizationTree', 'selected', function(event, value) {
        // 清空柜员编号和柜员名称
        vm.model.userName = '';
        vm.model.employeeId = '';

        vm.model.orgName = value.title;
        vm.model.orgId = value.orgId;

        // 查询机构下所有柜员
        userPageSelectReqFun({});

    });


    function userPageSelectReqFun(param) {
        var param = {
            orgId: vm.model.orgId,
            startIndex: '1',
            pageSize: vm.page.pageSize + ''
        };
        // 用户信息的分页查询
        userPageSelect(param);
    }

    // 用户信息的分页查询
    function userPageSelect(param) {
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        if(!params.orgName){
            toastr.warning('请选所属机构后,再查询');
            return false;
        }

        // 服务通讯
        vm.userPageSelectRequest(params).then(function(data) {
            if (!data.userListInfo || data.userListInfo.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = [];
                vm.page = {
                    'currentPage': "1",
                    'pageSize': "10",
                    'total': "0"
                };
                return;
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.userListInfo;
            }
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    // 柜员新增
    function userAdd() {
        var modalInstance = ModalService.showModal({
            modalId: 'userAdd',
            modalTitle: '柜员信息新增',
            template: userUpdate.html,
            controller: ['ModalService', '$scope', 'toastr', 'UserUpdateConstant', 'AuthorityManagementService', 'ValidationService', userUpdate.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static'
        });

        modalInstance.result.then(function() {
            //得到数据之后
            userPageSelectReqFun();
        }, function(error) {});
    }

    // 判断是否为同一机构
    function chickInOrg(row) {
        if ($scope.orgSeriNo != row.entity.orgSeriNo) {
            toastr.warning('柜员' + '[' + $scope.userName + ']' + '机构' + '[' + $scope.orgSeriNo + ']' + '与' + row.entity.userName + '机构' + '[' + row.entity.orgSeriNo + ']' + '不为同一机构,不允许操作');
            return false;
        }
        return true;
    }

    // grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 角色信息修改
        gridApi.grid.appScope.userUpdate = function(row) {
            // if (!chickInOrg(row)) {
            //     return;
            // }
            var modalInstance = ModalService.showModal({
                modalId: 'userUpdate',
                modalTitle: '柜员信息修改',
                template: userUpdate.html,
                controller: ['ModalService', '$scope', 'toastr', 'UserUpdateConstant', 'AuthorityManagementService', 'ValidationService', 'row', userUpdate.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    row: row
                }
            });

            modalInstance.result.then(function() {
                //得到数据之后
                userPageSelectReqFun();
            }, function(error) {});
        };

        // 冻结柜员
        gridApi.grid.appScope.userDelete = function(row, userDelete) {
            // 状态为正常显示冻结

            if (userDelete == 'userDelete') {
                if (row == '1' || row == '3') {
                    return true;
                } else {
                    return false;
                }
            }

            // if (!chickInOrg(row)) {
            //     return;
            // }

            // 1正常  0：冻结 2.登录 3签退
            $ngBootbox.confirm('确定冻结(' + row.entity.userName + ')柜员吗？').then(function() {
                var params = {
                        // 用户主键
                        userId: row.entity.id
                    }
                    // 服务通讯
                vm.userDelete(params).then(function(data) {
                    toastr.success('柜员冻结成功！');
                    // 柜员信息查询
                    userPageSelectReqFun({});
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };

        // 启用柜员
        gridApi.grid.appScope.userEnable = function(row, userEnable) {
            // 状态为冻结显示启用 1正常  0：冻结 2.登录 3签退

            if (userEnable == 'userEnable') {
                if (row == '0') {
                    return true;
                } else {
                    return false;
                }
            }

            // if (!chickInOrg(row)) {
            //     return;
            // }

            $ngBootbox.confirm('确定启用(' + row.entity.userName + ')柜员吗？').then(function() {
                var params = {
                        // 用户主键
                        userId: row.entity.id,
                        // 用户状态
                        userStatus: '3'
                    }
                    // 服务通讯
                vm.userUpdate(params).then(function(data) {
                    toastr.success('柜员启用成功！');
                    // 柜员信息查询
                    userPageSelectReqFun({});
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };

        // 签退柜员
        gridApi.grid.appScope.userlogout = function(row, userlogout) {
            // 状态为登录显示签退 1正常  0：冻结 2.登录 3签退
            if (userlogout == 'userlogout') {
                if (row == '2') {
                    return true;
                } else {
                    return false;
                }
            }

            // if (!chickInOrg(row)) {
            //     return;
            // }

            $ngBootbox.confirm('确定签退(' + row.entity.userName + ')柜员吗？').then(function() {
                var params = {
                        // 用户主键
                        userId: row.entity.id,
                        // 用户状态
                        userStatus: '1'
                    }
                    // 服务通讯
                vm.userUpdate(params).then(function(data) {
                    toastr.success('柜员签退成功！');
                    // 柜员信息查询
                    userPageSelectReqFun({});
                }).catch(function(err) {
                    toastr.error(err.message);
                });
            }, function() {});
        };

        // 详情
        gridApi.grid.appScope.userDetail = function(row) {
            ModalService.showModal({
                modalId: 'userDetail',
                modalTitle: '柜员信息详情',
                template: userDetail.html,
                controller: ['ModalService', '$scope', 'toastr', 'AuthorityManagementService', 'titleMapFilterFilter','row', userDetail.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    row: row
                }
            });
        };

        // 分配角色
        gridApi.grid.appScope.userAllocationRole = function(row) {
            ModalService.showModal({
                modalId: 'userAllocationRole',
                modalTitle: '柜员角色维护',
                template: userAllocationRole.html,
                controller: ['ModalService', '$scope', 'toastr', 'TreeService', 'AuthorityManagementService', 'UserAllocationRoleConstant', 'row', userAllocationRole.controller],
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    row: row
                }
            });
        };
    }

    vm.gridOptions.onRegisterApi = onRegisterApi;

};
