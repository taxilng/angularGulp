'use strict';

module.exports = function(registCustomerCountConstant, timeFormatFilterFilter, toastr, $ngBootbox, customerManagementService,CommonService,ValidationService) {
    var vm = this;
    vm.init = init;
    vm.startDate = window.moment().add(-3, 'M')['_d'];
    vm.model = {
        startTime: vm.startDate,
        endTime: new Date(),
        userLevel: ''
    };

    vm.pageSize = '5';
    vm.currentPage = '1';
    vm.page = {
        'startIndex': vm.currentPage,
        'pageSize': vm.pageSize
    };


    //------------------------方法声明开始------------------------------//

    vm.searchRegsiterCustomer = searchRegsiterCustomer;
    vm.doCtrlPagingAct = doCtrlPagingAct;
    vm.search = search;
    // 重置
    vm.resetAll = resetAll;

    init();

    function init() {
        //查询面板
        vm.formPanelOptions = registCustomerCountConstant.formPanelOptions;
        //查询结果面板
        vm.gridPanelOptions = registCustomerCountConstant.gridPanelOptions;
        //查询表单
        vm.form = registCustomerCountConstant.investFormOptions;

        vm.schema = registCustomerCountConstant.investSchema;

        //表格
        vm.gridOptions = angular.copy(registCustomerCountConstant.investGridOptions);


        vm.searchRegsiterCustomer(vm.page);
    }


    function checkInput(params) {
        if(!params.startTime){
            toastr.warning('请选择开始时间');
            return false;
        }

        if(!params.endTime){
            toastr.warning('请选择结束时间');
            return false;
        }

        if (!ValidationService.compareTwoDate(params.startTime, params.endTime, '开始时间', '结束时间')) {
            return false;
        }
        return true;
    }

    function search(param) {
        vm.page.startIndex = '1';
        vm.searchRegsiterCustomer(vm.page);
    }


    function searchRegsiterCustomer(param) {
        var pageInfo = {
            startIndex: param.startIndex + '',
            pageSize: param.pageSize + ''
        };

        var params = angular.extend({},vm.model,pageInfo);

        //输入校验
        if (!checkInput(params)) {
            return;
        }

        params.startTime = timeFormatFilterFilter(params.startTime, 'YYYYMMDD');
        params.endTime = timeFormatFilterFilter(params.endTime, 'YYYYMMDD');


        customerManagementService.queryRegistCustomer(params).then(function(data) {
            if (!data.userInfoList || data.userInfoList.length === 0) {
                $ngBootbox.alert('未查到相关数据');
                vm.gridOptions.data = [];
                return;
            }
            vm.page.total = data.totalSize;
            vm.gridOptions.data = data.userInfoList;
        }).catch(function(err) {
            toastr.error(err.message);
        });

    }

    function resetAll() {
        vm.model = {
            startTime: vm.startDate,
            endTime: new Date()
        };

        // 清空下拉框
        var clearArr = ['全部用户'];
        CommonService.clearSelectText(clearArr);


        vm.page = {
            'startIndex': vm.currentPage,
            'pageSize': vm.pageSize
        };
        vm.searchRegsiterCustomer(vm.page);
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
        searchRegsiterCustomer(param);
    };

};
