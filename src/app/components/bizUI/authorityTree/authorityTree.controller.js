'use strict';

/**
 * @memberof retailBank
 * @ngdoc controller
 * @name OrganizationTreeController
 * @param  {service} AchievementService 业绩服务
 * @param  {service} TreeService     cfo-tree树组件服务
 * @description
 * 机构树控制器,选中某个节点通过broadcast出OrgTreeSelected
 */
module.exports = function AuthorityTreeController($rootScope, $scope, $q, EventBusService) {
    var vm = this;

    /**
     * 初始化
     * @memberof OrganizationTreeController
     * @function init
     * @description 初始化
     */
    vm.showTree = showTree;//展示数


    showTree(vm.nodeData);

    function showTree(nodes) {
        //权限树所需要的参数配置
        vm.treeOptions = {
            treeName: 'authorTree',
            dragable: false,
            data: nodes,
            //contextMenu: false,
            event: {
                beforeDrop: function() {
                    console.log('拖动之后');
                },
                dragStart: function() {
                    console.log('拖动之前');
                },
                dragMove: function() {
                    console.log('aaa');
                },
                selected: function(_this) {
                    console.log(_this);
                }
            },
            toggle: function(nodeData) {
                //获取子树节点
                //return querySubAuthorTree(nodeData.id);
                var defered = $q.defer();
                defered.resolve(nodeData);
                // querySubAuthorTree(nodeData.id).then(function(tree) {
                //     return defered.resolve(tree.authCatlogListInfo);
                // });
                return defered.promise;
            },
            addNode: function() {
                console.log('新增节点');
            },
            modifyNode: function(){
                console.log('修改节点');
            },
            removeNode: function(){
                console.log('删除节点');
            },
            selectNode: function(nodeData) {
                //选中节点触发的事件$on接收
                console.log(nodeData);
                //$rootScope.$broadcast('AuthorTreeSelected', nodeData);
                EventBusService.publish('authorTree', 'selected', nodeData);
            },
            collapse: true,
            checkboxShow: true
        };

        //vm.treeOptions.treeData = nodes;

    }

    $scope.$watch('vm.nodeData',function(){
        showTree(vm.nodeData);
        vm.treeOptions.treeData = vm.nodeData;
    });

};
