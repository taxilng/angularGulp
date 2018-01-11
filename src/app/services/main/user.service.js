'use strict';

var userService = function(HttpService,CONFIG) {
    var service = {
        userLogin:userLogin,                 // 用户登录
        userLogout:userLogout                // 用户登出
    };

    return service;

    // 用户登录
    function userLogin(params) {
        return HttpService.request(CONFIG.API.USERLOGIN,params);
    }

    // 用户登出
    function userLogout(params) {
        return HttpService.request(CONFIG.API.USERLOGOUT,params);
    }
};

module.exports = userService;
