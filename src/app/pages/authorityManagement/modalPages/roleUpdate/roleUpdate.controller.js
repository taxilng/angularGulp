'use strict';

module.exports = function(ModalService, $scope, toastr, RoleUpdateConstant, AuthorityManagementService,ValidationService,row) {
    var vm = this;

    // 提交后端model模型
    vm.model = {
        status:'1',
        channelNo:''
    };

    //------------------------变量声明结束------------------------------//
    

    //------------------------方法声明开始------------------------------//
   
    //初始化数据
    init();
    // 取消(关闭弹出框)
    vm.cancel = cancel;
    // 权限信息提交
    vm.submitRoleInfo = submitRoleInfo;
    // 权限信息新增函数
    vm.roleAdd = AuthorityManagementService.roleAdd;
    // 权限信息修改函数
    vm.roleUpdate = AuthorityManagementService.roleUpdate;

    //------------------------方法声明结束------------------------------//
    

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
    	var modalId = ModalService.getLastModalId();
    	
        // 查询面板
        vm.formPanelOptions = RoleUpdateConstant.formPanelOptions;
        // 表单头部
        vm.schema = RoleUpdateConstant.investSchema;
        // 表单输入
        vm.form = RoleUpdateConstant.investFormOptions;

        // 角色新增
        if(modalId == 'roleAdd'){
            // 角色编号
            vm.form[0].items[1].items[0].readonly = false;
            // 渠道
            vm.form[0].items[2].items[0].readonly = false;
            // 状态
            vm.form[0].items[3].items[0].readonly = true;
            
        // 角色修改
        }else if(modalId == 'roleUpdate'){
            vm.model = {
                // 角色名称
                roleName: row.entity.roleName || '',
                // 角色编号
                roleCode: row.entity.roleCode || '',
                // 角色描述
                roleDesc: row.entity.roleDesc || '',
                // 角色所属渠道
                channelNo: row.entity.channelNo || '',
                // 角色状态
                status: row.entity.status || ''
            };
            // 角色编号
            vm.form[0].items[1].items[0].readonly = true;
            // 渠道
            vm.form[0].items[2].items[0].readonly = true;
            // 状态
            vm.form[0].items[3].items[0].readonly = true;
        }
       
    }

    // 输入校验
    function checkInput(params,ngForm){
        // 非空校验
        ValidationService.validate(ngForm);

        if (!params.roleName) {
            toastr.warning('请输入角色名称！');
            return false;
        }

        if (!params.roleCode) {
            toastr.warning('请输入角色编号！');
            return false;
        }

        if (!params.channelNo) {
            toastr.warning('请选择所属渠道！');
            return false;
        }
        
        return true;
    }

    // 权限信息提交
    function submitRoleInfo(param,ngForm){
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        var modalId = ModalService.getLastModalId();
        switch (modalId) {
            case 'roleAdd':
                if(!checkInput(params,ngForm)){
                    return;
                }
                // 服务通讯
                vm.roleAdd(params).then(function(data) {
                    toastr.success('新增角色信息成功！');
                    ModalService.closeModal(modalId, '');
                }).catch(function(err) {
                    toastr.error(err.message);
                });
                break;
            case 'roleUpdate':
                if(!checkInput(params,ngForm)){
                    return;
                }
                // 服务通讯
                params.roleId = row.entity.roleId;
                vm.roleUpdate(params).then(function(data) {
                    toastr.success('角色息成修改功！');
                    ModalService.closeModal(modalId, '');
                }).catch(function(err) {
                    toastr.error(err.message);
                });
                break;
            default:
                break;
        }
    }


    // 取消(关闭弹出框)
    function cancel() {
        var name = ModalService.getLastModalId();
        ModalService.dismissModal(name, '');
    }
};
