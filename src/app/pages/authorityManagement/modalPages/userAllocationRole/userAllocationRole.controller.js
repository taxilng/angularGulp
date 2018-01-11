'use strict';

module.exports = function(ModalService, $scope, toastr, TreeService, AuthorityManagementService, UserAllocationRoleConstant,row) {
    var vm = this;

    // 提交后端model模型
    vm.model = {};

    //------------------------变量声明开始------------------------------//
    // 单选表格
    vm.selectRow = '';
    // 分页参数
    vm.page = {
        currentPage: '1',
        pageSize: '999',
        total: ''
    };

    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
   
    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//
    // 重置
    vm.resetAll = resetAll;
    // 取消(关闭弹出框)
    vm.cancel = cancel;
    // 分页函数
    vm.doCtrlPagingAct = doCtrlPagingAct;
    // 用户绑定角色查询
    vm.userBindRoleSelectReqFun = userBindRoleSelectReqFun;
    // 用户绑定角色
    vm.userBindRole = userBindRole;
    // 用户绑定角色函数
    vm.userBindRoleRequest = AuthorityManagementService.userBindRole;

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = UserAllocationRoleConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = UserAllocationRoleConstant.gridPanelOptions;
        // 表单头部
        vm.schema = UserAllocationRoleConstant.investSchema;
        // 表单输入
        vm.form = UserAllocationRoleConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(UserAllocationRoleConstant.investGridOptions);

        vm.model = {
            userName:row.entity.userName,
            employeeId:row.entity.employeeId
        };

        // 用户绑定角色查询
        userBindRoleSelectReqFun({});
    }

    // 用户绑定角色查询-按钮
    function userBindRoleSelectReqFun(){
        var param = {
            startIndex: vm.page.currentPage + '',
            pageSize: vm.page.pageSize + ''
        };

        // 用户信息的分页查询
        userBindRoleSelect(param);
    }

    // 用户绑定角色查询
    function userBindRoleSelect(param){
        var params = angular.extend(param, vm.model);
        params.userId = row.entity.id
        // 服务通讯
        AuthorityManagementService.userBindRoleSelect(params).then(function(data) {
            vm.page.total = data.totalSize;
            vm.gridOptions.data = data.roleListInfo;
        });
    }

    // grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;
        gridApi.grid.appScope.rowSelected = function(row) {
            vm.selectRow = row;
            console.log(row);
        };

    }
    vm.gridOptions.onRegisterApi = onRegisterApi;

    // 重置
    function resetAll(){
        // 表单
        vm.model.roleCode = '';
        // 单选表格
        vm.selectRow = '';
        // 表格
        vm.gridOptions.data = [];

        // 用户绑定角色查询
        userBindRoleSelectReqFun({});
    }

    // 分页函数
    function doCtrlPagingAct(page, pageSize, total){
        var pageParams = {
            startIndex: page + '',
            pageSize: pageSize + ''
        };

        if (page === 1) {
            vm.page = pageParams;
        }

        // 用户绑定角色查询
        userBindRoleSelect(pageParams);
    }

    // 用户绑定角色
    function userBindRole(selectRow){
        if(selectRow) {
            var params = {
                userId:row.entity.id,
                roleId:selectRow.entity.roleId
            };
            vm.userBindRoleRequest(params).then(function(data) {
                toastr.success('角色分配成功！');
                userBindRoleSelectReqFun({});
            }).catch(function(err) {
                toastr.error(err.message);
            });
        }else{
            toastr.warning('请先选择一条需要分配的角色信息!');
        }
    }

    // 取消(关闭弹出框)
    function cancel() {
        var name = ModalService.getLastModalId();
        ModalService.closeModal(name, '');
    }

};
