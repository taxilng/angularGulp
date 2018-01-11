'use strict';
var organizationTree = require('../../../modalPages/organizationTreeModal');

module.exports = function(ModalService, $scope, toastr, UserUpdateConstant, AuthorityManagementService, ValidationService, row) {
    var vm = this;

    // 提交后端model模型
    vm.model = {
        userStatus:'1'
    };

    //------------------------变量声明结束------------------------------//
    

    //------------------------方法声明开始------------------------------//
   
    //初始化数据
    init();
    // 取消(关闭弹出框)
    vm.cancel = cancel;
    // 柜员信息提交
    vm.submitUserInfo = submitUserInfo;
    // 用户新增
    vm.userAdd = AuthorityManagementService.userAdd;
    // 用户修改
    vm.userUpdate = AuthorityManagementService.userUpdate;
    // 选择机构
    vm.selectOrg = selectOrg;

    //------------------------方法声明结束------------------------------//
    

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
    	var modalId = ModalService.getLastModalId();
    	
        // 查询面板
        vm.formPanelOptions = UserUpdateConstant.formPanelOptions;
        // 表单头部
        vm.schema = UserUpdateConstant.investSchema;
        // 表单输入
        vm.form = UserUpdateConstant.investFormOptions;

        // 柜员新增
        if(modalId == 'userAdd'){
            // 机构号
            vm.form[0].items[0].readonly = false;
            // 所属机构
            vm.form[1].items[0].readonly = true;
            vm.form[1].items[0].fieldButtonRight = true;
            // 状态
            vm.form[3].items[1].readonly = true;
        // 柜员修改
        }else if(modalId == 'userUpdate'){
            vm.model = {
                // 柜员编号
                employeeId: row.entity.employeeId || '',
                // 柜员名称
                userName: row.entity.userName || '',
                // 所属机构
                orgName: row.entity.orgName || '',
                // 手机号
                mobile: row.entity.mobile || '',
                // 地址
                address: row.entity.address || '',
                // 邮箱
                email: row.entity.email || '',
                // 登录密码
                password: row.entity.password || '',
                // 状态
                userStatus: row.entity.userStatus || ''

            };

            // 机构号
            vm.form[0].items[0].readonly = true;
            // 所属机构
            vm.form[1].items[0].readonly = true;
            vm.form[1].items[0].fieldButtonRight = false;
            // 状态
            vm.form[3].items[1].readonly = true;
        }

        
    }

    // 取消(关闭弹出框)
    function cancel() {
        var name = ModalService.getLastModalId();
        ModalService.dismissModal(name, '');
    }

    function selectOrg(){
        var row = {
            mutiple: false
        };
        //弹出机构树
        var modalInstance = ModalService.showModal({
            modalId: 'organizationTreeModal',
            modalTitle: '机构树',
            template: organizationTree.html,
            controller: ['EventBusService', 'ModalService','row',organizationTree.controller],
            controllerAs: 'vm',
            size: 'md',
            backdrop: 'static',
            resolve: {
                row: row
            }
        });
        modalInstance.result.then(function(nodeData) {
            vm.model.orgName = nodeData.title;
            vm.model.orgId = nodeData.orgId;
        }, function() {});
    }

    // 输入校验
    function checkInput(params,ngForm){
        // 非空校验
        ValidationService.validate(ngForm);

        if (!params.employeeId) {
            toastr.warning('请输入柜员编号！');
            return false;
        }

        if (!params.userName) {
            toastr.warning('请输入柜员名称！');
            return false;
        }

        if (!params.orgName) {
            toastr.warning('请选择所属机构！');
            return false;
        }

        if(ValidationService.isEmpty(params.mobile)){
            toastr.warning('请输入手机号码！');
            return false;
        }

        if(!ValidationService.validatePhoneNumber(params.mobile)){
            toastr.warning('手机号码格式不正确！');
            return false;
        }

        if(ValidationService.isEmpty(params.email)){
            toastr.warning('请输入邮箱！');
            return false;
        }

        if(!ValidationService.validateEmail(params.email)){
            toastr.warning('邮箱格式不正确！');
            return false;
        }

        var modalId = ModalService.getLastModalId();

        if(modalId == 'userAdd'){
            if (!params.password) {
                toastr.warning('请输入登录密码！');
                return false;
            }
        }

        if(params.password && params.password.length <6) {
            toastr.warning('登录密码长度不足6位！');
            return false;
        }

        if (!params.userStatus) {
            toastr.warning('请选中状态！');
            return false;
        }
        return true;
    }

    // 柜员信息提交
    function submitUserInfo(param,ngForm){
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        if(!checkInput(params,ngForm)){
            return;
        }

        var modalId = ModalService.getLastModalId();
        switch (modalId) {
            case 'userAdd':
                params.orgId = vm.model.orgId;
                // 服务通讯
                vm.userAdd(params).then(function(data) {
                    toastr.success('新增柜员信息成功！');
                    ModalService.closeModal(modalId, '');
                }).catch(function(err) {
                    toastr.error(err.message);
                });
               
                break;
            case 'userUpdate':
                params.userId = row.entity.id;
                // 服务通讯
                vm.userUpdate(params).then(function(data) {
                    toastr.success('柜员息成修改功！');
                    ModalService.closeModal(modalId, '');
                }).catch(function(err) {
                    toastr.error(err.message);
                });
                break;
            default:
                break;
        }
    }
};
