'use strict';

var _ = require('lodash');

module.exports = function() {
    var service = {
        modifyCheckState: modifyCheckState,             // 改变节点checkbox状态
        modifyCheckStateParent: modifyCheckStateParent, // 改变节父点checkbox状态
        convertToTreeNodes: convertToTreeNodes,         // 将后端数据转化为前端数据(节点list)
        _convertToTreeNode: _convertToTreeNode,         // 将后端数据转化为前端数据(单节点)
        setCurrentNode: setCurrentNode,                 // 设置当前选中的节点
        getCurrentNode: getCurrentNode,                 // 获取当前选中的节点
        setNodes: setNodes,                             // 设置指定节点
        setTreeNodes: setTreeNodes,                     // 保存整棵树的节点数据: not used now.
        getTreeNodes: getTreeNodes,                     // 获取整棵树的节点数据: not used now.
        addNode: addNode,                               // 新增节点: not used now.
        deleteNode: deleteNode,                         // 删除节点: not used now.
        modifyNode: modifyNode,                         // 修改节点: not used now.
        _currentNode: {},                               // 当前选中节点对象
        collapseAll: collapseAll,                       // 闭合所有节点
        expandAll: expandAll,                           // 展开所有节点
        expand: expand,                                 // 展开节点
        saveNodes: saveNodes,                           // 保存勾选的节点
        generateTreeNodes: generateTreeNodes,           // 生成完整树
        getSavedNodes: getSavedNodes,                   // 得到保存的nodes
        clearNodes: clearNodes,                          //清空树节点
        lockSelectedNode:lockSelectedNode,              // 锁定选中的节点
        unlockSelectedNode:unlockSelectedNode           // 取消选中的节点
    };

    var isLock = false;

    /**
     * [lockSelectedNode 锁定选中的节点]
     */
    function lockSelectedNode(){
        isLock=true;
    }

    /**
     * [unlockSelectedNode 取消选中的节点]
     */
    function unlockSelectedNode(){
        isLock=false;
    }

    var tree = [];                  // 树数据集合
    var savedNodes = [];            // 树显示checkbox时,保存勾选的数据
    var TreeName = null;            // 树的名称

    /**
     * [getSavedNodes 获取勾选的节点数据]
     */
    function getSavedNodes() {
        return savedNodes;
    }

    /**
     * [generateTreeNodes 将list数据转化为树结构数据]
     * @param  {[array]}    data     [后端传回的数据]
     * @param  {[string]}   parentID [parentID字串]
     * @return {[array]}    result   [前端生成的树数据]
     */
    function generateTreeNodes(data, parentID) {
        var result = [];
        var temp = [];
        for (var i in data) {
            if (data[i].parentID === parentID) {
                result.push(data[i]);
                temp = generateTreeNodes(data, data[i].id);
                if (temp.length > 0) {
                    data[i].nodes = temp;
                }
            }
        }
        return result;
    }

    /**
     * [modifyCheckState 改变checkbox的状态]
     * @param  {[object]}  node    [树节点数据]
     * @param  {[boolean]} boolean [checkbox状态]
     * @return {[object]}  node    [修改状态后的树节点数据]
     */
    function modifyCheckState(node, boolean) {
        node['checked'] = boolean;

        if (node.nodes && node.nodes.length > 0) {
            _(node.nodes).forEach(function(item) {
                modifyCheckState(item, boolean);
            });
        }

        return node;
    }

    /**
     * [modifyCheckStateParent 改变父checkbox的状态]
     * @param  {[type]} node    [description]
     * @param  {[type]} boolean [description]
     * @return {[type]}         [description]
     */
    function modifyCheckStateParent(node, boolean){
        node['checked'] = boolean;

        return node;
    }


    // 删除去除勾选节点及子几点
    function removeCheckState(node){
        if(node.nodes && node.nodes.length > 0){
            for(var i = 0; i < node.nodes.length; i++){
                var currNode = node.nodes[i];
                removeCheckState(currNode);
            }
        }

        _.remove(savedNodes, function(item) {
            return item.id == node.id;
        });
    }

    /**
     * [saveNodes 保存勾选的节点数据]
     * @param  {[object]} node          [勾选的树的节点]
     * @param  {[string]} treeName      [树的名称]
     * @return {[array]}  savedNodes    [勾选节点数据组成的树组]
     */
    function saveNodes(node, treeName, checkParent) {
        if (TreeName != treeName) {
            TreeName = treeName;
            savedNodes = [];
        }

        // 勾选父节点时 或 回显
        if(checkParent === "checkParent" || checkParent === "Echo"){
            if (node) {
                if (node['checked']) {
                    node = this.modifyCheckStateParent(node, false);
                    removeCheckState(node);
                } else {
                    node = this.modifyCheckStateParent(node, true);
                    savedNodes.push(node);
                }
            }
        
        }else{
            if (node) {
                if (node['checked']) {
                    node = this.modifyCheckState(node, false);
                    removeCheckState(node);
                } else {
                    node = this.modifyCheckState(node, true);
                    savedNodes.push(node);
                }
            }
        }
        

        // console.log(savedNodes);

        return savedNodes;
    }

    /**
     * [clearNodes 清空树]
     * @param  {[type]} treeName [description]
     * @return {[type]}          [description]
     */
    function clearNodes(treeName) {
        savedNodes = [];
    }

    /**
     * [setCurrentNode 设置当前选中的节点]
     * @param {[object]} node [当前选中的节点数据]
     */
    function setCurrentNode(node) {
        this._currentNode = node;
    }

    /**
     * [getCurrentNode 获取当前选中的节点]
     */
    function getCurrentNode() {
        return this._currentNode;
    }

    /**
     * [setNodes 设置指定节点: unstable]
     * @param {[object]}    scope [树的scope数据, 参考expand方法]
     * @param {[array]}     nodes [树的节点数据]
     * @param {[boolean]}   state [checkbox状态]
     */
    function setNodes(scope, nodes, state) {
        if (!_.isBoolean(state)) {
            state = true;
        }

        for (var i = 0; i < nodes.length; i++) {
            this.modifyCheckState(nodes[i], state);
        }

        this.expand(scope, nodes);
    }

    /**
     * [setTreeNodes 生成当前整棵树的节点数据: not used now]
     * @param {[array]}     nodes    [树节点数据]
     * @param {[string]}    treeName [树的名称]
     */
    function setTreeNodes(nodes, treeName) {
        var index = _.findIndex(tree, function(item) {
            return item.key == treeName;
        });

        if (index === -1) {
            tree.push({
                key: treeName,
                nodes: nodes
            });

            return null;
        }

        // 通过id相同覆盖node节点
        _.unionBy(tree[index].nodes, nodes, 'id');
    }

    /**
     * [getTreeNodes 获取整棵树的节点数据: now used now]
     * @param  {[string]} treeName [树的名称]
     */
    function getTreeNodes(treeName) {
        var index = _.findIndex(tree, function(item) {
            return item.key == treeName;
        });

        if (index != -1) {
            return tree[index];
        }

        return null;
    }

    /**
     * [deleteNode 删除节点: not used now]
     */
    function deleteNode() {
        var currentNode = this.getCurrentNode();
        currentNode.remove();
    }

    /**
     * [modifyNode 修改节点数据: not used now]
     * @param  {[object]} newNode [修改的节点对象]
     */
    function modifyNode(newNode) {
        var treeNode = this._convertToTreeNode(newNode);
        var currentNode = this.getCurrentNode();
        var paraList = Object.keys(treeNode);
        paraList.forEach(function(para) {
            currentNode.$modelValue[para] = treeNode[para];
        });
    }

    /**
     * [addNode 增加树节点: not used now]
     * @param {[object]} newNode [新增的节点对象]
     */
    function addNode(newNode) {
        var treeNode = this._convertToTreeNode(newNode);
        var currentNode = this.getCurrentNode();
        currentNode.$modelValue.nodes.push(treeNode);
        currentNode.expand();
    }

    /**
     * [_convertToTreeNode 将后端数据转化为前端数据(单节点)]
     * @param  {[object]}   data    [单节点后端树数据]
     * @return {[object]}           [单节点前端树数据]
     */
    function _convertToTreeNode(data) {
        var param = this.param;
        var paramList = Object.keys(this.param);
        var node = {
            nodes: []
        };

        paramList.forEach(function(item) {
            node[item] = data[param[item]];
        });

        return node;
    }

    /**
     * [convertToTreeNodes 将后端数据转化为前端数据(节点list)]
     * @param  {[array]}    dataList [后端传回的树数据]
     * @param  {[object]}   param    [前后端参数mapping]
     * @return {[array]}             [前端生成的树数据]
     */
    function convertToTreeNodes(dataList, param) {
        if (param) {
            this.param = param;
        }

        var nodes = [];
        if (dataList && dataList.length > 0) {
            var para = this.param;
            var paraList = Object.keys(this.param);

            dataList.forEach(function(data) {
                var node = {
                    nodes: []
                };

                // 循环第二级
                var childrenNode = convertToChildrenTreeNodes(data.children,param);

                paraList.forEach(function(item) {
                    if(item == 'hasLeaf'){
                        node[item] = '1';
                    }else{
                        node[item] = data[para[item]];
                    }

                });

                node.nodes = childrenNode;
                nodes.push(node);
            });
        }

        return nodes;
    }


    /**
     * [convertToChildrenTreeNodes 递归将二级以下的菜单构造树]
     * @param  {[type]} childrenNodeData [后端传回的树数据]
     * @param  {[type]} param            [前后端参数mapping]
     * @return {[type]}                  [前端生成的树数据]
     */
    function convertToChildrenTreeNodes(childrenNodeData, param){

        var childrenNodes = [];
        if(childrenNodeData && childrenNodeData.length > 0){
            var para = param;
            var paraList = Object.keys(param);
            childrenNodeData.forEach(function(childrenItem){
                var childrenNode = {
                    nodes: []
                };
                if(childrenItem.children && childrenItem.children.length > 0){
                    var newchildrenNode = convertToChildrenTreeNodes(childrenItem.children,param);
                }
                paraList.forEach(function(itemTemp) {
                    if(itemTemp == 'hasLeaf'){
                        if(childrenItem.children && childrenItem.children.length>0){
                            childrenNode[itemTemp] = childrenItem.children && childrenItem.children.length>0?'1':'0';
                        }else{
                            childrenNode[itemTemp] = childrenItem && childrenItem.length>0?'1':'0';
                        }
                    } else {
                         childrenNode[itemTemp] = childrenItem[para[itemTemp]];
                    }
                });
                if(newchildrenNode){
                    childrenNode.nodes = newchildrenNode;
                }
                childrenNodes.push(childrenNode);

            });
        }
        return childrenNodes;
    }

    /**
     * [collapseAll 闭合所有节点]
     * @param  {[object]} scope [前端页面的scope对象]
     */
    function collapseAll(scope) {
        scope.$broadcast('angular-ui-tree:collapse-all');
    }

    /**
     * [expandAll 展开所有节点]
     * @param  {[object]} scope [前端页面的scope对象]
     */
    function expandAll(scope) {
        scope.$broadcast('angular-ui-tree:expand-all');
    }

    /**
     * [expand 展开数据节点: unstable]
     * @param  {[object]}   scope [scope = angular.element(document.getElementById('tree-root')).scope().$nodesScope.childNodes()[0];]
     * @param  {[array]}    nodes [树的节点数据]
     */
    function expand(scope, nodes) {
        if (nodes && nodes.length > 0) {
            _(nodes).forEach(function(node) {
                var parentScopes = getScopePath(scope, node);

                for (var i = 0; i < parentScopes.length; i++) {
                    parentScopes[i].expand();
                }
            });
        }
    }

    function getScopePath(scope, node) {
        return getScopePathIter(scope, node, []);
    }

    function getScopePathIter(scope, node, parentScopeList) {
        if (!scope) return null;

        var newParentScopeList = parentScopeList.slice();
        newParentScopeList.push(scope);

        if (scope.$modelValue && scope.$modelValue.id === node.id) {
            if (_.isBoolean(node['checked'])) {
                scope.$modelValue['checked'] = node['checked'];
            }

            return newParentScopeList;
        }

        var foundScopesPath = null;
        var childNodes = scope.childNodes();

        for (var i = 0; foundScopesPath === null && i < childNodes.length; i++) {
            foundScopesPath = getScopePathIter(childNodes[i], node, newParentScopeList);
        }

        return foundScopesPath;
    }

    return service;
};
