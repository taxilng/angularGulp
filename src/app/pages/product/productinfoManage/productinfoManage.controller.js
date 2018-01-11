'use strict';
var productinfoModal = require('../productinfoModal');
module.exports = function(toastr, ProductinfoService, ModalService,ValidationService) {
    var vm = this;
    vm.addStartDepositAmountInfo = addStartDepositAmountInfo; //增加
    vm.editStartDepositAmountInfo = editStartDepositAmountInfo; //修改
    vm.delStartDepositAmountInfo = delStartDepositAmountInfo; //删除
    vm.search = search;
    vm.searchFunc = ProductinfoService.search;
    vm.delProdInfo = ProductinfoService.del;
    vm.formPanelOptions = {
        title: '查询条件',
        hasIcon: false,
        panelClass: 'form-panel'
    };
    vm.gridPanelOptions = {
        title: '查询内容',
        hasIcon: false,
        panelClass: 'grid-panel'
    };
    init();

    function init() {
        search({});
    }

    function search(params) {
        vm.searchFunc(params).then(function(data) {
            console.log(data);
            vm.productinfoList = data.productinfoList;
        });
    }

    function addStartDepositAmountInfo() {
        var params = {};
        ModalService.showModal({
            modalId: 'productinfoModal',
            template: productinfoModal.html,
            modalTitle: '新增信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'ProductinfoService', productinfoModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {
            vm.search();
        });
    }

    function editStartDepositAmountInfo(params) {
        ModalService.showModal({
            modalId: 'productinfoModal',
            template: productinfoModal.html,
            modalTitle: '修改信息',
            controller: ['$scope', 'params', 'toastr', 'ModalService', 'ProductinfoService', productinfoModal.controller],
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                params: params
            }
        }).result.then(function(data) {

        });
    }

    function delStartDepositAmountInfo(params) {
        console.log(params);
        var newParams = angular.extend({}, vm.model, params);
        vm.delProdInfo(newParams).then(function(result) {
            toastr.success('删除信息成功');
            vm.search();
        });
    }


    //查询数据校验
    function checkInput(params){
        if(params.accountNo){
            if(!ValidationService.isInteger(params.accountNo)){
                toastr.warning('产品编号必须是数字类型');
                return false;
            }
        }
        if(params.sAmount){
            //
        }
        return true;
    }


    vm.options = [
        '序号',
        '智能存款产品账号',
        '起购金额',
        '操作'
    ];


    vm.form = [{
        type: 'section',
        htmlClass: 'row',
        items: [{
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'accountNo',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }, {
            type: 'section',
            htmlClass: 'col-lg-6 col-md-6 col-sm-6',
            items: [{
                'key': 'sAmount',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-3 col-md-3  col-sm-3'
            }]
        }]
    }, {
        'type': 'fieldset',
        'htmlClass': 'text-center',
        'items': [{
            'htmlClass': 'col-xs-6 text-right btn-margin-r mt-10',
            'type': 'button',
            'style': 'btn  btn-sm btn-margin-r btn-blue btn-reset',
            'title': '查询',
            'onClick': vm.search({})
        }, {
            'htmlClass': 'col-xs-6 text-left mt-10',
            'type': 'button',
            'style': 'btn btn-default btn-sm btn-reset',
            'title': '取消',
            'onClick': ''
        }]
    }];


    vm.schema = {
        'type': 'object',
        'properties': {
            'accountNo': {
                'title': '智能存款产品账号',
                'type': 'string',
                'format': 'hDefault'
            },
            'sAmount': {
                'title': '起购金额',
                'type': 'string',
                'format': 'hDefault'
            }
        },
        "required": [
            "accountNo",
            "sAmount"
        ]
    };
};
