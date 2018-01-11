'use strict';

var menuInfoDetail = require('../modalPages/menuInfoDetail');

module.exports = function(MenuTreeService, $rootScope, $scope, AuthorityManagementService, MenuManagementConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, EventBusService, CommonService) {
    var vm = this;
    // 提交后端model模型
    vm.model = {
        menuStatus: '',
        channelNo: ''
    };

    //------------------------变量声明开始------------------------------//
    // 分页参数
    vm.page = {
        currentPage: '1',
        pageSize: '5',
        total: ''
    };

    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//

    //初始化数据
    init();
    //------------------------方法声明结束------------------------------//
    // 查询菜单节点信息
    vm.queryMenuNodeInfoRequestFun = queryMenuNodeInfoRequestFun;
    // 查询菜单节点信息服务函数
    vm.queryMenuNodeInfoRequest = AuthorityManagementService.queryMenuNodeInfoRequest;
    // 重置
    vm.resetAll = resetAll;
    // 分页函数
    vm.doCtrlPagingAct = doCtrlPagingAct;

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 菜单查询
        MenuTreeService.queryTreeData({
            prodMenuCode: 'RootMenu'
        }).then(function(data) {
            if (data.menuInfoListJsonStr.indexOf("\\")) {
                // json串需要反转义
                var menuInfoListJsonStr = angular.fromJson(data.menuInfoListJsonStr.replace("\\", ""));
            } else {
                var menuInfoListJsonStr = data.menuInfoListJsonStr;
            }
            vm.tree = menuInfoListJsonStr;

            console.log(menuInfoListJsonStr);
        });

        // 机构面板
        vm.panelOrgOptions = MenuManagementConstant.panelOrgOptions;
        // 查询面板
        vm.formPanelOptions = MenuManagementConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = MenuManagementConstant.gridPanelOptions;
        // 表单头部
        vm.schema = MenuManagementConstant.investSchema;
        // 表单输入
        vm.form = MenuManagementConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(MenuManagementConstant.investGridOptions);
    }

    // 重置
    function resetAll() {
        vm.model = {};

        // 清空下拉框
        var clearArr = ['全部', '全部'];
        CommonService.clearSelectText(clearArr);

        // 清空表格
        vm.gridOptions.data = [];
        // 分页参数
        vm.page.total = "";
    }

    /**
     * [description] 订阅menuTreeNode事件传播
     */
    EventBusService.subscribe('menuTreeNode', 'selected', function(event, value) {
        var nodes = value.nodes;

        vm.model.menuName = value.title;
        vm.model.menuSeriNo = value.id;
        // 菜单主键
        vm.model.menuId = value.menuId;
        // 清空表格
        vm.gridOptions.data = [];
        // 分页参数
        vm.page.total = "";
        // 判断是否存在子菜单
        if (nodes.length == 0) {
            toastr.warning(value.title + '菜单下不存在子菜单信息');
            return false;
        }
        // 查询子菜单
        queryMenuNodeInfoRequestFun({});
    });


    // 输入校验
    function checkInput(params) {
        if (!params.menuName) {
            toastr.warning('请输入菜单名称！');
            return false;
        }

        if (!params.menuSeriNo) {
            toastr.warning('请输入菜单编号！');
            return false;
        }

        return true;
    }


    // 查询按钮
    function queryMenuNodeInfoRequestFun() {
        var params = {
            startIndex: vm.page.currentPage + '',
            pageSize: vm.page.pageSize + ''
        };

        queryMenuNodeInfo(params);
    }

    /**
     * [queryMenuNodeInfo 查询菜单节点信息]
     */
    function queryMenuNodeInfo(param) {
        var model = vm.model;
        var params = angular.extend(param, vm.model);

        params.menuParentId = vm.model.menuId;

        // 输入校验
        if (!checkInput(params)) {
            return
        }

        // 服务通讯
        vm.queryMenuNodeInfoRequest(params).then(function(data) {
            if (!data.childMenuList || data.childMenuList.length === 0) {
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            } else {
                vm.page.total = data.totalSize;
                vm.gridOptions.data = data.childMenuList;
            }
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
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

        // 查询菜单节点信息
        queryMenuNodeInfo(pageParams);
    }

    // grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 查看详情
        gridApi.grid.appScope.menuDetail = function(row) {
            ModalService.showModal({
                modalId: 'menuInfoDetail',
                modalTitle: '菜单详情',
                template: menuInfoDetail.html,
                controller: ['ModalService', 'row', '$scope', 'toastr', 'titleMapFilterFilter', menuInfoDetail.controller],
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
