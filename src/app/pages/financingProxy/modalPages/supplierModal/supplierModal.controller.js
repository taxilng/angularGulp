'use strict';
var _ = require('lodash');
module.exports = function($scope, params, toastr, ModalService, supplierService, supplierModalConstant, timeFormatFilterFilter, CONFIG, ValidationService, supplyTypeMapConstant, cooperationStatusConstant, Upload, fileReader, regularExpressionConstant) {
    var vm = this;
    var isAdd = true;
    var isUploadFlag = false;
    vm.model = {
        cooperationStatus: '',
        supplyType: ''
    };
    vm.form = [];
    vm.schema = {};
    vm.saveSupplierInfo = saveSupplierInfo;
    vm.updateSupplierInfo = updateSupplierInfo;
    vm.autoReceiveSure = autoReceiveSure;
    vm.dismissModal = dismissModal;
    vm.closeModal = closeModal;
    vm.changeSupplyType = changeSupplyType;
    vm.cooperationTimeOpen = cooperationTimeOpen;
    vm.supplyFoundTimeOpen = supplyFoundTimeOpen;
    vm.queryBankList = queryBankList;

    init();

    function cooperationTimeOpen() {
        vm.cooperationTime.open = true;
    }

    function supplyFoundTimeOpen() {
        vm.supplyFoundTime.open = true;
    }

    function init() {
        $scope.altInputFormats = ['yyyy-MM-dd'];
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.format = "yyyy-MM-dd";
        vm.supplyFoundTime = {
            open: false
        };
        vm.cooperationTime = {
            open: false
        };
        vm.queryBankList();
        vm.supplyTypeMap = supplyTypeMapConstant;
        vm.cooperationStatusMap = cooperationStatusConstant;
        vm.panelBanseInfoOptions = supplierModalConstant.panelBanseInfoOptions;
        vm.form = supplierModalConstant.investFormOptions;
        vm.schema = supplierModalConstant.investSchema;
        vm.supplierInfoRequest = supplierInfoRequest;
        vm.userName = JSON.parse(sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER)).userName;
        vm.deleteSpecial = deleteSpecial;
        vm.isCorperTimeRequire = false;
        vm.changeCorperRequire = changeCorperRequire;
        if (params.supplyId) {
            isAdd = false;
            vm.model = angular.copy(params);
            vm.model.cardNo = Number(vm.model.cardNo);
            vm.model.cooperationTime = new Date(vm.model.cooperationTime);
            vm.model.supplyFoundTime = new Date(vm.model.supplyFoundTime);
            vm.model.upimageSrc = window.DOWNLOAD_IMAGELOG_URL + window.DOWNLOAD_IMAGELOGO_PATH + params.bankLogo + '?param=' + Math.random(100);
            vm.fileName = params.bankLogo;
        }
    }

    $scope.getFile = function(uploadId, files) {
        if (files) {
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
            if (uploadId === 'uploadLogo') {
                isUploadFlag = true;
                vm.model.upimageSrc = result;
            }
        });
    }

    function changeCorperRequire() {
        if (vm.model.cooperationStatus === '1') {
            vm.isCorperTimeRequire = true;
        } else {
            vm.isCorperTimeRequire = false;
        }
    }
    /**
     * 去掉特殊字符
     * @return {[type]} [description]
     */
    function deleteSpecial($event, modelName) {
        $event.target.value = ($event.target.value).replace(regularExpressionConstant.REG_CONS_CHINESE, '');
        vm.model[modelName] = $event.target.value;
    }

    function supplierInfoRequest(ngForm) {

        if (!checkInput(vm.model, ngForm)) {
            return;
        }

        if (isUploadFlag) {
            //选择过文件
            fileUploudFun(ngForm);
        } else {
            //没有选择文件
            autoReceiveSure(ngForm, vm.fileName);
        }
    }

    function fileUploudFun(ngForm, imageName) {
        if (!vm.model.depositBank) {
            toastr.warning('请先填写账号开户行');
            return;
        }
        var bank = _.find(vm.bankList, function(item) {
            return item.partyName === vm.model.depositBank;
        });

        var imageName = 'logo-' + bank.partyId + '.' + vm.fileName.split(".")[1];
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
            console.log('Error status:' + resp.status);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            if (evt.config.data.file) {
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            }
        });
    }

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

    function changeSupplyType() {

    }

    function autoReceiveSure(ngForm, imageName) {
        if (imageName) {
            vm.model.bankLogo = imageName;
        }

        if (isAdd) {
            saveSupplierInfo(ngForm);
        } else {
            updateSupplierInfo(ngForm);
        }
    };

    function dismissModal() {
        var modalId = ModalService.getLastModalId();
        ModalService.dismissModal(modalId);
    }


    function closeModal(value) {
        var modalId = ModalService.getLastModalId();
        ModalService.closeModal(modalId, value);
    };

    function checkInput(params, ngForm) {
        ValidationService.validate(ngForm);
        if (!params.supplyName) {
            toastr.warning('请输入供应商名称');
            return false;
        } else {
            if (ValidationService.containSpecial(params.supplyName)) {
                toastr.warning('供应商名称不能包含特殊字符');
                return false;
            }
        }
        if (!params.address) {
            toastr.warning('请输入供应商地址');
            return false;
        } else {
            if (ValidationService.containSpecial(params.address)) {
                toastr.warning('供应商地址不能包含特殊字符');
                return false;
            }
        }
        if (!params.legalPersonName) {
            toastr.warning('请输入法人代表');
            return false;
        } else {
            if (ValidationService.containSpecial(params.legalPersonName)) {
                toastr.warning('法人代表不能包含特殊字符');
                return false;
            }
        }
        if (!params.website) {
            toastr.warning('请输入公司网址');
            return false;
        } else {
            if (!ValidationService.checkWebsite(params.website)) {
                toastr.warning('公司网址不是合法的域名');
                return false;
            }
        }

        if (!params.contactNo) {
            toastr.warning('请输入联系方式');
            return false;
        } else {
            //手机/座机号
            if (!ValidationService.validatePhoneNumber(params.contactNo)) {
                toastr.warning('联系方式格式为固话或手机号');
                return false;
            }
        }
        if (!params.supplyScale) {
            toastr.warning('请输入公司规模');
            return false;
        } else {
            if (ValidationService.containSpecial(params.supplyScale)) {
                toastr.warning('公司规模不能包含特殊字符');
                return false;
            }
        }
        if (!params.unifiedSocialCreditCode) {
            toastr.warning('请输入工商行政代码');
            return false;
        } else {
            //工商行政代码必须是18位数字和字母的组合
            if (!ValidationService.validateCode(params.unifiedSocialCreditCode, 18)) {
                toastr.warning('工商行政代码必须是18位数字和字母的组合');
                return false;
            }
        }

        if (!params.supplyType) {
            toastr.warning('请选择公司行业');
            return false;
        }

        if (!params.supplyFoundTime) {
            toastr.warning('请选择成立日期');
            return false;
        }

        if (!params.institutionCode) {
            toastr.warning('请输入机构代码');
            return false;
        } else {
            if (!ValidationService.validateCode(params.institutionCode)) {
                toastr.warning('机构代码必须是数字和字母的组合');
                return false;
            }
        }

        if (!params.cooperationStatus) {
            toastr.warning('请选择合作状态');
            return false;
        }
        if (!params.cardNo) {
            toastr.warning('请输入正确的结算账号');
            return false;
        } else {
            if (!ValidationService.isInteger(params.cardNo)) {
                toastr.warning('结算账号为不超过20位的数字');
                return false;
            }
        }

        if (vm.isCorperTimeRequire && !params.cooperationTime) {
            toastr.warning('请输入合作日期');
            return false;
        }

        if (!params.depositBank) {
            toastr.warning('请输入账号开户行');
            return false;
        } else {
            var bank = _.find(vm.bankList, function(item) {
                return item.partyName === vm.model.depositBank;
            });
            if (!bank) {
                toastr.warning('请输入正确的开户行号');
                return false;
            }
        }

        // if (!params.bankLogo) {
        //     toastr.warning('请上传开户行图标');
        //     return false;
        // }

        return true;
    }

    function saveSupplierInfo(ngForm) {
        var params = angular.copy(vm.model);

        delete params.files;
        delete params.upimageSrc;

        if (!checkInput(params, ngForm)) {
            return;
        }
        params.supplyFoundTime = timeFormatFilterFilter(params.supplyFoundTime, 'YYYY-MM-DD');
        params.cooperationTime = timeFormatFilterFilter(params.cooperationTime, 'YYYY-MM-DD');
        params.cardNo = String(params.cardNo);
        var newParams = angular.extend({
            'userName': vm.userName
        }, params);

        supplierService.addSupplyInfo(newParams).then(function(result) {
            toastr.success('新增供应商成功');
            closeModal();
        }).catch(function(err) {
            dismissModal();
            toastr.error(err.message);
        });
    }

    function updateSupplierInfo(ngForm) {
        var params = angular.copy(vm.model);

        delete params.files;
        delete params.upimageSrc;
        if (!checkInput(params, ngForm)) {
            return;
        }
        params.supplyFoundTime = timeFormatFilterFilter(vm.model.supplyFoundTime, 'YYYY-MM-DD');
        params.cooperationTime = timeFormatFilterFilter(vm.model.cooperationTime, 'YYYY-MM-DD');
        params.cardNo = String(params.cardNo);
        var newParams = angular.extend({
            'userName': vm.userName
        }, params);
        //checkInput
        supplierService.updateSupplyInfo(newParams).then(function(result) {
            toastr.success('修改供应商成功');
            closeModal();
        }).catch(function(err) {
            dismissModal();
            toastr.error(err.message);
        });
    }

};
