'use strict';

module.exports = function(
    $scope,
    salesSumAnalyService, 
    ValidationService,
    salesSumAnalyConstant, 
    timeFormatFilter, 
    toastr, 
    $ngBootbox, 
    CommonService
) {
    var vm = this;

    vm.model = {
        startDay: new Date(moment().subtract(3, "M")),
        endDay: new Date(),
        queryDimension: 'product'
    };

    var initPage = {
        'startIndex': '1',
        'pageSize': '5'
    };

    vm.page = angular.copy(initPage);

    //------------------------方法声明开始------------------------------//
    vm.init = init;
    vm.querySalesSumAnaly = querySalesSumAnaly; // 查询代理协议列表
    vm.search = search; //
    vm.resetAll = resetAll; // 重置
    vm.doCtrlPagingAct = doCtrlPagingAct; // 分页
    
    vm.gridOptions = salesSumAnalyConstant.investGridOptions;

    init();

    $scope.$watch('vm.model.endDay', function(newValue) {
        vm.form[0].items[0].items[0].dateOptions.maxDate = newValue;
    });
    $scope.$watch('vm.model.startDay', function(newValue) {
        vm.form[0].items[1].items[0].dateOptions.minDate = newValue;
    });

    vm.selectDimension = function(modelValue){
        vm.gridOptions.columnDefs[0].visible = true;
        vm.gridOptions.columnDefs[1].visible = false;
        if(modelValue == 'channel'){
            vm.gridOptions.columnDefs[0].visible = false;
            vm.gridOptions.columnDefs[1].visible = true;
        }
    }

    function init() {
        //查询面板
        vm.formPanelOptions = salesSumAnalyConstant.formPanelOptions;
        //查询结果面板
        vm.gridPanelOptions = salesSumAnalyConstant.gridPanelOptions;
        //查询表单
        vm.form = salesSumAnalyConstant.investFormOptions;

        vm.schema = salesSumAnalyConstant.investSchema;

        vm.querySalesSumAnaly(initPage);
    }

    function checkInput(params) {
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

    function search() {
        vm.querySalesSumAnaly(initPage);
    }

    // 销售业绩汇总分析
    function querySalesSumAnaly(page) {
        var params = angular.extend({}, page, vm.model);

        params.startDay = timeFormatFilter(params.startDay, 'YYYYMMDD');
        params.endDay = timeFormatFilter(params.endDay, 'YYYYMMDD');

        //输入校验
        if (!checkInput(params)) {
            return;
        }
        vm.gridOptions.data = [];

        salesSumAnalyService.queryAnalySalesSum(params).then(function(data) {
            if (!data.salesSumList || data.salesSumList.length === 0) {
                vm.gridOptions.data = [];
                $ngBootbox.alert('未查到相关数据');
            }
            vm.page.total = data.totalCount;
            vm.gridOptions.data = data.salesSumList;
            
            barInit(data.salesSumList);
            
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function resetAll() {
        vm.model = {
            startDay: new Date(moment().subtract(3, "M")),
            endDay: new Date(),
            queryDimension: 'product'
        };

        // 清空下拉框
        var clearArr = ['产品'];
        CommonService.clearSelectText(clearArr);

        vm.querySalesSumAnaly(initPage);
    }

    //分页
    function doCtrlPagingAct(page, pageSize, total) {
        vm.page.startIndex = page + '';
        vm.page.pageSize = pageSize + '';
        
        querySalesSumAnaly(vm.page);
    };

    function barInit(dataList){
        var barTitle = []; //图表的标题
        var barData = []; //图表的数据
        var dataName;
        
        for (var i = 0; i < dataList.length; i++) {
            dataName = dataList[i].productName?dataList[i].productName:dataList[i].channelName;
            
            barTitle.push(dataName);
            barData.push(dataList[i].transAmount);
        }

        vm.barOptions = {
            title: {
                text: '销售业绩汇总分析',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 400
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: 5,
                containLabel: true
            },
            textStyle: {
                color: '#000',
                fontSize: 12
            },
            xAxis: [{
                type: 'category',
                data: barTitle,
                axisLabel: {
                    interval: 0,
                    formatter: function(value) {
                        if (value && value.length > 6) {
                            return value.substr(0, 6) + '\n' + value.substr(6, value.length);
                        }
                        return value;
                    }
                }
            }],
            yAxis: [{
                type: 'value',
                position: 'left'
            }],
            series: [{
                type: 'bar',
                name: '统计日指标',
                barCategoryGap: '70%',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#0c92f2'
                    }
                },
                data: barData
            }]
        };

    }

};


