'use strict';

module.exports = function(ModalService, TreeService, node, toastr, $ngBootbox, AddOrgNodeConstant, AuthorityManagementService, ValidationService) {
    var vm = this;

    //------------------------变量声明开始------------------------------//
    // 提交后端model模型
    vm.model = {};

    //------------------------变量声明结束------------------------------//
    // 分页参数
    vm.page = {
        currentPage: '1',
        pageSize: '999',
        total: ''
    };

    //------------------------方法声明开始------------------------------//
   
    //初始化数据
    init();
    // 取消(关闭弹出框)
    vm.cancel = cancel;
    // 机构信息提交
    vm.submitOrgInfo = submitOrgInfo;
    // 新增机构函数
    vm.orgAdd = AuthorityManagementService.orgAdd;
    // 修改机构函数
    vm.orgUpdate = AuthorityManagementService.orgUpdate;

    //------------------------方法声明结束------------------------------//
    

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = AddOrgNodeConstant.formPanelOptions;
        // 表单头部
        vm.schema = AddOrgNodeConstant.investSchema;
        // 表单输入
        vm.form = AddOrgNodeConstant.investFormOptions;
        // 机构增加
        if(node.flag == 1){
            delete node.flag;
            vm.model = {
                orgLevel:'',
                status:''
            };
            // 上级机构编号
            if (node.title) {
                vm.model['parentPrgId'] = node.title;
                vm.model['orgLevel'] = (parseInt(node.orgLevel)+1)+'';
            } else {
                vm.model['parentPrgId'] = '';
                vm.model['orgLevel'] = '';
            }

            // 机构编号
            vm.form[0].items[1].items[0].readonly = false;
            // 机构级别
            vm.form[0].items[3].items[0].readonly = true;
        // 机构修改
        }else if(node.flag == 2){
            delete node.flag;

            //修改
            vm.model = {
                // 机构名称
                orgName: node.title || '',
                // 机构编号
                orgSeriNo: node.id || '',
                // 机构简称
                shortName: node.shortName || '',
                // 机构级别
                orgLevel: node.orgLevel || '',
                // 机构状态
                status: node.status || '',
                // 上级机构
                parentPrgId: node.parentOrgName || '',
                // 机构联系人
                contacter:node.contacter || '',
                // 机构联系人电话
                contacterMobile:node.contacterMobile || '',
                // 机构序号
                displayOrder:node.displayOrder || ''
            };

            // 机构编号
            vm.form[0].items[1].items[0].readonly = true;
            // 机构级别
            vm.form[0].items[3].items[0].readonly = true;
        }
    }


    // 输入校验
    function checkInput(params,ngForm){
        // 非空校验
        ValidationService.validate(ngForm);
        if (!params.orgName) {
            toastr.warning('请输入机构名称！');
            return false;
        }
        if (!params.orgSeriNo) {
            toastr.warning('请输机构编号！');
            return false;
        }
        if (!params.orgLevel) {
            toastr.warning('请选择机构级别！');
            return false;
        }
        if (!params.status) {
            toastr.warning('请选择机构状态！');
            return false;
        }
        if (!params.displayOrder) {
            toastr.warning('请输入机构序号！');
            return false;
        }
        return true;
    }

    // 机构信息提交
    function submitOrgInfo(param,ngForm){
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        // 输入校验
        if (!checkInput(params,ngForm)) {
            return
        }

        var modalId = ModalService.getLastModalId();
        switch (modalId) {
            case 'addOrgNode':
                // 上级机构
                params.parentOrgId = node.orgId;
                // 服务通讯
                vm.orgAdd(params).then(function(data) {
                    toastr.success('新增机构成功！');

                    ModalService.closeModal(modalId, '');
                }).catch(function(err) {
                    toastr.error(err.message);
                });
                break;
            case 'modifyOrgNode':
                // 机构主键
                params.orgId = node.orgId;
                // 服务通讯
                vm.orgUpdate(params).then(function(data) {
                    toastr.success('修改机构信息成功！');

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
