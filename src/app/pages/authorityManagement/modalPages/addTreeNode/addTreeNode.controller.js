'use strict';

module.exports = function(ModalService, TreeService, node, toastr, $ngBootbox, AddTreeNodeConstant, AuthorityManagementService,MenuTreeService,ValidationService) {
    var vm = this;
    //------------------------变量声明开始------------------------------//
    // 提交后端model模型
    vm.model = {};
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
    // 取消(关闭弹出框)
    vm.cancel = cancel;
    // 菜单提交
    vm.menuSubmitInfo = menuSubmitInfo;
    // 菜单增加
    vm.menuSubmitInfoAdd = AuthorityManagementService.menuAdd;
    // 菜单修改
    vm.menuSubmitInfoUpdate = AuthorityManagementService.menuUpdate;

    //------------------------方法声明结束------------------------------//


    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 查询面板
        vm.formPanelOptions = AddTreeNodeConstant.formPanelOptions;
        // 表单头部
        vm.schema = AddTreeNodeConstant.investSchema;
        // 表单输入
        vm.form = AddTreeNodeConstant.investFormOptions;
        // 菜单增加
        if(node.flag == 1){
            delete node.flag;
            vm.model = {
                menuStatus: '',
                channelNo: ''
            };
            // 上级菜单名称
            if (node.title) {
                vm.model['menuParentName'] = node.title;
                vm.model['menuLevel'] = (parseInt(node.prodMenuLevel)+1)+'';
            } else {
                vm.model['menuParentName'] = '';
                vm.model['menuLevel'] = '';
            }

            // 菜单编号
            vm.form[0].items[1].items[0].readonly = false;
            // 菜单级别
            vm.form[0].items[3].items[0].readonly = true;
        // 菜单修改
        }else if(node.flag == 2){
            delete node.flag;
            //修改
            vm.model = {
                // 菜单名称
                menuName: node.title || '',
                // 菜单编号
                menuSeriNo: node.id || '',
                // 菜单URL
                menuUrl: node.prodMenuUrl || '',
                // 菜单层级
                menuLevel: node.prodMenuLevel || '',
                // 菜单描述
                menuDesc: node.menuDesc || '',
                // 菜单状态
                menuStatus: node.menuStatus || '',
                // 所属系统
                channelNo: node.prodMenuChannelNo || '',
                // 上级菜单名称
                menuParentName: node.menuParenName || '',
                // 菜单序号
                displayOrder: node.displayOrder || ''
            };

            // 菜单编号
            vm.form[0].items[1].items[0].readonly = true;
            // 菜单级别
            vm.form[0].items[3].items[0].readonly = true;

        }
    }

    // 输入校验
    function checkInput(params,ngForm){
        // 非空校验
        ValidationService.validate(ngForm);

        if (!params.menuName) {
            toastr.warning('请输入菜单名称！');
            return false;
        }
        if (!params.menuSeriNo) {
            toastr.warning('请输菜单编号！');
            return false;
        }
        if (!params.menuLevel) {
            toastr.warning('请选择菜单层级！');
            return false;
        }
        if (!params.menuStatus) {
            toastr.warning('请选择菜单状态！');
            return false;
        }
        if (!params.channelNo) {
            toastr.warning('请选择所属系统！');
            return false;
        }
        if (!params.displayOrder) {
            toastr.warning('请输入菜单序号！');
            return false;
        }

        return true;
    }

    // 菜单提交
    function menuSubmitInfo(param,ngForm){



        var model = vm.model;
        var params = angular.extend(param, vm.model);

        // 输入校验
        if (!checkInput(params,ngForm)) {
            return
        }

        var modalId = ModalService.getLastModalId();
        switch (modalId) {
            case 'addTreeNode':
                params.menuParentId = node.menuId;
                // 服务通讯
                vm.menuSubmitInfoAdd(params).then(function(data) {
                    toastr.success('新增菜单成功！');
                    // 刷新树结构
                    queryCildNode();
                }).catch(function(err) {
                    toastr.error(err.message);
                });
                break;
            case 'modifyTreeNode':
                params.menuId = node.menuId;
                params.displayOrder = params.displayOrder.toString();
                // 服务通讯
                vm.menuSubmitInfoUpdate(params).then(function(data) {
                    toastr.success('修改菜单信息成功！');
                    // 刷新树结构
                    queryCildNode();
                }).catch(function(err) {
                    toastr.error(err.message);
                });
                break;
            default:
                break;
        }
    }

    // 新增-修改成功后刷新树结构
    function queryCildNode(){
        var modalId = ModalService.getLastModalId();
        AuthorityManagementService.queryMenuNodeInfoRequest({
            menuParentId:node.menuId,
            startIndex: vm.page.currentPage,     // 起始页码
            pageSize: vm.page.pageSize           // 每页记录数
        }).then(function(data) {
            // 新增成功后,刷新树
            var node = TreeService.getCurrentNode();
            node.$modelValue.nodes = TreeService.convertToTreeNodes(data['childMenuList'], {
                id: 'prodMenuCode',                         // 目录节点码
                title: 'prodMenuName',                      // 目录节点码名称
                parentID: 'prodMenuParentId',               // 目录父节点ID
                hasLeaf: 'prodMenuLevel',                   // 是否有子节点: '1' 是  '0' 否
                prodMenuUrl: 'prodMenuUrl',                 // 菜单URL
                prodMenuChannelNo: 'prodMenuChannelNo',     // 渠道号
                menuDesc: 'menuDesc',                       // 菜单描述
                menuStatus: 'menuStatus',                   // 菜单状态
                displayOrder: 'displayOrder',               // 菜单序号
                prodMenuLevel:'prodMenuLevel',               // 菜单层级
                menuId:'menuId',                            // 菜单主键
                menuParenName:'menuParenName',              // 菜单父级名称
                menuParenSeriNo:'menuParenSeriNo'           // 菜单父级ID
            });
            node.expand();
            ModalService.closeModal(modalId, '');
        }).catch(function(error) {
            toastr.error(error.message);
        });
    }

    // 取消(关闭弹出框)
    function cancel() {
        var name = ModalService.getLastModalId();
        ModalService.closeModal(name, '');
    }
};
