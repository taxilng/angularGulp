'use strict';

var SEARCHERRORCHECKING = {
    "reply": {
        "returnCode": {
            "domain": null,
            "type": "S",
            "code": "AAAAAA"
        },
        "resBody": {
            "outList": [
                {
                    "amount": "10000.00",
                    "statusId": "来账短款",
                    "transactionId": "2016010100001000003",
                    "adjustId": "BDELETE|IGNORE",
                    "checkingItemId": "2016010100003",
                    "currencyUomId": "人民币",
                    "checkingID": "2016121500045002",
                    "adjustName": "退汇蓝冲|线下处理",
                    "checkingSystemId": "BEPS_S",
                    "transStatus": "成功"
                },
                {
                    "amount": "10000.00",
                    "statusId": "已完成",
                    "transactionId": "2016010100001000002",
                    "adjustId": "",
                    "checkingItemId": "2016010100002",
                    "currencyUomId": "人民币",
                    "checkingID": "2016121500045002",
                    "adjustName": "",
                    "checkingSystemId": "BEPS_S",
                    "transStatus": "成功"
                },
                {
                    "amount": "10000.00",
                    "statusId": "往账长款",
                    "transactionId": "2016010100001000004",
                    "adjustId": "DELETE|IGNORE|NDRECHECK",
                    "checkingItemId": "2016010100004",
                    "currencyUomId": "人民币",
                    "checkingID": "2016121500045002",
                    "adjustName": "单笔贷记冲账|线下处理|次日对账",
                    "checkingSystemId": "BEPS_S",
                    "transStatus": "成功"
                }
            ],
            "totalSize": "3"
        }
    }
};