'use strict';
var userStatusConstant = require('../../../../constant/authorityManagement/enum/userStatus.constant');

module.exports = function(ModalService, $scope, toastr, AuthorityManagementService, titleMapFilterFilter, row) {
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
            'userName': row.entity.userName,
            'employeeId': row.entity.employeeId,
            'mobile': row.entity.mobile,
            'address': row.entity.address,
            'email': row.entity.email,
            'userStatus': titleMapFilterFilter(row.entity.userStatus,userStatusConstant),
            'orgName': row.entity.orgName
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
                'userName': {
                    'title': '柜员名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'employeeId': {
                    'title': '柜员编号',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'mobile': {
                    'title': '手机号',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'address': {
                    'title': '地址',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'email': {
                    'title': '邮件',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'userStatus': {
                    'title': '状态',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'orgName': {
                    'title': '所属机构',
                    'type': 'string',
                    'format': 'hLabel'
                }
            }
        };
        vm.detailForm = [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'userName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'employeeId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'mobile',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'address',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'email',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'userStatus',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'orgName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }];
        
    }
};
