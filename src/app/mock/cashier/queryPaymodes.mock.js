'use strict';

var PAYMENTMETHOD_QUERY = {
    reply:{
    resBody:{
    totalSize:20,
    pageSize:2,
    payMethodList: [{
        'payMethodId': 1,
        'payMethodName': '润和付钱包',
        'methodLabel':'ACCOUNT',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '邱爽',
        'lastUpdateDate': '2016-8-2',
        'description': '润和付钱包余额付款'
    }, {
        'payMethodId': 2,
        'payMethodName': '银行卡支付',
        'methodLabel':'QUICK',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '许亮亮',
        'lastUpdateDate': '2016-8-2',
        'description': '银行卡支付'
    }, {
        'payMethodId': 3,
        'payMethodName': '支付宝付款',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    },{
        'payMethodId': 4,
        'payMethodName': '润和付钱包',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '邱爽',
        'lastUpdateDate': '2016-8-2',
        'description': '润和付钱包余额付款'
    }, {
        'payMethodId': 5,
        'payMethodName': '银行卡支付',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '许亮亮',
        'lastUpdateDate': '2016-8-2',
        'description': '银行卡支付'
    }, {
        'payMethodId': 6,
        'payMethodName': '支付宝付款',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    },{
        'payMethodId': 7,
        'payMethodName': '润和付钱包',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '邱爽',
        'lastUpdateDate': '2016-8-2',
        'description': '润和付钱包余额付款'
    }, {
        'payMethodId': 8,
        'payMethodName': '银行卡支付',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '许亮亮',
        'lastUpdateDate': '2016-8-2',
        'description': '银行卡支付'
    }, {
        'payMethodId': 9,
        'payMethodName': '支付宝付款',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    },{
        'payMethodId': 10,
        'payMethodName': '支付宝付款',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    },{
        'payMethodId': 1,
        'payMethodName': '润和付钱包',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '邱爽',
        'lastUpdateDate': '2016-8-2',
        'description': '润和付钱包余额付款'
    }, {
        'payMethodId': 2,
        'payMethodName': '银行卡支付',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '许亮亮',
        'lastUpdateDate': '2016-8-2',
        'description': '银行卡支付'
    }, {
        'payMethodId': 3,
        'payMethodName': '支付宝付款',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    },{
        'payMethodId': 4,
        'payMethodName': '润和付钱包',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '邱爽',
        'lastUpdateDate': '2016-8-2',
        'description': '润和付钱包余额付款'
    }, {
        'payMethodId': 5,
        'payMethodName': '银行卡支付',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '许亮亮',
        'lastUpdateDate': '2016-8-2',
        'description': '银行卡支付'
    }, {
        'payMethodId': 6,
        'payMethodName': '支付宝付款',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    },{
        'payMethodId': 7,
        'payMethodName': '润和付钱包',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '邱爽',
        'lastUpdateDate': '2016-8-2',
        'description': '润和付钱包余额付款'
    }, {
        'payMethodId': 8,
        'payMethodName': '银行卡支付',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '许亮亮',
        'lastUpdateDate': '2016-8-2',
        'description': '银行卡支付'
    }, {
        'payMethodId': 9,
        'payMethodName': '支付宝付款',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    },{
        'payMethodId': 10,
        'payMethodName': '支付宝付款1111',
        'recomLervel':'01',
        'createDate': '2016-8-1',
        'createPerson': '张泽熊',
        'lastUpdateDate': '2016-8-2',
        'description': '第三方支付-使用支付宝付款'
    }]
}
}
};

var SAVEPAYMODE = {};
var UPDATEPAYMODE = {};
var PAYMENTMETHODDEL = {'payMethodId': 10};
