'use strict';

module.exports = function(modalService, toastr, params, batchManagementService) {
    var vm = this;
    vm.init = init;

    vm.pageSize = 5;
    vm.currentPage = 1;
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };

    vm.queryBatchData = queryBatchData;
    vm.dismissModal = dismissModal;
    init();

    function init() {
        vm.panelBanseInfoOptions = {
            title: '公共数据头',
            hasIcon: false,
            hasLine: true,
            panelClass: 'gridform-panel'
        };
        vm.model = angular.extend(params);
        vm.gridOptions = {
            enableRowSelection: false,
            enableRowHeaderSelection: false,
            enableColumnMenus: false,
            enableSorting:false,
            columnDefs: [{
                name: '数据编号',
                field: 'roleCode'
            }, {
                name: '状态',
                field: 'roleName'
            }, {
                name: '关联ID',
                field: 'roleDesc'
            }, {
                name: '开始时间',
                type: 'string',
                format: 'date'
            }, {
                name: '结束时间',
                type: 'string',
                format: 'date'
            }, {
                name: '返回码',
                field: 'status',
                cellFilter: 'titleMapFilter:' + JSON.stringify([{ value: '1', name: '正常' }, { value: '0', name: '冻结' }]),
            }],
            data: []
        };
        vm.queryBatchData(vm.page);
    }

    function queryBatchData(param) {
        var params = angular.extend({}, vm.model, {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        });

        batchManagementService.queryBatchData(params).then(function(data) {
            vm.gridOptions.data = data.batchDataList;
        }).catch(function(err) {

        });
    }

    function dismissModal() {
        var name = modalService.getLastModalId();
        modalService.dismissModal(name, '');
    }
};
