'use strict';

module.exports = function($scope, params, toastr, modalService, productinfoService) {
    var vm = this;
    vm.model = {};
    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;
    var isAdd = true;

    init();

    function init() {
        if (params.accountNo) {
            isAdd = false;
            vm.model.accountNo = params.accountNo;
            vm.model.sAmount = params.sAmount;
        }
    }

    function autoReceiveSure(params) {
        if (isAdd) {
            save(params);
        } else {
            update(params);
        }
    }

    function dismissModal() {
        closeModal();
    }

    function save(params) {
        productinfoService.save(params).then(function(result) {
            toastr.success('新增信息成功');
            dismissModal();
        }).catch(function(err) {
            dismissModal();
            toastr.error(err.message);
        });
    }

    function update(params) {
        var newParams = angular.extend({}, vm.model, params);
        productinfoService.update(newParams).then(function(result) {
            toastr.success('修改信息成功');
            closeModal();
        }).catch(function(err) {
            dismissModal();
            toastr.error(err.message);
        });
    }

    function closeModal(value) {
        var modalId = modalService.getLastModalId();
        modalService.closeModal(modalId, value);
    }

    vm.formPanelOptions = {
        title: '智能存款信息管理',
        hasIcon: false,
        hasLine:true,
        panelClass: 'addform-panel'
    },

    vm.form = [{
        type:'section',
        htmlClass:'row',
        items: [
        {
            type:'section',
            htmlClass:'col-lg-6 col-md-6 col-sm-6',
            items:[{
                'key':'accountNo',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
        },{
            type:'section',
            htmlClass:'col-lg-6 col-md-6 col-sm-6',
            items:[{
                'key':'sAmount',
                'divClass': 'col-lg-7 col-md-7 col-sm-7',
                'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
            }]
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
