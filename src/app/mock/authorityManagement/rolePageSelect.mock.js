'use strict';

var ROLEPAGESELECT = {
     reply:{
        resBody:{
            totalSize:'50',
            roleListInfo: [{
                roleId:'0000001',
                roleName:'超级系统管理员',
                roleCode:'0000001',
                roleDesc:'超级系统管理员',
                status:'1',
                channelNo:'301'
            },{
                roleId:'0000003',
                roleName:'总行业务经办员',
                roleCode:'0000003',
                roleDesc:'总行业务经办员',
                status:'1',
                channelNo:'301'
            },{
                roleId:'0000004',
                roleName:'分行业务经办员',
                roleCode:'0000004',
                roleDesc:'分行业务经办员',
                status:'1',
                channelNo:'301'
            },{
                roleId:'0000005',
                roleName:'分行业务审核员',
                roleCode:'0000005',
                roleDesc:'分行业务审核员',
                status:'1',
                channelNo:'301'
            },{
                roleId:'0000006',
                roleName:'支行主管',
                roleCode:'0000006',
                roleDesc:'支行主管',
                status:'1',
                channelNo:'301'
            },{
                roleId:'0000007',
                roleName:'支行柜员',
                roleCode:'0000007',
                roleDesc:'支行柜员',
                status:'1',
                channelNo:'301'
            }]
        }
    }
};

var ROLEADD = {
     reply:{
        returnCode:{
            type:"S"
        },
        resBody:{

        }
    }
};

var ROLEUPDATE = {
     reply:{
        returnCode:{
            type:"S"
        },
        resBody:{

        }
    }
};

var ROLEDELETE = {
     reply:{
        returnCode:{
            type:"S"
        },
        resBody:{

        }
    }
};
