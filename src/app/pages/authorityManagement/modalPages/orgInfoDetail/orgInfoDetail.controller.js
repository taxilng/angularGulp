'use strict';

var orgStatusConstant = require('../../../../constant/authorityManagement/enum/orgStatus.constant');
var orgLevleConstant = require('../../../../constant/authorityManagement/enum/orgLevle.constant');

module.exports = function(ModalService, row, $scope, toastr,titleMapFilterFilter) {
    var vm = this;
    //------------------------变量声明开始------------------------------//
    // 提交后端model模型
    vm.detailModel = {};
    // 分页参数

    //------------------------变量声明结束------------------------------//
    

    //------------------------方法声明开始------------------------------//
    // 取消(关闭弹出框)
    vm.cancel = cancel;


    //初始化数据
    init();

    //------------------------方法声明结束------------------------------//
    

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        // 初始化表单
        initFrom();

        vm.detailModel={
            'orgName': row.entity.orgName,
            'orgSeriNo': row.entity.orgSeriNo,
            'shortName': row.entity.shortName,
            'orgLevel': titleMapFilterFilter(row.entity.orgLevel,orgLevleConstant),
            'status': titleMapFilterFilter(row.entity.status, orgStatusConstant.orgStatusSelete),
            'parentPrgId': row.entity.parentPrgId,
            'contacter': row.entity.contacter,
            'contacterMobile': row.entity.contacterMobile,
            'displayOrder': row.entity.displayOrder
        };
    }

    // 取消(关闭弹出框)
    function cancel() {
        var name = ModalService.getLastModalId();
        ModalService.closeModal(name, '');
    }


    function initFrom(){
            vm.detailSchema = {
            'type': 'object',
            'properties': {
                'orgName': {
                    'title': '机构名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'orgSeriNo': {
                    'title': '机构编号',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'shortName': {
                    'title': '机构简称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'orgLevel': {
                    'title': '机构级别',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'status': {
                    'title': '机构状态',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'parentPrgId': {
                    'title': '上级机构',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'contacter': {
                    'title': '机构联系人',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'contacterMobile': {
                    'title': '联系人电话',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'displayOrder': {
                    'title': '机构序号',
                    'type': 'string',
                    'format': 'hLabel'
                },
            }
        };
        vm.detailForm = [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'orgName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'orgSeriNo',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'shortName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'orgLevel',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'status',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'parentPrgId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'contacter',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'contacterMobile',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }, {
            type: 'section',
             htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'displayOrder',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }];
        
    }
};
