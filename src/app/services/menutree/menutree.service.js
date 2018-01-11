'use strict';

var menutreeService = function(HttpService,CONFIG,MenuConstant,$q) {
    var service = {
        queryTreeData:queryTreeData                 //获取树节点数据
    };

    return service;

    function queryTreeData(params) {
        var defer = $q.defer();
        defer.resolve(MenuConstant.reply.resBody);
        return defer.promise;
        // return HttpService.request(CONFIG.API.QUERY_MENU_TREE,params);
    }
};

module.exports = menutreeService;
