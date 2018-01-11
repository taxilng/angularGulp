'use strict';

var customerManagementService = function(HttpService, CONFIG) {
    var service = {
        queryRegistCustomer:queryRegistCustomer
    };

    return service;

    // 查询菜单节点信息
    function queryRegistCustomer(params) {
        return HttpService.request(CONFIG.API.QUERYREGISTERCUSTOMER,params);
    }
}


module.exports = customerManagementService;
