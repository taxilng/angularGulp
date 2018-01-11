'use strict';
var prodMenuLevelConstant = require('../../../../constant/authorityManagement/enum/menuLevel.constant');
var channelNoConstant = require('../../../../constant/authorityManagement/enum/channelNo.constant');
var menuStatusConstant = require('../../../../constant/authorityManagement/enum/menuStatus.constant');

module.exports = function(ModalService, row, $scope, toastr, titleMapFilterFilter) {
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
            'prodMenuCode': row.entity.prodMenuCode,
            'prodMenuName': row.entity.prodMenuName,
            'prodMenuLevel': titleMapFilterFilter(row.entity.prodMenuLevel,prodMenuLevelConstant),
            'prodMenuChannelNo': titleMapFilterFilter(row.entity.prodMenuChannelNo,channelNoConstant.selectChannelNo),
            'prodMenuUrl': row.entity.prodMenuUrl,
            'prodMenuParentId': row.entity.prodMenuParentId,
            'menuDesc': row.entity.menuDesc,
            'menuStatus': titleMapFilterFilter(row.entity.menuStatus,menuStatusConstant.selectStatus),
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
                'prodMenuName': {
                    'title': '菜单名称',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'prodMenuCode': {
                    'title': '菜单编号',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'prodMenuUrl': {
                    'title': '菜单URL',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'prodMenuLevel': {
                    'title': '菜单层级',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'menuDesc': {
                    'title': '菜单描述',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'prodMenuParentId': {
                    'title': '上级菜单ID',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'menuStatus': {
                    'title': '菜单状态',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'prodMenuChannelNo': {
                    'title': '所属系统',
                    'type': 'string',
                    'format': 'hLabel'
                },
                'displayOrder': {
                    'title': '菜单序号',
                    'type': 'string',
                    'format': 'hLabel'
                },
            }
        };
        vm.detailForm = [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'prodMenuName',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'prodMenuCode',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'prodMenuUrl',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'prodMenuLevel',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'prodMenuParentId',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label ',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'menuStatus',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        },{
            type: 'section',
             htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'displayOrder',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-last',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'prodMenuChannelNo',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-right-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property-last'
            }]
        }/*, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                key: 'menuDesc',
                labelHtmlClass: 'col-lg-6 col-md-6 col-sm-6 detail-label',
                divClass: 'col-lg-6 col-md-6 col-sm-6 detail-property'
            }]
        } */];
        
    }
};
