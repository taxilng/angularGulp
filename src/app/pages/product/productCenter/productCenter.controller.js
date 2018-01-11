'use strict';

module.exports = function(toastr, MenuTreeService,EventBusService,$state) {
    var vm = this;
    // vm.formPanelOptions = {
    //     title: '理财产品信息管理查询',
    //     hasIcon: false,
    //     panelClass: 'content-panel'
    // };
    init();
    function init(){
    	//查询树
    	 // MenuTreeService.queryTreeData({
      //       prodMenuCode: 'RootMenu'
      //   }).then(function(data) {
      //       vm.tree = data.prodMenuListInfo;//菜单树
      //   });
    }


    // EventBusService.subscribe('menuTree','selected',function(event,value){
    //     vm.model = {};
    //     vm.hasLeaf = value.hasLeaf;
    //     vm.title = value.title;
    //     vm.formPanelOptions.title = value.title + '查询';
    //     vm.prodMenuCode = value.id;
    //     switch (vm.prodMenuCode) {
    //         case 'P01':
    //             $state.go('product.productInfoManage');//智能存款
    //             break;
    //         case 'P02':
    //             $state.go('product.financingProductManage');//理财产品
    //             break;
    //         case 'P03':
    //             $state.go('product.fundProductManage');//基金理财
    //     }
    // });
};
