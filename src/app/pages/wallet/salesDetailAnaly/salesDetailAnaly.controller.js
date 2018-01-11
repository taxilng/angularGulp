'use strict';

module.exports = function(
    $scope,
	salesDetailAnalyService,
    productNameListService, 
    fundProductService,
    ValidationService,
	salesDetailAnalyConstant, 
	timeFormatFilterFilter, 
	toastr, 
	$ngBootbox, 
	CommonService
) {
    var vm = this;

    vm.model = {
        startDay: new Date(moment().subtract(3, "M")),
        endDay: new Date(),
        transChannl: '100001'
    };

    var initPage = {
        'startIndex': '1',
        'pageSize': '5'
    };
    vm.page = initPage;

    //------------------------方法声明开始------------------------------//
    vm.init = init;
    vm.queryAnalySalesDetail = queryAnalySalesDetail; // 查询代理协议列表
    vm.doCtrlPagingAct = doCtrlPagingAct; // 分页
    vm.search = search; //
    vm.resetAll = resetAll; // 重置

    vm.gridOptions = salesDetailAnalyConstant.investGridOptions;

    init();
    queryProductList();
    
    $scope.$watch('vm.model.endDay', function(newValue) {
        vm.form[0].items[0].items[0].dateOptions.maxDate = newValue;
    });
    $scope.$watch('vm.model.startDay', function(newValue) {
        vm.form[0].items[1].items[0].dateOptions.minDate = newValue;
    });

    function init() {
        //查询面板
        vm.formPanelOptions = salesDetailAnalyConstant.formPanelOptions;
        //查询结果面板
        vm.gridPanelOptions = salesDetailAnalyConstant.gridPanelOptions;
        //查询表单
        vm.form = salesDetailAnalyConstant.investFormOptions;

        vm.schema = salesDetailAnalyConstant.investSchema;

        //表格
        vm.gridOptions = angular.copy(salesDetailAnalyConstant.investGridOptions);
        
        vm.queryAnalySalesDetail(initPage);
    }

    function checkInput(params) {
        if(!params.productId && !params.transChannl){
            toastr.warning('请选择产品名称或交易渠道');
            return false;
        }

        if (ValidationService.isEmpty(params.startDay)) {
            toastr.warning('请输入开始时间');
            return false;
        }

        if (ValidationService.isEmpty(params.endDay)) {
            toastr.warning('请输入结束时间');
            return false;
        }

        return true;
    }

    function queryProductList(){
        vm.productList = [];
        
        productNameListService.prodNameListSelect().then(function(data){
            var list = data.prodNameList;
            
            list.map(function(item){
                var map = {
                    name: item.prodName,
                    value: item.prodId
                };

                vm.productList.push(map);
            });

            vm.form[1].items[0].items[0].typeaheadMap = vm.productList;
        }).catch(function(error) {
            // toastr.error(error.message);
        });
    }

    function search() {
        vm.queryAnalySalesDetail(vm.page);
    }

    // 查看代理协议列表
    function queryAnalySalesDetail(page) {
        var page = {
            startIndex: page.startIndex + '',
            pageSize: page.pageSize + ''
        };
        var params = angular.extend({},page, vm.model);
        
        params.startDay = timeFormatFilterFilter(params.startDay, 'YYYYMMDD');
        params.endDay = timeFormatFilterFilter(params.endDay, 'YYYYMMDD');
        params.productId = params.productId && params.productId.value ? params.productId.value: '';

        //输入校验
        if (!checkInput(params)) {
            return;
        }

        salesDetailAnalyService.queryAnalySalesDetail(params).then(function(data) {
            if (!data.salesDetailList || data.salesDetailList.length === 0) {
                vm.gridOptions.data = [];
                $ngBootbox.alert('未查到相关数据');
            }
            vm.page.total = data.totalCount;
            vm.totalAmount = data.totalAmount;
            vm.gridOptions.data = data.salesDetailList;
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function resetAll() {
        vm.model = {
            startDay: new Date(moment().subtract(3, "M")),
            endDay: new Date(),
            transChannl: '100001'
        };

        // 清空下拉框
        var clearArr = ['PC端'];
        CommonService.clearSelectText(clearArr);

        vm.queryAnalySalesDetail(initPage);
    }

    //分页
    function doCtrlPagingAct(page, pageSize, total) {
        vm.page.startIndex = page + '';
        vm.page.pageSize = pageSize + '';
        
        queryAnalySalesDetail(vm.page);
    };

};


