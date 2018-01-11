'use strict';

var _ = require('lodash');

var treeController = function($scope, treeService) {
    var vm = this;

    vm.selectedNode = {};
    vm.savedNodes = [];
    vm.toggle = toggle; // 触发子节点事件
    vm.select = select; // 选中事件
    vm.treeRemove = treeRemove; // 删除节点方法
    vm.modifySubItem = modifySubItem; // 修改节点方法
    vm.newSubItem = newSubItem; // 新增节点方法
    vm.onNodes = onNodes; // mouseover触发的方法
    vm.saveNodes = saveNodes; // 选中checkbox保存数据
    vm.findParentNode = findParentNode //查找parentNode

    // 展开节点: this is now functional
    function toggle(collapsed) {
        // cancel request if the node turn to collapsed.
        var nodeList = vm.selectedNode.siblings();

        if (nodeList && nodeList.length > 0) {
            nodeList.forEach(function(dt) {
                dt.$modelValue.isSelected = false;
            });
        }
        vm.selectedNode.$modelValue.isSelected = true;

        if (!collapsed) {
            vm.selectedNode.toggle();
            return;
        }

        vm.selectedNode.options.toggle(vm.selectedNode.$modelValue).then(function(data) {
            if (data) {
                if (data.id) {
                    vm.selectedNode.$modelValue = data;
                } else {
                    vm.selectedNode.$modelValue.nodes = treeService.convertToTreeNodes(data); // 树数据的入口
                }
                if (vm.selectedNode.$modelValue['checked']) {
                    _(vm.selectedNode.$modelValue.nodes).forEach(function(node) {
                        // treeService.modifyCheckState(node, true);
                    });
                }
                vm.selectedNode.toggle();
                treeService.unlockSelectedNode();
            }
        });
    }

    // 选中树节点
    function select() {
        // if ($scope.options.data && $scope.options.data.length > 0) {
        //     $scope.options.data.forEach(function(dt) {
        //         dt.isSelected = false;
        //     });
        // }
        var nodeList = vm.selectedNode.siblings();

        if (nodeList && nodeList.length > 0) {
            nodeList.forEach(function(dt) {
                dt.$modelValue.isSelected = false;
            });
        }
        vm.selectedNode.$modelValue.isSelected = true;
        vm.selectedNode.options.selectNode(vm.selectedNode.$modelValue);
    }

    // 选中树节点: this is now functional
    function onNodes(scope) {
        if (!scope.lock) {
            vm.selectedNode = scope;
            treeService.setCurrentNode(vm.selectedNode);
            vm.selectedNode = treeService.getCurrentNode();
        }
    }

    // 创建新的树节点
    function newSubItem() {
        vm.selectedNode.options.toggle(vm.selectedNode.$modelValue).then(function(dataList) {
            vm.selectedNode.$modelValue.nodes = treeService.convertToTreeNodes(dataList);
        });

        var nodeData = vm.selectedNode.$modelValue;
        var dataList = [];
        dataList.push(vm.selectedNode.options.addNode(nodeData));
        vm.selectedNode.expand();
        var node = treeService.convertToTreeNodes(dataList);
        nodeData.nodes.push(node[0]);
    }

    // 修改树节点
    function modifySubItem() {
        var nodeData = vm.selectedNode.$modelValue;
        vm.selectedNode.options.modifyNode(nodeData);
    }

    // 删除树节点
    function treeRemove() {
        var nodeData = vm.selectedNode.$modelValue;
        vm.selectedNode.options.removeNode(nodeData);
        vm.selectedNode.remove();
    }

    // 保存checkbox打勾的节点数据: this is now functional
    function saveNodes(scope, treeName) {
        // treeName is a param form tree.options.
        var node = scope.$modelValue;

        treeService.saveNodes(node, treeName);

        if (node.checked) {
            // checkParent(node);
            if (node.prodMenuLevel === '2') {
                checkParent(node,treeName);
            } else if (node.prodMenuLevel === '3') {
                var parentNode = findParentNode(node.parentID,node.prodMenuLevel);
                checkParent(parentNode,treeName);
                checkParent(node,treeName);
            }
        }
    }

    /**
     * 勾选父级节点
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */
    function checkParent(node,treeName) {
        var parentNode = findParentNode(node.parentID, node.prodMenuLevel);
        if (parentNode && !parentNode.checked) {
            treeService.saveNodes(parentNode, treeName,"checkParent");
        }
    }

    function findParentNode(menuCode, menuLevel) {
        var menuNode;
        if (menuLevel === '2') {
            menuNode = _.find($scope.options.data, function(item, index) {
                return item.menuId === menuCode;
            });
        } else if (menuLevel === '3') {
            _.each($scope.options.data, function(item, index) {
                _.each(item.nodes, function(cItem, cIndex) {
                    if (cItem.menuId === menuCode) {
                        menuNode = cItem;
                    }
                });
            });
        }
        return menuNode;
    }
};

module.exports = treeController;
