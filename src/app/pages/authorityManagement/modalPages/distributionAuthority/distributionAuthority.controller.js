'use strict';
var _ = require('lodash');

module.exports = function(ModalService, $scope, toastr, TreeService, AuthorityManagementService, row) {
    var vm = this;

    //------------------------变量声明开始------------------------------//
    // 提交后端model模型
    vm.model = {};
    //------------------------变量声明结束------------------------------//


    //------------------------方法声明开始------------------------------//

    //初始化数据
    init();
    // 取消(关闭弹出框)
    vm.cancel = cancel;
    // 角色绑定菜单查询
    vm.roleBindMenuSelect = AuthorityManagementService.roleBindMenuSelect;
    // 角色绑定菜单
    vm.changeAuthority = changeAuthority;
    // 角色绑定菜单函数
    vm.roleBindMenu = AuthorityManagementService.roleBindMenu;
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//
    /**
     * 初始化数据
     */
    function init() {
        vm.allAuthorPanel = {
            title: '全部功能权限目录',
            hasIcon: true
        };
        // 清空数据
        TreeService.clearNodes('authorTree');
        // 菜单查询
        AuthorityManagementService.roleBindMenuSelect({
            roleId: row.entity.roleId
        }).then(function(data) {
            var param = {
                id: 'prodMenuCode', // 目录节点码
                title: 'prodMenuName', // 目录节点码名称
                parentID: 'prodMenuParentId', // 目录父节点ID
                hasLeaf: 'prodMenuLevel', // 是否有子节点: '1' 是  '0' 否
                prodMenuUrl: 'prodMenuUrl', // 菜单URL
                prodMenuChannelNo: 'prodMenuChannelNo', // 渠道号
                menuStatus: 'menuStatus', // 菜单状态
                displayOrder: 'displayOrder', // 菜单序号
                prodMenuLevel: 'prodMenuLevel', // 菜单层级
                roleBindMenuFlag: 'roleBindMenuFlag', // 是否分配0-未分配 1-已分配
                menuId: 'menuId' // 菜单主键
            };

            if (data.roleBindMenuListJsonStr.indexOf("\\")) {
                // json串需要反转义
                var menuInfoListJsonStr = angular.fromJson(data.roleBindMenuListJsonStr.replace("\\", ""));
            } else {
                var menuInfoListJsonStr = data.roleBindMenuListJsonStr;
            }
            //权限树接口获取的数据字段转换为treenode需要的字段
            var nodes = TreeService.convertToTreeNodes(menuInfoListJsonStr, param);
            console.log(JSON.stringify(nodes));
            //初始化checked
            showSelectNode(nodes);
            vm.allNodeData = nodes;
        });
    }

    function showSelectNode(nodes) {
        if (nodes && nodes.length > 0) {
            _.each(nodes, function(node) {
                if (node.roleBindMenuFlag === '1') {
                    TreeService.saveNodes(node, 'authorTree','Echo');
                }
                showSelectNode(node.nodes);
            });
        }
    }

    // function checkedNode(node){
    //     var childNodeFlag = false;  // true-子元素有没选中项，false-子元素都选中
    //     for(var j = 0; j < node.length; j++){
    //         if(node[j].nodes.length > 0){
    //             var checkeNode = checkedNode(node[j].nodes);
    //             if(checkeNode){
    //                 childNodeFlag = true;
    //             }else{
    //                 TreeService.saveNodes(node[j],'authorTree');
    //             }
    //         }else{
    //             if(node[j].roleBindMenuFlag == '1') {
    //                 TreeService.saveNodes(node[j],'authorTree');
    //             }else{
    //                 childNodeFlag = true;
    //             }
    //         }
    //     }
    //     return childNodeFlag;
    // }


    function changeNodes() {
        var changedNodes = TreeService.getSavedNodes();
        //将数据进行转换
        var setedNodes = "";
        for (var i = 0; i < changedNodes.length; i++) {
            if (changedNodes[i].nodes && changedNodes[i].nodes.length > 0) {
                if (changedNodes[i].checked) {
                    setedNodes += changedNodes[i].menuId + "|";
                }
                setedNodes += modifyCheckState(changedNodes[i])
            } else {
                if (changedNodes[i].checked) {
                    setedNodes += changedNodes[i].menuId + "|";
                }

            }
        }
        return setedNodes;
    }

    // 循环二级以下菜单，获取菜单id
    function modifyCheckState(node) {
        var setedNodes = "";
        if (node.nodes && node.nodes.length > 0) {
            _(node.nodes).forEach(function(item) {
                if (item.nodes && item.nodes.length > 0) {
                    setedNodes += modifyCheckState(item);
                } else {
                    if (item.checked) {
                        setedNodes += item.menuId + "|";
                    }
                }
            });
        }

        return setedNodes + node.menuId + "|";
    }


    //改变权限
    function changeAuthority() {

        var setedNodes = filterRepeatStr(changeNodes());
        console.log(JSON.stringify(setedNodes));
        var postData = {
            roleId: row.entity.roleId,
            menuIdListStr: setedNodes
        };
        console.log(postData);
        vm.roleBindMenu(postData).then(function() {
            toastr.success('应用成功');

            //刷新树的数据
            init();
        }).catch(function(error) {
            toastr.error(error.message);
        });
    }

    function filterRepeatStr(str) {
        var ar2 = str.split("|");
        var array = new Array();
        var j = 0
        for (var i = 0; i < ar2.length; i++) {
            if ((array == "" || array.toString().match(new RegExp(ar2[i], "g")) == null) && ar2[i] != "") {
                array[j] = ar2[i] + '|';
                array.sort();
                j++;
            }
        }
        return ReplaceAll(array.toString(), ",", "");
    }

    function ReplaceAll(str, sptr, sptr1) {
        while (str.indexOf(sptr) >= 0) {
            str = str.replace(sptr, sptr1);
        }
        return str;
    }

    // 取消(关闭弹出框)
    function cancel() {
        var name = ModalService.getLastModalId();
        ModalService.closeModal(name, '');
    }
};
