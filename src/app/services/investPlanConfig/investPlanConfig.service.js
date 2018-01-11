'use strict';

var investPlanConfigService = function(HttpService, CONFIG) {
    var service = {
        // 财富管家-查询方案推荐规则列表
        selectPlanConfig: selectPlanConfig,
        //财富管家-查询方案推荐规则详情
        selectProdConfig: selectProdConfig,
        //财富管家-方案推荐规则修改
        updatePlanConfig: updatePlanConfig,
        //财富管家-方案推荐规则删除
        deletePlanConfig: deletePlanConfig,
        //财富管家-更新方案中的产品
        updateProdPlan: updateProdPlan

    };

    // //财富管家-查询方案推荐规则列表
    //     SELECTPLANCONFIG:'selectPlanConfig',
    //     //财富管家-查询方案推荐规则详情
    //     SELECTPRODCONFIG:'selectProdConfig',
    //     //财富管家-方案推荐规则修改
    //     UPDATEPLANCONFIG:'updatePlanConfig',
    //     //财富管家-方案推荐规则删除
    //     DELETEPLANCONFIG:'deletePlanConfig',

    return service;

    // 财富管家-查询方案推荐规则列表
    function selectPlanConfig(params) {
        return HttpService.request(CONFIG.API.SELECTPLANCONFIG,params);
    }

    //财富管家-查询方案推荐规则详情
    function selectProdConfig(params) {
        return HttpService.request(CONFIG.API.SELECTPRODCONFIG,params);
    }

    //财富管家-方案推荐规则修改
    function updatePlanConfig(params) {
        return HttpService.request(CONFIG.API.UPDATEPLANCONFIG,params);
    }

    //财富管家-方案推荐规则删除
    function deletePlanConfig(params) {
        return HttpService.request(CONFIG.API.DELETEPLANCONFIG,params);
    }

    //财富管家-更新方案中的产品
    function updateProdPlan(params) {
        return HttpService.request(CONFIG.API.UPDATEPRODOFPLAN,params);
    }
}

module.exports = investPlanConfigService;
		