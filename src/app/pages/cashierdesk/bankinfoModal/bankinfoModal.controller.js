'use strict';

var _ = require('lodash');

module.exports = function($scope, params, toastr, modalService, bankinfoService, BankInfoModalConstant, ValidationService, Upload, fileReader, cardtypeConstant, supplierService, $q) {
    var vm = this;
    vm.model = {
        cardType: ''
    };
    vm.form = [];
    vm.schema = {};
    vm.page = {};
    vm.save = save;
    vm.savebankinfo = bankinfoService.saveBankInfo;
    vm.bankInfoRequest = bankInfoRequest;
    vm.dismissModal = dismissModal;
    vm.update = update;
    vm.updateBankInfo = bankinfoService.updateBankInfo;
    vm.queryBankList = queryBankList;
    vm.checkAdded = checkAdded;
    var isAdd = true;
    var isUploadFlag = false;
    //初始化数据
    init();

    function init() {
        //初始化表单
        vm.formPanelOptions = BankInfoModalConstant.formPanelOptions;
        vm.schema = BankInfoModalConstant.investSchema;
        vm.form = BankInfoModalConstant.investFormOptions;
        vm.cardtypeList = cardtypeConstant;
        vm.queryBankList();
        if (params.bankId) {
            //初始化数据
            isAdd = false;

            vm.model = angular.copy(params);
            vm.model.singleDayTradeCountLimit = Number(vm.model.singleDayTradeCountLimit);
            vm.model.singleMonthTradeLimit = Number(vm.model.singleMonthTradeLimit);
            // vm.model.singleMonthMoneyLimit = Number(vm.model.singleMonthMoneyLimit);
            if (params.bankIcon) {
                vm.model.upimageSrc = window.DOWNLOAD_IMAGELOG_URL + window.DOWNLOAD_IMAGELOG_PATH + params.bankIcon + '?param=' + Math.random(100);
                vm.fileName = params.bankIcon;
            }

        }
    }

    $scope.getFile = function(uploadId, files) {
        if (files) {
            vm.model.files = files;
            var fileIn = files;
            vm.model.files = files;
            var fileType = fileIn.name.substring(fileIn.name.lastIndexOf('.') + 1, fileIn.name.length); //类型
            if (_.indexOf(['PNG', 'JPEG', 'JPG', 'png', 'jpeg', 'jpg'], fileType) === -1) {
                toastr.warning('上传必须是图片类型');
                return false;
            }
            if (fileIn.size > 2 * 1024 * 1024) {
                toastr.warning('图片不能超过2M');
                return;
            }

            vm.fileName = fileIn.name;

        }
        fileReader.readAsDataURL(files, $scope).then(function(result) {
            if (uploadId === 'uploadImg') {
                isUploadFlag = true;
                vm.model.upimageSrc = result;
            }
        });
    }

    //确认
    function autoReceiveSure(ngForm, imageName) {

        vm.model.bankIcon = imageName;
        var tempBankInfo = angular.copy(vm.model);
        tempBankInfo.singleDayMoneyLimit = ValidationService.toStdAmount(tempBankInfo.singleDayMoneyLimit) + '';
        tempBankInfo.singleMonthMoneyLimit = ValidationService.toStdAmount(tempBankInfo.singleMonthMoneyLimit) + '';
        tempBankInfo.singleLimit = ValidationService.toStdAmount(tempBankInfo.singleLimit) + '';

        delete tempBankInfo.files;
        delete tempBankInfo.upimageSrc;

        if (isAdd) {
            save(tempBankInfo);
        } else {
            update(tempBankInfo);
        }

    }

    /**
     * [checkAdded [检查银行是否已存在]
     * @param  {[object]} params [bankName='南京银行',cardType='01'] [description]
     * @return {[type]}        [description]
     */
    function checkAdded(params) {
        var defer = $q.defer();
        var params = {
            cardType:params.cardType,
            bankName: params.bankName,
            pageSize: '999',
            startIndex: '1'
        };
        var promise = bankinfoService.searchBankInfo(params);
        promise.then(function(data) {
            if (data.bankInfoList && data.bankInfoList.length > 0) {
                toastr.warning('该银行名称已存在');
                defer.resolve(true);
            } else {
                defer.resolve(false);
            }
        }).catch(function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    $scope.$watch('vm.model.bankName', function(newValue) {
        if (newValue && newValue.length > 2) {
            if (!vm.bankList) {
                return;
            }
            var bank = _.find(vm.bankList, function(item) {
                return item.partyName === newValue;
            });
            if (bank) {
                vm.model.bankId = bank.partyId;
            } else {
                vm.model.bankId = '';
            }
        }
    });

    function queryBankList() {
        var params = {
            startIndex: '1',
            pageSize: '999'
        };
        supplierService.queryBankNameList().then(function(data) {
            vm.bankList = data.partyNameList;
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    // 提交
    function bankInfoRequest(ngForm) {

        if (!checkInput(vm.model, ngForm)) {
            return;
        }

        if (isUploadFlag) {
            // 选择了文件
            fileUploudFun(ngForm);
        } else {
            // 没有选择文件
            autoReceiveSure(ngForm, vm.fileName);
        }


    }

    // 文件上传
    function fileUploudFun(ngForm, imageName) {
        var imageName = 'icon-' + vm.model.bankId + '.' + vm.fileName.split(".")[1];
        Upload.upload({
            url: window.ROOT_URL + window.UPLOAD_IMAGELOG_URL,
            data: {
                file: vm.model.files,
                imageName: imageName
            }
        }).then(function(resp) {
            if (resp.status == "200") {
                autoReceiveSure(ngForm, imageName);
            }
        }, function(resp) {
            console.log('Error status: ' + resp.status);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            if (evt.config.data.file) {
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            }
        });
    }

    //取消
    function dismissModal() {
        var modalId = modalService.getLastModalId();
        modalService.dismissModal(modalId);
    }


    function save(params) {
        vm.checkAdded(params).then(function(data) {
            if (!data) {
                vm.savebankinfo(params).then(function(result) {
                    toastr.success('新增银行信息成功');
                    closeModal();
                }).catch(function(err) {
                    // dismissModal();
                    toastr.error(err.message);
                });
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    function update(params) {
        vm.updateBankInfo(params).then(function(result) {
            toastr.success('修改银行信息成功');
            closeModal();
        }).catch(function(err) {
            // dismissModal();
            toastr.error(err.message);
        });
    }

    function closeModal(value) {
        var modalId = modalService.getLastModalId();
        modalService.closeModal(modalId, value);
    }


    function checkInput(params, ngForm) {
        ValidationService.validate(ngForm);
        if (ValidationService.isEmpty(params.bankName)) {
            toastr.warning('请输入银行名称');
            return false;
        } else {
            if (ValidationService.containSpecial(params.bankName)) {
                toastr.warning('银行名称不能包含特殊符号');
                return false;
            } else {
                var bank = _.find(vm.bankList, function(item) {
                    return item.partyName === params.bankName;
                });
                if (!bank) {
                    toastr.warning('请输入正确的银行名称');
                    return false;
                }
            }

        }
        if (ValidationService.isEmpty(params.bankId)) {
            toastr.warning('请输入银行行号');
            return false;
        } else {
            if (!ValidationService.isInteger(params.bankId)) {
                toastr.warning('银行行号为数字');
                return false;
            }
        }

        if (ValidationService.isEmpty(params.cardType)) {
            toastr.warning('请选择卡种');
            return false;
        }
        if (!params.singleLimit) {
            toastr.warning('请输入单笔限额');
            return false;
        } else {
            if (!ValidationService.isMoney(ValidationService.toStdAmount(params.singleLimit), 9)) {
                toastr.warning('单笔限额为9位以内的整数或小数');
                return false;
            }
        }
        if (!params.singleDayMoneyLimit) {
            toastr.warning('请输入单日限额');
            return false;
        } else {
            if (!ValidationService.isMoney(ValidationService.toStdAmount(params.singleDayMoneyLimit), 9)) {
                toastr.warning('单日限额为9位以内的整数或小数');
                return false;
            }
        }
        if (!params.singleDayTradeCountLimit) {
            toastr.warning('请输入单日限次');
            return false;
        } else {
            if (!ValidationService.isInteger(params.singleDayTradeCountLimit)) {
                toastr.warning('单日限次为整数');
                return false;
            }
        }
        if (!params.singleMonthMoneyLimit) {
            toastr.warning('请输入单月限额');
            return false;
        } else {
            if (!ValidationService.isMoney(ValidationService.toStdAmount(params.singleMonthMoneyLimit),9)) {
                toastr.warning('单月限额为9位以内的整数或小数');
                return false;
            }
        }

        if (!params.singleMonthTradeLimit) {
            toastr.warning('请输入单月限次');
            return false;
        }

        if (ValidationService.bigSmalCompare(ValidationService.toStdAmount(params.singleLimit), ValidationService.toStdAmount(params.singleDayMoneyLimit))) {
            toastr.warning('单日限额不能小于单笔限额');
            return false;
        }

        if (ValidationService.bigSmalCompare(ValidationService.toStdAmount(params.singleLimit), ValidationService.toStdAmount(params.singleMonthMoneyLimit))) {
            toastr.warning('单月限额不能小于单笔限额');
            return false;
        }

        if (ValidationService.bigSmalCompare(ValidationService.toStdAmount(params.singleDayMoneyLimit), ValidationService.toStdAmount(params.singleMonthMoneyLimit))) {
            toastr.warning('单月限额不能小于单日限额');
            return false;
        }

        if (ValidationService.bigSmalCompare(params.singleDayTradeCountLimit.toString(), params.singleMonthTradeLimit.toString())) {
            toastr.warning('单月限次不能小于单日限次');
            return false;
        }

        if (!vm.fileName) {
            toastr.warning('请上传银行logo');
            return false;
        }
        return true;
    }

};
