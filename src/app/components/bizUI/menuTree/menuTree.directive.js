'use strict';

var menuTreeHtml = require('./menuTree.html');
var addTreeNode = require('../../../pages/authorityManagement/modalPages/addTreeNode');
var menuTreeDirective = function($rootScope, $ngBootbox, $q,MenuTreeService, TreeService, EventBusService, ModalService,toastr,AddTreeNodeConstant, AuthorityManagementService) {
    var directive = {
        restrict: 'AE',
        template: menuTreeHtml,
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr) {
        var params = {
            id: 'prodMenuCode',                         // 目录节点码
            title: 'prodMenuName',                      // 目录节点码名称
            parentID: 'prodMenuParentId',               // 目录父节点ID
            hasLeaf: 'prodMenuLevel',                   // 是否有子节点: '1' 是  '0' 否
            prodMenuUrl: 'prodMenuUrl',                 // 菜单URL
            prodMenuChannelNo: 'prodMenuChannelNo',     // 渠道号
            menuDesc: 'menuDesc',                       // 菜单描述
            menuStatus: 'menuStatus',                   // 菜单状态
            displayOrder: 'displayOrder',               // 菜单序号
            prodMenuLevel:'prodMenuLevel',              // 菜单层级
            menuId:'menuId',                            // 菜单主键
            menuParenName:'menuParenName',              // 菜单父级名称
            menuParenSeriNo:'menuParenSeriNo'           // 菜单父级ID
        };

        scope.treePanelOptions = {
            title: '菜单目录',
            hasIcon: true,
            iconClass:'icon-menupanel',
            panelClass: 'menutree-panel'
        };

        attr.$observe('tree', function() {
            if (attr.tree) {
                var tree = scope.$eval(attr.tree);
                if (angular.isObject(tree)) {
                    var nodes = TreeService.convertToTreeNodes(tree, params);
                    // var newNodes = TreeService.generateTreeNodes(nodes, '');
                    TreeService.setTreeNodes(nodes, 'menuTreeNode');

                    scope.treeOptions = {
                        treeName: 'menuTreeNode',
                        dragable: false,
                        data: nodes,
                        event: {
                            beforeDrop: function() {},
                            dragStart: function() {},
                            dragMove: function() {},
                            selected: function() {}
                        },
                        toggle: function(nodeData) {
                            var defered = $q.defer();
                            defered.resolve(nodeData);
                            return defered.promise;
                        },
                        addNode: function() {},
                        selectNode: function(nodeData) {
                            EventBusService.publish('menuTreeNode', 'selected', nodeData);
                        },
                        titleClick: false,
                        titleClickEvents: [{
                            name: '',
                            clickFunc: function() {}
                        }],
                        rightClick: true,
                        rightClickEvents: [{
                            name: '增加菜单',
                            clickFunc: function(node) {
                                node.flag = 1;
                                var currentNode = TreeService.getCurrentNode();
                                var modalInstance = ModalService.showModal({
                                    modalId: 'addTreeNode',
                                    modalTitle: '新增菜单目录节点',
                                    template: addTreeNode.html,
                                    controller: ['ModalService', 'TreeService', 'node', 'toastr', '$ngBootbox', 'AddTreeNodeConstant', 'AuthorityManagementService', 'MenuTreeService', 'ValidationService',addTreeNode.controller],
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
                                    TreeService.setCurrentNode(currentNode);

                                    // return queryProdTree(node);
                                }, function() {});
                            }
                        }, {
                            name: '修改菜单',
                            clickFunc: function(node) {
                                node.flag = 2;
                                var currentNode = TreeService.getCurrentNode();
                                var modalInstance = ModalService.showModal({
                                    modalId: 'modifyTreeNode',
                                    modalTitle: '修改菜单目录节点',
                                    template: addTreeNode.html,
                                    controller: ['ModalService', 'TreeService', 'node', 'toastr', '$ngBootbox', 'AddTreeNodeConstant', 'AuthorityManagementService', 'MenuTreeService','ValidationService',addTreeNode.controller],
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
                                    TreeService.setCurrentNode(currentNode);

                                    // return queryProdTree(node);
                                }, function() {});
                            }
                        }, {
                            name: '冻结菜单',
                            clickFunc: function(node) {
                                if (node.nodes.length > 0) {
                                    toastr.warning(node.title+'下有子菜单，无法冻结该节点');
                                } else {
                                    $ngBootbox.confirm('确定要冻结该'+node.title+'么？').then(function() {
                                        var promise = AuthorityManagementService.menuDelete({
                                            menuId: node.menuId
                                        });
                                        promise.then(function() {
                                            toastr.success('冻结成功');
                                        }).catch(function(error){
                                            toastr.error(error.message);
                                        });
                                    }, function() {});

                                }
                            }
                        }, {
                            name: '解冻菜单',
                            clickFunc: function(node) {
                                if (node.menuStatus != '0') {
                                    toastr.warning(node.title+'菜单非冻结状态,无需解冻');
                                    return;
                                }

                                $ngBootbox.confirm('确定要解冻该'+node.title+'么？').then(function() {
                                    var promise = AuthorityManagementService.menuUpdate({
                                        menuId: node.menuId,
                                        menuStatus:'1'
                                    });
                                    promise.then(function() {
                                        toastr.success('解冻成功');
                                    }).catch(function(error){
                                        toastr.error(error.message);
                                    });
                                }, function() {});

                            }
                        }],
                        collapse: true,
                        checkboxShow: false
                    };
                }
            }
        }, true);


        /**
         * [queryProdTree 获取树节点详细数据]
         * @param  {[object]} nodeData [树节点数据]
         */
        function queryProdTree(nodeData) {
            var params = {
                prodMenuCode: nodeData.id
            };
            var defer = $q.defer();
            ProductService.queryTreeData(params).then(function(data) {
                defer.resolve(data.prodMenusListInfo);

            }).catch(function(error) {
                toastr.error(error.message);
            });
            return defer.promise;
        }
    }
};

module.exports = menuTreeDirective;
