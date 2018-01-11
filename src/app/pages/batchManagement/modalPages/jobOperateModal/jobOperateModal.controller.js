'use strict';

module.exports = function(ModalService, toastr, params, batchManagementService) {
    var vm = this;
    vm.init = init;
    vm.model = {};
    init();

    function init() {
        vm.model = angular.extend({},params);
        vm.panelBanseInfoOptions = {
            title: '',
            hasIcon: false,
            hasLine: true,
            panelClass: 'addform-panel'
        };

        vm.investSchema = {
            'type': 'object',
            'properties': {
                'message': {
                    'title': '操作原因',
                    'type': 'string',
                    'format': 'hTextarea'
                }
            }
        };
        vm.investFormOptions = [{
            type: 'section',
            htmlClass: 'row',
            items: [{
                type: 'section',
                htmlClass: 'row',
                items: [{
                    'key': 'message',
                    'divClass': 'col-lg-9 col-md-9 col-sm-9',
                    'labelHtmlClass': 'col-lg-2 col-md-2 col-sm-2',
                    'maxLength': 200,
                }]
            }]
        }];
        vm.autoReceiveSure = autoReceiveSure;

        vm.dismissModal = dismissModal;

        vm.closeModal = closeModal;

        function autoReceiveSure() {
            var promise;
            if (vm.model.opr=== 'suspendTask') {
                promise = batchManagementService.suspendTask(vm.model);
            } else if (vm.model.opr === 'continueTask') {
                promise = batchManagementService.continueTask(vm.model);
            } else if (vm.model.opr === 'skipFailStep') {
                promise = batchManagementService.skipFailStep(vm.model);
            } else {
                toastr.warning('没有操作类型');
            }
            promise.then(function(data){
                console.log(data);
                vm.closeModal();
            }).catch(function(err){
                toastr.error(err.message);
            });
        }


        function closeModal(value) {
            var modalId = ModalService.getLastModalId();
            ModalService.closeModal(modalId, value);
        }

        function dismissModal() {
            var modalId = ModalService.getLastModalId();
            ModalService.dismissModal(modalId);
        }

    }
};
