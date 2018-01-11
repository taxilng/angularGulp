'use strict';

module.exports = function OrganizationTreeModalController (EventBusService,ModalService,row) {
    var vm = this;
    vm.mutiple = row.mutiple ? 'mutiple' : '';
    if(row.initData) {
        vm.nodeData = row.initData;
    }
    EventBusService.subscribe('distributionOrgTree', 'select', function(event,value) {
        var name = ModalService.getLastModalId();
        EventBusService.unsubscribe('distributionOrgTree', 'select');
        ModalService.closeModal(name,value);
    });
};
