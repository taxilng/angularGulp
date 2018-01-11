'use strict';
var fundConstant = require('./enum/fund.constant');
var fundManagerModal = {
    //panel
    formPanelOptions: {
        title: '基金经理基本信息',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

    jobContentPanel:{
        title: '基金经理工作内容',
        hasIcon: false,
        hasLine: true,
        panelClass: 'addform-panel'
    },

	//基金经理form
    managerForm: [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'partyName',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'gender',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'educationBackground',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'corporateName',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: /*[{
            key: 'partyFromDate',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]*/[{
                'type': 'label',
                'title': '开始日期',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }, {
                'key': 'partyFromDate',
                'required': true,
                'divClass': 'col-lg-8 col-md-8 col-sm-8 mb-15',
                'opened': false,
                'dateOptions': {
                    'formatYear': 'yy',
                    'minDate': new Date(),
                    'startingDay': 1
                },
                onClick: function($event, form) {
                    form.opened = true;
                }
            }]
    }/*,{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'jobContent',
            'divClass': 'col-lg-8 col-md-8 col-sm-8',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
        }]
    }*/],
    //基金经理schema
    managerSchema: {
        'type': 'object',
        'properties': {
            'partyName': {
                'title': '姓名',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':20
            },
            'gender': {
                'title': '性别',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.genderOptions
            },
            'educationBackground': {
                'title': '学历',
                'type': 'string',
                'format': 'hSelect',
                'titleMap': fundConstant.educationBackgroundOptions
            },
            'corporateName': {
                'title': '公司名称',
                'type': 'string',
                'format': 'hDefault',
                'maxLength':50
            },
            'partyFromDate': {
                'title': '开始日期',
                'type': 'string',
                'format': 'minDatePicker'
            },
            'jobContent': {
                'title': '工作内容',
                'type': 'string',
                'format': 'hDefault'
            }
        },
        required:['partyName','gender','educationBackground','corporateName','partyFromDate','jobContent']
    }

};

module.exports = fundManagerModal;
