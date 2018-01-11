'use strict';

/**
 * @memberof retailBank
 * @ngdoc controller
 * @name distributionOrgTreeController
 * @param  {service} AchievementService 业绩服务
 * @param  {service} TreeService     cfo-tree树组件服务
 * @description
 * 机构树控制器,选中某个节点通过broadcast出OrgTreeSelected
 */
module.exports = function distributionOrgTreeController($rootScope, AuthorityManagementService, TreeService, $q,EventBusService) {
    var vm = this;
    // 分页参数
    vm.page = {
        startIndex: '1',
        pageSize: '10',
        total: ''
    };
    TreeService.clearNodes('distributionOrgTree');

    init();
    vm.confirm = function(){
        var nodes = TreeService.getSavedNodes();
        EventBusService.publish('distributionOrgTree','select',nodes);
    };
    /**
     * 初始化
     * @memberof distributionOrgTreeController
     * @function init
     * @description 初始化
     */
    function init() {
        var initParams = {
            orgSeriNo:$rootScope.orgSeriNo,
            startIndex: vm.page.startIndex,
            pageSize: vm.page.pageSize
        };
        queryOrgTree(initParams); //获取顶层机构数对象
    }
    /**
     * 获取机构树顶层数据
     * @memberof distributionOrgTreeController
     * @function queryOrgTree
     * @description 获取机构树顶层数据
     */
    function queryOrgTree(params) {
        var isMutiple = vm.mode=='mutiple'?true:false;
        var initData = [];

        AuthorityManagementService.queryOrgData(params).then(function(tree) {
            if(tree.orgInfoListJsonStr.indexOf("\\")){
                // json串需要反转义
                var orgInfoListJsonStr = angular.fromJson(tree.orgInfoListJsonStr.replace("\\",""));
            }else{
                var orgInfoListJsonStr = tree.orgInfoListJsonStr;
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
                orgId:'orgId'                               // 机构主键
            };
            //机构树接口获取的数据字段转换为treenode需要的字段
            var nodes = TreeService.convertToTreeNodes(orgInfoListJsonStr, param);
            //机构树所需要的参数配置
            vm.treeOptions = {
                data: nodes,
                dragable: false,
                treeName:'distributionOrgTree',
                checkboxShow:isMutiple,
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
                    var defered = $q.defer();
                    defered.resolve(nodeData);
                    return defered.promise;
                },
                addNode: function(nodeData) {
                    
                },
                collapse: true,
                modifyNode: function() {
                    console.log('修改节点');
                },
                removeNode: function() {
                    console.log('删除节点');
                },
                selectNode: function(nodeData) {
                    //选中节点触发的事件$on接收
                    if(!isMutiple){
                        EventBusService.publish('distributionOrgTree','select',nodeData);
                    }

                }
            };

            // vm.treeOptions.treeData = tree;
        }).catch(function(err) {
            console.log(err);
        });

    }
    /**
     * 获取子层机构树数据
     * @memberof distributionOrgTreeController
     * @function querySubOrgTree
     * @description 获取子层机构树数据
     */
    function querySubOrgTree(nodeData) {
        var params = {
            //useId: vm.params.userId,
            partyId: nodeData.id,
            //superOrgCode: nodeData.superOrgCode,
            containsChild: '0',
            containsSelf: '0'
        };
        return AuthorityManagementService.findOrgByCodeIncludeSelf(params);
    }
};
