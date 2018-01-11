'use strict';

var authorityManagementService = function(HttpService, CONFIG) {
    var service = {
        queryMenuNodeInfoRequest:queryMenuNodeInfoRequest,
        menuAdd:menuAdd,
        menuUpdate:menuUpdate,
        menuDelete:menuDelete,
        rolePageSelectRequest:rolePageSelectRequest,
        roleAdd:roleAdd,
        roleUpdate:roleUpdate,
        roleDelete:roleDelete,
        roleBindMenuSelect:roleBindMenuSelect,
        roleBindMenu:roleBindMenu,
        queryOrgData:queryOrgData,
        orgAdd:orgAdd,
        orgUpdate:orgUpdate,
        orgDelete:orgDelete,
        orgChildInfoRequest:orgChildInfoRequest,
        userPageSelectRequest:userPageSelectRequest,
        userAdd:userAdd,
        userUpdate:userUpdate,
        userDelete:userDelete,
        userBindRoleSelect:userBindRoleSelect,
        userBindRole:userBindRole
    };

    return service;

    // 查询菜单节点信息
    function queryMenuNodeInfoRequest(params){
        return HttpService.request(CONFIG.API.QUERYMENUNODEINFO,params);
    }

    // 菜单新增
    function menuAdd(params){
    	return HttpService.request(CONFIG.API.MENUADD,params);
    }

    // 菜单修改
    function menuUpdate(params){
    	return HttpService.request(CONFIG.API.MENUUPDATE,params);
    }

    // 菜单删除
    function menuDelete(params){
        return HttpService.request(CONFIG.API.MENUDELETE,params);
    }

    // 角色信息的分页查询
    function rolePageSelectRequest(params){
        return HttpService.request(CONFIG.API.ROLEPAGESELECT,params);
    }

    // 新增角色
    function roleAdd(params){
        return HttpService.request(CONFIG.API.ROLEADD,params);
    }

    // 修改角色
    function roleUpdate(params){
        return HttpService.request(CONFIG.API.ROLEUPDATE,params);
    }
    
    // 删除角色
    function roleDelete(params){
        return HttpService.request(CONFIG.API.ROLEDELETE,params);
    }

    // 角色绑定菜单查询
    function roleBindMenuSelect(params){
        return HttpService.request(CONFIG.API.ROLEBINDMENUSELECT,params);
    }

    // 角色绑定菜单
    function roleBindMenu(params){
        return HttpService.request(CONFIG.API.ROLEBINDMENU,params);
    }

    // 机构查询
    function queryOrgData(params){
        return HttpService.request(CONFIG.API.QUERYORGDATA,params);
    }

    // 新增机构
    function orgAdd(params){
        return HttpService.request(CONFIG.API.ORGADD,params);
    }

    // 修改机构
    function orgUpdate(params){
        return HttpService.request(CONFIG.API.ORGUPDATE,params);
    }

    // 删除机构
    function orgDelete(params){
        return HttpService.request(CONFIG.API.ORGDELETE,params);
    }
    
    // 父级机构查询子机构信息函数
    function orgChildInfoRequest(params){
        return HttpService.request(CONFIG.API.ORGCHILDINFOREQUEST,params);
    }

    // 用户信息的分页查询
    function userPageSelectRequest(params){
        return HttpService.request(CONFIG.API.USERPAGESELECTREQUEST,params);
    }

    // 用户新增
    function userAdd(params){
        return HttpService.request(CONFIG.API.USERADD,params);
    }

    // 用户修改
    function userUpdate(params){
        return HttpService.request(CONFIG.API.USERUPDATE,params);
    }

    // 用户删除
    function userDelete(params){
        return HttpService.request(CONFIG.API.USERDELETE,params);
    }

    // 用户绑定角色查询
    function userBindRoleSelect(params){
        return HttpService.request(CONFIG.API.USERBINDROLESELECT,params);
    }

    // 用户绑定角色
    function userBindRole(params){
        return HttpService.request(CONFIG.API.USERBINDROLE,params);
    }
}


module.exports = authorityManagementService;