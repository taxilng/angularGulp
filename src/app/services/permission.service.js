'use strict';

module.exports = function(HttpService,CONFIG) {
    var service = {
        hasPermission:hasPermission,
        getAllPermission:getAllPermission,
        _permissions:null
    };


    function hasPermission(permissionName){
        var hasPermiss = false;
        if(this._permissions && this._permissions.length>0){
            this._permissions.forEach(function(permission){
                if(permissionName == permission){
                    hasPermiss = true;
                }
            });
        }
        return hasPermiss;
    }

    function getAllPermission(){
        HttpService.request(CONFIG.API.GET_ALL_PERMISSION);
    }
    return service;
};
