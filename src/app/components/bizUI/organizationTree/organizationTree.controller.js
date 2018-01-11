'use strict';

var addOrgNode = require('../../../pages/authorityManagement/modalPages/addOrgNode');

/**
 * @memberof retailBank
 * @ngdoc controller
 * @name OrganizationTreeController
 * @param  {service} AchievementService 业绩服务
 * @param  {service} TreeService     cfo-tree树组件服务
 * @description
 * 机构树控制器,选中某个节点通过broadcast出OrgTreeSelected
 */
module.exports = function OrganizationTreeController($rootScope, $scope, $q, EventBusService, TreeService, ModalService, $ngBootbox, AddOrgNodeConstant, toastr, AuthorityManagementService) {
    var vm = this;

    // 分页参数
    vm.page = {
        startIndex: '1',
        pageSize: '10',
        total: ''
    };

    /**
     * 初始化
     * @memberof OrganizationTreeController
     * @function init
     * @description 初始化
     */
    vm.showTree = showTree;//展示数


    showTree(vm.nodeData);

    function showTree(nodes) {
        console.log(nodes);
        //权限树所需要的参数配置
        vm.treeOptions = {
            treeName: 'organizationTree',
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
                EventBusService.publish('organizationTree', 'selected', nodeData);
            },
            rightClick: true,
            rightClickEvents: [{
                name: '增加机构',
                clickFunc: function(node) {
                    node.flag = 1;
                    var currentNode = TreeService.getCurrentNode();
                    var modalInstance = ModalService.showModal({
                        modalId: 'addOrgNode',
                        modalTitle: '新增机构目录节点',
                        template: addOrgNode.html,
                        controller: ['ModalService', 'TreeService', 'node', 'toastr', '$ngBootbox', 'AddOrgNodeConstant', 'AuthorityManagementService', 'ValidationService',addOrgNode.controller],
                        controllerAs: 'vm',
                        resolve: {
                            node: function() {
                                return node;
                            }
                        },
                        size: 'lg',
                        backdrop: 'static'
                    });
                    modalInstance.result.then(function() {
                        // 机构查询
                        queryOrgData();
                    }, function() {});
                }
            }, {
                name: '修改机构',
                clickFunc: function(node) {
                    node.flag = 2;
                    var currentNode = TreeService.getCurrentNode();
                    var modalInstance = ModalService.showModal({
                        modalId: 'modifyOrgNode',
                        modalTitle: '修改机构目录节点',
                        template: addOrgNode.html,
                        controller: ['ModalService', 'TreeService', 'node', 'toastr', '$ngBootbox', 'AddOrgNodeConstant', 'AuthorityManagementService', 'ValidationService',addOrgNode.controller],
                        controllerAs: 'vm',
                        resolve: {
                            node: function() {
                                return node;
                            }
                        },
                        size: 'lg',
                        backdrop: 'static'
                    });
                    modalInstance.result.then(function() {
                        // 机构查询
                        queryOrgData();
                    }, function() {

                    });
                }
            }, {
                name: '冻结机构',
                clickFunc: function(node) {
                    if (node.nodes.length > 0) {
                        toastr.warning(node.title+'下有子机构，无法冻结该节点');
                    } else {
                        if(node.status === '0'){
                            toastr.warning(node.title+'机构状态为冻结,请解冻后再操作！');
                            return;
                        }
                        $ngBootbox.confirm('确定要冻结该'+node.title+'么？').then(function() {
                            var promise = AuthorityManagementService.orgDelete({
                                orgId: node.orgId
                            });
                            promise.then(function() {
                                // var currentNode = TreeService.getCurrentNode();
                                // currentNode.remove();
                                toastr.success('冻结成功');
                                // // 机构冻结
                                // queryOrgData();
                            }).catch(function(error){
                                toastr.error(error.message);
                            });
                        }, function() {});

                    }
                }
            },{
                name: '解冻机构',
                clickFunc: function(node) {
                    if(node.status === '1'){
                        toastr.warning(node.title+'机构状态为正常,请冻结后再操作！');
                        return;
                    }
                    $ngBootbox.confirm('确定要解冻该'+node.title+'么？').then(function() {
                        var promise = AuthorityManagementService.orgUpdate({
                            orgId: node.orgId,
                            status:'1'
                        });
                        promise.then(function() {
                            // var currentNode = TreeService.getCurrentNode();
                            // currentNode.remove();
                            toastr.success('解冻成功');
                            // // 机构冻结
                            // queryOrgData();
                        }).catch(function(error){
                            toastr.error(error.message);
                        });
                    }, function() {});
                }
            }],
            collapse: true,
            checkboxShow: false
        };

        //vm.treeOptions.treeData = nodes;

    }

    // 机构查询
    function queryOrgData(){
        // 机构查询
        AuthorityManagementService.queryOrgData({
            startIndex: vm.page.startIndex,
            pageSize: vm.page.pageSize
        }).then(function(data) {
            if(data.orgInfoListJsonStr.indexOf("\\")){
                // json串需要反转义
                var orgInfoListJsonStr = angular.fromJson(data.orgInfoListJsonStr.replace("\\",""));
            }else{
                var orgInfoListJsonStr = data.orgInfoListJsonStr;
            }

            var param = {
                id: 'orgSeriNo',                            // 目录节点码
                title: 'orgName',                           // 目录节点码名称
                parentID: 'parentOrgId',                    // 目录父节点ID
                hasLeaf: 'orgLevel',                        // 是否有子节点: '1' 是  '0' 否
                shortName: 'shortName',                     // 机构简称
                orgLevel: 'orgLevel',                       // 机构级别:0总行  1分行 2一级支行 3二级支行
                status: 'status',                           // 机构状态:1正常  0冻结
                contacter: 'contacter',                     // 机构联系
                contacterMobile: 'contacterMobile',         // 机构联系人手机号
                displayOrder: 'displayOrder',               // 排列顺序
                orgDesc: 'orgDesc',                         // 机构描述
                orgId:'orgId',                              // 机构主键
                parentOrgName:'parentOrgName'               // 上级机构名称
            };
            //权限树接口获取的数据字段转换为treenode需要的字段
            var nodes = TreeService.convertToTreeNodes(orgInfoListJsonStr, param);
            vm.nodeData = nodes;
        });
    }

    $scope.$watch('vm.nodeData',function(){
        showTree(vm.nodeData);
        vm.treeOptions.treeData = vm.nodeData;
    });
};
