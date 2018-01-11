'use strict';

module.exports = function(
    params, 
    toastr, 
    modalService, 
    investPlanConfigService
) {
    var vm = this;

    vm.prodTypeMap = [{
        value: 'SAVINGDEPOSIT',
        name: '储蓄存款类'
    }, {
        value: 'TREASURE',
        name: '现金存款类'
    }, {
        value: 'FINANCING',
        name: '固定收益类'
    }, {
        value: 'FUND',
        name: '浮动收益类'
    }];

    vm.planId = params.planId;

    vm.updateProdPlan = updateProdPlan;

    //查询方案中的产品配置
    selectProdConfig();
    function selectProdConfig(){

        var newParams = {
            planId: vm.planId
        };

        investPlanConfigService.selectProdConfig(newParams).then(function(data) {
            vm.prodConfigList = data.prodProductConfigList;
        }).catch(function(err) {
            toastr.error(err.message);
        });
	}

    function updateProdPlan(){
        var newParams = {
            planId: vm.planId
        };

        investPlanConfigService.updateProdPlan(newParams).then(function(data) {
            data.prodProductList.map(function(item1){
                vm.prodConfigList.map(function(item2){
                    if(item1.prodType == item2.prodType){
                        item2.productId = item1.productId;
                        item2.prodName = item1.prodName;
                    }
                })
            })
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    
};
