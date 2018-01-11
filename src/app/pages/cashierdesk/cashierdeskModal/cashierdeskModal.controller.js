'use strict';
var regularExpressionConstant = require('../../../constant/regularExpression/regularExpression.constant');
module.exports = function(
    $scope, params, toastr, ModalService, CashierdeskService, $timeout, ValidationService, $q) {
    var vm = this;
    var isAdd = true;
    vm.model = {};
    vm.form = [];
    vm.schema = {};
    vm.page = {};

    paymodeInit();

    function paymodeInit() {
        if (params.createDate) {
            delete params.createDate;
        }
        if (params.createPerson) {
            delete params.createPerson;
        }
        if (params.payMethodId) {
            isAdd = false;
            vm.model = angular.copy(params);
            vm.originalModel = angular.copy(params);
            // vm.model.payMethodId = params.payMethodId;
            // vm.model.payMethodName = params.payMethodName;
            // vm.model.description = params.description;
            // vm.model.methodLabel = params.methodLabel;
            // vm.model.state = params.state;
        }
    }


    var form = [{
            'key': 'payMethodName',
            'divClass': 'col-lg-6 col-md-6 col-sm-6',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            'onKeyup': function($event, form, object) {
                    $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
                    object.ngModel.$setViewValue($event.target.value);
                }
                // 'readonly': true
        }, {
            'key': 'methodLabel',
            'divClass': 'col-lg-6 col-md-6 col-sm-6',
            'fieldHtmlClass': 'col-lg-5 col-md-5 col-sm-5 col-xs-5 select2 none-padding',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4',
            // 'readonly': isAdd ? false : true
        }, {
            'key': 'description',
            'divClass': 'col-lg-6 col-md-6 col-sm-6 l-textarea',
            'labelHtmlClass': 'col-lg-4 col-md-4 col-sm-4'
                // 'readonly': true
        }
        // {
        //     'type': 'fieldset',
        //     'htmlClass': 'text-center',
        //     'items': [{
        //         'htmlClass': 'col-xs-6 text-right btn-margin-r',
        //         'type': 'button',
        //         'style': 'btn-confirm',
        //         'title': '确定',
        //         'onClick': autoReceiveSure
        //     }, {
        //         'htmlClass': 'col-xs-6 text-left',
        //         'type': 'button',
        //         'style': 'btn-default btn-margin-l',
        //         'title': '取消',
        //         'onClick': dismissModal
        //     }]
        // }
    ];

    var schema = {
        'type': 'object',
        'properties': {
            'payMethodName': {
                'title': '支付方式名称',
                'type': 'string',
                'placeholder': '请输入支付方式名称',
                'format': 'hDefault',
                'maxLength': 20,
                'required': true
            },
            'methodLabel': {
                'title': '分类标签',
                'type': 'string',
                'format': 'hSelect',
                'class': 'form-control select2',
                'placeholder': '请选择分类标签',
                'required': true,
                titleMap: [{
                    value: '',
                    name: '--请选择--'
                }, {
                    value: 'QUICK',
                    name: '快捷支付'
                }, {
                    value: 'ACCOUNT',
                    name: '钱包支付'
                }, {
                    value: 'OTHER',
                    name: '第三方支付'
                }]
            },
            // 'mainReceiveEmpNo': {
            //     'title': '支付方式图标',
            //     'type': 'string',
            //     'format': 'hSelect',
            //     'titleMap': custList
            // },
            'description': {
                'title': '描述',
                'type': 'string',
                'format': 'hTextarea',
                'placeholder': '请输入描述内容',
                'maxLength': 200
            }
        },
        required: ['payMethodName', 'methodLabel']
    };
    vm.form = form;
    vm.schema = schema;
    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;
    vm.checkByType = checkByType;

    function autoReceiveSure(ngForm) {
        if (isAdd) {
            savePaymode(ngForm);
        } else {
            updatePaymode(ngForm);
        }
    };

    function closeModal(value) {
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId, value);
    };

    function dismissModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    };

    function toSavePaymode(newParams) {
        CashierdeskService.savePaymode(newParams).then(function(result) {
            toastr.success('新增支付方式成功');
            closeModal();
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    /**
     * 新增支付方式
     * @return {[type]} [description]
     */
    function savePaymode(ngForm) {
        var newParams = angular.extend({}, vm.model, params);
        if (!checkInput(newParams, ngForm)) {
            return;
        }
        if (newParams.methodLabel === 'QUICK' || newParams.methodLabel === 'ACCOUNT') {
            vm.checkByType(newParams.methodLabel).then(function(data) {
                if (!data) {
                    toSavePaymode(newParams);
                } else {
                    toastr.warning('该类型支付方式不允许重复添加');
                }
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            toSavePaymode(newParams);
        }
    }

    function checkByType(methodLabel) {
        var defer = $q.defer();
        var params = {
            createDate: window.moment().add(-3, 'M')['_d'],
            endDate: new Date(),
            methodLabel: methodLabel,
            pageSize: '5',
            startIndex: '1'
        };
        var promise = CashierdeskService.searchPaymodes(params);
        promise.then(function(data) {
            if (data.payMethodList && data.payMethodList.length > 0) {
                defer.resolve(true);
            } else {
                defer.resolve(false);
            }

        }).catch(function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }
    /**
     * 修改支付方式
     * @return {[type]} [description]
     */
    function updatePaymode(ngForm) {
        var params = vm.model;
        if (!checkInput(params, ngForm)) {
            return;
        }
        if (vm.originalModel.methodLabel === 'OTHER' && (params.methodLabel === 'QUICK' || params.methodLabel === 'ACCOUNT')) {
            vm.checkByType(params.methodLabel).then(function(data){
                if (!data) {
                    toUpdatePaymode(params);
                } else {
                    toastr.warning('已存在该类型的支付方式');
                }
            }).catch(function(error){
                console.log(error);
            });
        } else {
            toUpdatePaymode(params);
        }

    }

    function toUpdatePaymode (params) {
        CashierdeskService.updatePaymode(params).then(function() {
            toastr.success('修改支付方式成功');
            console.log('修改主管户接收人成功', params);
            closeModal();
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    function dismissModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    };

    function checkInput(params, ngForm) {
        ValidationService.validate(ngForm);
        if (ValidationService.isEmpty(params.payMethodName)) {
            toastr.warning('请输入支付方式名称');
            return false;
        } else {
            if (ValidationService.containSpecial(params.payMethodName)) {
                toastr.warning('支付方式名称不能包含特殊符号');
                return false;
            }
        }

        if (ValidationService.isEmpty(params.methodLabel)) {
            toastr.warning('请选择分类标签');
            return false;
        }
        return true;
    }
};
