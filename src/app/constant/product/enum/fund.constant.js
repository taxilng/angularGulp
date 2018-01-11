'use strict';

var fundConstant = {
	pageRecommendOptions:[{
		name:'--请选择--',
		value:''
	},{
		name:'是',
		value:'1'
	},{
		name:'否',
		value:'0'
	}],
	productTypeIdOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '货币型',
		value: 'CURRENCYTYPE'
	}, {
		name: '债券型',
		value: 'BONDTYPE'
	}, {
		name: '股票型',
		value: 'STOCKTYPE'
	}, {
		name: '混合型',
		value: 'MIXEDTYPE'
	},{
		name: 'QDII型',
		value: 'QDII'
	},{
		name: '平衡型',
		value: 'BALANCE'
	}],
	productAmountUomIdOptions: [{
		name:'--请选择--',
		value:''
	},/*{
		name: '数量',
		value: 'QUANTITY'
	}, */{
		name: '金额',
		value: 'AMOUNT'
	}],
	statusIdOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '上架',
		value: 'ON_SALE'
	}, {
		name: '下架',
		value: 'OFF_SALE'
	}],
	maxAmountTypeOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '元',
		value: 'YUAN'
	}],
	minAmountTypeOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '元',
		value: 'YUAN'
	}],
	chargeTypeOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '前端收费（申购时收费）',
		value: 'FRONT'
	}, {
		name: '后端收费（赎回时收费）',
		value: 'BACK'
	}],
	riskLevelOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '高风险',
		value: 'FR6'
	},{
		name: '中高风险',
		value: 'FR5'
	}, {
		name: '中风险',
		value: 'FR4'
	},{
		name: '中低风险',
		value: 'FR3'
	},{
		name: '低风险',
		value: 'FR2'
	},{
		name: '较低风险',
		value: 'FR1'
	}],
	redemptionOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '不能赎回',
		value: 'NO'
	}, {
		name: '可以赎回',
		value: 'YES'
	}],
	dividendOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '现金分红',
		value: 'CASH'
	}],
	uomTypeOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '元',
		value: 'YUAN'
	}, {
		name: '万',
		value: 'MILLION'
	}, {
		name: '天',
		value: 'DAY'
	}, {
		name: '月',
		value: 'MONTH'
	}, {
		name: '年',
		value: 'YEAR'
	}],
	amountUomIdOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '百分比',
		value: 'PERCENT'
	}, {
		name: '元',
		value: 'YUAN'
	}],
	saleChannelTypeIdOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: 'PC',
		value: '100001'
	}, {
		name: 'APP',
		value: '100002'
	}],
	parentTypeIdOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '认购费率',
		value: 'SUB'
	}, {
		name: '申购费率',
		value: 'PURCHASE'
	}, {
		name: '赎回费率',
		value: 'REDEEM'
	}],
	genderOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '女',
		value: '0'
	}, {
		name: '男',
		value: '1'
	}],
	educationBackgroundOptions: [{
		name:'--请选择--',
		value:''
	},{
		name: '专科',
		value: 'ASSOCIATE'
	}, {
		name: '本科',
		value: 'UNDERGRADUATE'
	}, {
		name: '硕士',
		value: 'MASTER'
	}, {
		name: '博士',
		value: 'DOCTOR'
	}]
};
module.exports = fundConstant;
