'use strict';

module.exports = function() {
    var vm = this;
    vm.formPanelOptions = {
        title: '交易类型信息',
        hasIcon: false,
        hasLine:true,
        panelClass: 'addform-panel'
    };
    vm.gridPanelOptions = {
        title: '交易类型支持的银行卡',
        hasIcon: false,
        hasLine:true,
        panelClass: 'gridform-panel'
    };
};
