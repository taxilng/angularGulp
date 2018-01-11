'use strict';

module.exports = function($scope,params,titleMapFilterFilter) {
    var vm = this;
    vm.model = {};

    vm.genderOptions = [
    {name:'女',value:'0'},
    {name:'男',value:'1'}
    ];
    vm.educationBackgroundOptions = [
    {name:'专科',value:'ASSOCIATE'},
    {name:'本科',value:'UNDERGRADUATE'},
    {name:'硕士',value:'MASTER'},
    {name:'博士',value:'DOCTOR'}
    ];
    //数据初始化
    init();
    function init(){
            vm.model.corporateName = params.corporateName;
            vm.model.educationBackground = titleMapFilterFilter(params.educationBackground,vm.educationBackgroundOptions);
            vm.model.gender = titleMapFilterFilter(params.gender,vm.genderOptions);
            vm.model.graduateInsTitutions = params.graduateInsTitutions;
            vm.model.jobContent = params.jobContent;
            vm.model.partyFromDate = params.partyFromDate;
            vm.model.partyName = params.partyName;
            vm.model.partyId = params.partyId;
    }

   vm.form = [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'partyName',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'gender',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    },{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'educationBackground',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'corporateName',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6  detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'partyFromDate',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }/*, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'jobContent',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }*/];


    vm.schema = {
        'type': 'object',
        'properties': {
            'partyName': {
                'title': '基金经理姓名',
                'type': 'string',
                'format': 'hLabel'
            },
            'gender': {
                'title': '性别',
                'type': 'string',
                'format': 'hLabel'
            },
            'educationBackground': {
                'title': '学历',
                'type': 'string',
                'format': 'hLabel'
            },
            'corporateName': {
                'title': '公司名称',
                'type': 'string',
                'format': 'hLabel'
            },
            'jobContent': {
                'title': '工作内容',
                'type': 'string',
                'format': 'hLabel'
            },
            'partyFromDate': {
                'title': '开始时间',
                'type': 'string',
                'format': 'hLabel'
            }
        }
    };
};
