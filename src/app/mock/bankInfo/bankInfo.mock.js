'use strict';
var BANKINFO_QUERY = {
    'reply': {
        'resBody': {
            totalCount:20,
            'bankInfoList': [{
                'bankId': 1,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 2,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 3,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 4,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 5,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 6,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 7,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 8,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 9,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 10,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 1,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 2,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 3,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 4,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 5,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 6,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 7,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 8,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }, {
                'bankId': 9,
                'cardType': '01',
                'bankName': '招商银行',
                'bankOrder': '1',
                'singleLimit': '1000',
                'singleDayMoneyLimit': '1000',
                'singleDayTradeCountLimit': '10000',
                'singleMonthMoneyLimit': '10000',
                'singleMonthTradeLimit': '10000',
                'bankIcon': '/usr/local/1.png',
                'description': 'wo',
                'createDate': '2017-08-09',
                'createPerson': 'gu',
                'state': '1'
            }]
        }
    }
};
