'use strict';

module.exports = function() {
    var vm = this;
    vm.init = init;
    vm.detailSchema = {
        'type': 'object',
        'properties': {
            'contactSubject': {
                'title': '联络主题',
                'type': 'string',
                'format': 'hLabel'
            },
            'planContactTime': {
                'title': '计划联络时间',
                'type': 'string',
                'format': 'hLabel'
            },
            'actualContactTime': {
                'title': '实际联络时间',
                'type': 'string',
                'format': 'hLabel'
            },
            'contactMethod': {
                'title': '联络方式',
                'type': 'string',
                'format': 'hLabel'
            },
            'recommendProd': {
                'title': '客户关注产品',
                'type': 'string',
                'format': 'hLabel'
            },
            'marketContent': {
                'title': '营销内容',
                'type': 'string',
                'format': 'hLabel'
            },
            'contactPerson': {
                'title': '联络人',
                'type': 'string',
                'format': 'hLabel'
            },
            'result': {
                'title': '联络结果',
                'type': 'string',
                'format': 'hLabel'
            },
            'contactRecordDetailDesc': {
                'title': '联络记录描述',
                'type': 'string',
                'format': 'hLabel'
            },
            'contactRecordType': {
                'title': '联络报告类型',
                'type': 'string',
                'format': 'hLabel'
            }
        }
    };
    vm.detailForm = [{
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'contactSubject',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'contactRecordType',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'planContactTime',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'actualContactTime',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'contactMethod',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'marketContent',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'contactPerson',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'recommendProd',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
        }]
    }, {
        type: 'section',
        htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'result',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }, {
        type: 'section',
         htmlClass: 'col-lg-6 col-md-6 col-sm-6',
        items: [{
            key: 'contactRecordDetailDesc',
            labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
            divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
        }]
    }];
    vm.detailModel={
        'contactSubject':'联络主题数据',
        'planContactTime':'计划联系时间',
        'actualContactTime':'实际联络时间',
        'contactMethod':'联络方式',
        'recommendProd':'推荐产品',
        'marketContent':'市场内容',
        'contactPerson':'联系人',
        'result':'结果',
        'contactRecordDetailDesc':'详情描述',
        'contactRecordType':'记录类型'
    };
    function init() {

    }
};
