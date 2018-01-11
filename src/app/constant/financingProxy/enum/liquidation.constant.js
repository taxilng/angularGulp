'use strict';
/**
 * 清算方式Constant
 */
var liquidation = {
	type: [{
        value:'0',
        name:'每日'
    },{
        value:'1',
        name:'每周'
    },{
        value:'2',
        name:'每月'
    },{
        value:'3',
        name:'每季'
    },{
        value:'4',
        name:'每年'
    }],
    tool: [{
        value:'CASH',
        name:'现金'
    },{
        value:'TRANSFER',
        name:'银行转账'
    },{
        value:'ECHECK',
        name:'电子支票'
    }]
}

module.exports = liquidation;
