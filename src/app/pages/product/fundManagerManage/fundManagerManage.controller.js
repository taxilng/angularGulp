'use strict';
var fundManagerModal = require('../fundManagerModal');
var fundManagerDetailModal = require('../fundManagerDetailModal');
module.exports = function(FundManagerManageConstant, ModalService, FundManagerService, toastr, ValidationService, $ngBootbox) {
    var vm = this;
    //form
    vm.form = FundManagerManageConstant.managerForm;
    //schema
    vm.schema = FundManagerManageConstant.managerSchema;
    //pannel
    vm.formPanelOptions = FundManagerManageConstant.formPanelOptions;
    vm.gridPanelOptions = FundManagerManageConstant.gridPanelOptions;
    //model
    vm.model = {};
    //page
    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };

    //function
    vm.searchInfo = searchInfo;
    vm.reset = reset;
    vm.gridOptions = FundManagerManageConstant.investGridOptions;
    vm.gridOptions.onRegisterApi = onRegisterApi;
    vm.addmode = addmode;
    vm.editmode = editmode;
    vm.delmode = delmode;
    vm.detailmode = detailmode;
    vm.doCtrlPagingAct = doCtrlPagingAct;

    //初始化
    init();

    function init() {
        search(vm.page);
    }

    function searchInfo() {
        vm.page.startIndex = 1;
        search(vm.page);
    }

    function reset() {
        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        vm.model = {};
        search(vm.page);
    }

    function onRegisterApi(gridApi) {
        vm.gridApi = gridApi;

        gridApi.grid.appScope.editmode = function(row) {
            var item = row.entity;
            vm.editmode(item);
        };


        gridApi.grid.appScope.delmode = function(row) {
            var item = row.entity;
            vm.delmode(item);
        };


        gridApi.grid.appScope.detailmode = function(row) {
            var item = row.entity;
            vm.detailmode(item);
        };

    }


    function search(param) {
        var pageinfo = {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        };

        var newParam = angular.extend({}, vm.model, { 'pageInfo': pageinfo });
        if (!checkInput(newParam)) {
            return;
        }
        FundManagerService.search(newParam).then(function(data) {
            if (!data.ProductManagerList || data.ProductManagerList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = [];
                vm.page = {
                    'startIndex': 1,
                    'pageSize': 5,
                    'total': 0
                };
            } else {
                vm.page.total = data.count;
                vm.gridOptions.data = data.ProductManagerList;
            }
        }).catch(function(error) {
            toastr.error(error.message);
        });
    }

    function addmode(params) {
        params = {};
        ModalService.showModal({
            modalId: 'fundManagerModal',
            template: fundManagerModal.html,
            modalTitle: '新增基金经理信息',
            controller: ['ModalService', 'FundManagerService', 'FundManagerModalConstant', 'toastr', 'params', 'ValidationService', fundManagerModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            search(vm.page);
        });
    }

    function editmode(params) {
        ModalService.showModal({
            modalId: 'fundManagerModal',
            template: fundManagerModal.html,
            modalTitle: '修改基金经理信息',
            controller: ['ModalService', 'FundManagerService', 'FundManagerModalConstant', 'toastr', 'params', 'ValidationService', fundManagerModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            search(vm.page);
        });
    }

    function delmode(param) {
        $ngBootbox.confirm('确认删除基金经理' + param.partyName + '的信息吗？').then(function() {
            FundManagerService.del(param);
        }, function() {});
    }


    function detailmode(params) {
        ModalService.showModal({
            modalId: 'fundManagerDetailModal',
            template: fundManagerDetailModal.html,
            modalTitle: '基金经理信息详情',
            controller: ['$scope', 'params', 'titleMapFilterFilter', fundManagerDetailModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {});
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

    //校验
    function checkInput(params) {
        if (params.partyName) {
            if (!ValidationService.validateChinese(params.partyName)) {
                toastr.warning('基金经理姓名必须是中文字符');
                return false;
            }
        }
        if (params.corporateName) {
            if (ValidationService.containSpecial(params.corporateName)) {
                toastr.warning('公司不能包含特殊符号');
                return false;
            }
        }
        return true;
    }

};
