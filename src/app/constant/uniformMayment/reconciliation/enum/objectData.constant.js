'use strict';
/**
 * 状态Constant
 */
var objectDataConstant = {
	tranStatus0:[
	    {
	        value: 'ORDER_CREATED',
	        name: '订单已创建'
	    }, {
	        value: 'ORDER_RECEIVED',
	        name: '订单已收妥'
	    },{
	        value: 'ORDER_NOT_RECEIVED',
	        name: '订单未收妥'
	    },{
	        value: 'PAY_NOT_COMPLETED',
	        name: '订单未付款完成'
	    },{
	        value: 'ORDER_COMPLETED',
	        name: '订单完成'
	    },{
	        value: 'PAY_CANCELLING',
	        name: '付款撤销未完成'
	    },{
	        value: 'RECEIVE_CANCELING',
	        name: '收款撤销未完成'
	    },{
	        value: 'ORDER_PRE_AUTHING',
	        name: '订单预授权中'
	    },{
	        value: 'ORDER_CANCELED',
	        name: '订单已取消'
	    }
	],

	tranStatus2:[
		{
	        value: 'PAY_NOT_COMPLETED',
	        name: '订单未付款完成'
	    },{
	        value: 'ORDER_COMPLETED',
	        name: '订单已完成'
	    },{
	        value: 'ORDER_CANCELED',
	        name: '订单已取消'
	    },{
	        value: 'ORDER_RETURN',
	        name: '订单已退货'
	    },{
	        value: 'OFFSET_BALANCE',
	        name: '已轧差'
	    },{
	        value: 'CLEARING',
	        name: '已清算'
	    },{
	        value: 'REFUSED',
	        name: '已拒绝'
	    },{
	        value: 'QUEUEING',
	        name: '清算排队'
	    }
	]
};

module.exports = objectDataConstant;
