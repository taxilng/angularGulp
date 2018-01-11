'use strict';
var orgInfoDetail = require('../modalPages/orgInfoDetail');

module.exports = function(TreeService, $rootScope, $scope, AuthorityManagementService, OrgManagementConstant, toastr, timeFormatFilterFilter, ModalService, $ngBootbox, EventBusService) {
    var vm = this;

    // 提交后端model模型
    vm.model = {
        status: ''
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
    // 父级机构查询子机构信息
    vm.orgChildInfoRequestFun = orgChildInfoRequestFun;
    // 父级机构查询子机构信息函数
    vm.orgChildInfoRequest = AuthorityManagementService.orgChildInfoRequest;

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {

        // 机构查询
        AuthorityManagementService.queryOrgData({
            orgSeriNo:$rootScope.orgSeriNo,
            startIndex: vm.page.startIndex,
            pageSize: vm.page.pageSize
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
                orgId: 'orgId', // 机构主键
                parentOrgName:'parentOrgName'               // 上级机构名称
            };
            //权限树接口获取的数据字段转换为treenode需要的字段
            var nodes = TreeService.convertToTreeNodes(orgInfoListJsonStr, param);
            vm.nodeData = nodes;
        });

        // 机构面板
        vm.panelOrgOptions = OrgManagementConstant.panelOrgOptions;
        // 查询面板
        vm.formPanelOptions = OrgManagementConstant.formPanelOptions;
        // 返回结果面板
        vm.gridPanelOptions = OrgManagementConstant.gridPanelOptions;
        // 表单头部
        vm.schema = OrgManagementConstant.investSchema;
        // 表单输入
        vm.form = OrgManagementConstant.investFormOptions;
        // 表格
        vm.gridOptions = angular.copy(OrgManagementConstant.investGridOptions);
    }

    // 重置
    function resetAll() {
        // 表单数据
        vm.model.orgName = '';
        vm.model.orgSeriNo = '';

        // 表格数据
        vm.gridOptions.data = [];

        // 分页
        vm.page.total = '';
        vm.page.pageSize = '';
        vm.page.currentPage = '';
    }


    // 分页函数
    function doCtrlPagingAct(page, pageSize, total) {
        var pageParams = {
            startIndex: page + '',
            pageSize: pageSize + ''
        };

        if (page === 1) {
            vm.page = pageParams;
        }

        // 父级机构查询子机构信息
        orgChildInfo(pageParams);
    }

    /**
     * [description] 订阅organizationTree事件传播
     */
    EventBusService.subscribe('organizationTree', 'selected', function(event, value) {
        var nodes = value.nodes;

        if (nodes.length == 0) {
            toastr.warning(value.title + '机构下不存在子机构信息');
            return false;
        }

        vm.model.orgName = value.title;
        vm.model.orgSeriNo = value.id;
        // 机构主键
        vm.model.orgId = value.orgId;

        orgChildInfoRequestFun({});
    });

    // 输入校验
    function checkInput(params) {
        if (!params.orgName) {
            toastr.warning('请输入机构名称！');
            return false;
        }

        if (!params.orgSeriNo) {
            toastr.warning('请输入机构编号！');
            return false;
        }

        return true;
    }

    function orgChildInfoRequestFun(param) {
        var param = {
            orgId: vm.model.orgId,
            startIndex: vm.page.startIndex + '',
            pageSize: vm.page.pageSize + ''
        };

        // 按钮-父级机构查询子机构信息
        orgChildInfo(param);
    }

    // 父级机构查询子机构信息
    function orgChildInfo(param) {
        var model = vm.model;

        var params = angular.extend(param, model);

        // 机构名称和机构号只显示,不需要上送给后端服务
        delete params.orgName;
        delete params.orgSeriNo;

        // 输入校验
        // if (!checkInput(params)) {
        //     return
        // }

        // 服务通讯
        vm.orgChildInfoRequest(params).then(function(data) {
            if (!data.orgChildInfoList || data.orgChildInfoList.length === 0) {
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
                return;
            } else {
                vm.page.total = data.totalSize;
                for (var i = 0; i < data.orgChildInfoList.length; i++) {
                    data.orgChildInfoList[i].parentPrgId = vm.model.orgSeriNo
                }
                vm.gridOptions.data = data.orgChildInfoList;
            }
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }


    // grid回调函数
    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        // 查看详情
        gridApi.grid.appScope.orgDetail = function(row) {
            ModalService.showModal({
                modalId: 'orgInfoDetail',
                modalTitle: '机构详情',
                template: orgInfoDetail.html,
                controller: ['ModalService', 'row', '$scope', 'toastr', 'titleMapFilterFilter', orgInfoDetail.controller],
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
