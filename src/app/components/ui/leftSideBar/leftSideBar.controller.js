'use strict';
var _ = require('lodash');
//menuConstant
var menuConstant = require('../../../constant/menu/menu.constant');
var sideBarMenuController = function($scope, MenuTreeService, $state, $rootScope, CONFIG, toastr, EventBusService) {
    var vm = this;

    // 菜单选中事件
    vm.uiSrefFun = uiSrefFun;
    // 菜单查询
    vm.queryTreeData = MenuTreeService.queryTreeData;


    init();

    // 菜单初始化
    function init() {
        if (!sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER)) {
            queryTreeData();
            //写死
            var userInfo = {
                userName: '邱爽',
                employeeId: '00001',
                roleName: '超级管理员',
                orgSeriNo: '031231232',
                orgName: '建行南京分行',
                userMenuJsonStr: menuConstant.reply.resBody.menuInfoListJsonStr
            };
            sessionStorage.setItem(CONFIG.SESSION.CURRENT_USER, JSON.stringify(userInfo));
        } else {
            var currentUser = JSON.parse(sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER));
            if (sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER)) {
                // 菜单树解析
                userMenuJsonStrFun(currentUser);
            }
        }
    }


    function queryTreeData() {
        // 一级菜单图片样式
        var iconMapping = {
            '301001001': 'icon-bank',
            '301001002': 'icon-wallet',
            '301001003': 'icon-myfortune',
            '301001004': 'icon-security',
            '301001005': 'icon-prodmanager',
            '301001006': 'icon-payment',
            '301001007': 'icon-authority',
            '301001008': 'icon-wallet',
            '301001009': 'icon-wallet',
            '301001010': 'icon-batch'
        };
        var params = {};
        //服务通讯
        vm.queryTreeData(params).then(function(data) {
            //菜单数据加载
            if (data.menuInfoListJsonStr.indexOf("\\")) {
                // json串需要反转义
                var menuInfoListJsonStr = angular.fromJson(data.menuInfoListJsonStr.replace("\\", ""));
            } else {
                var menuInfoListJsonStr = data.menuInfoListJsonStr;
            }

            console.log(menuInfoListJsonStr);

            vm.prodMenusListInfo = menuInfoListJsonStr;


            //一级菜单icon图片加载
            _.each(vm.prodMenusListInfo, function(item, index) {
                if (item.prodMenuCode != undefined) {
                    item.iconSrc = iconMapping[item.prodMenuCode];
                }

            });
        }).catch(function(err) {
            toastr.error(err.message);
        });
    }

    // 菜单树解析
    function userMenuJsonStrFun(currentUser) {
        // 一级菜单图片样式
        var iconMapping = {
            '301001001': 'icon-bank', //收银台
            '301001002': 'icon-wallet', //大钱包
            '301001003': 'icon-myfortune', //财富管家
            '301001004': 'icon-security', //安全
            '301001005': 'icon-prodmanager',
            '301001006': 'icon-payment', //统一支付
            '301001007': 'icon-authority', //权限
            '301001008': 'icon-customer', //客户
            '301001009': 'icon-financeProxy', //代理
            '301001010': 'icon-batch' //批量
        };
        //菜单数据加载
        if (currentUser.userMenuJsonStr.indexOf("\\")) {
            // json串需要反转义
            var userMenuJsonStr = angular.fromJson(currentUser.userMenuJsonStr.replace("\\", ""));
        } else {
            var userMenuJsonStr = currentUser.userMenuJsonStr;
        }

        console.log(userMenuJsonStr);

        vm.prodMenusListInfo = userMenuJsonStr;


        //一级菜单icon图片加载
        _.each(vm.prodMenusListInfo, function(item, index) {
            if (item.prodMenuCode != undefined) {
                item.iconSrc = iconMapping[item.prodMenuCode];
            }

        });
    }


    /**
     * [description] 订阅userLogin事件传播
     */
    EventBusService.subscribe('currentUser', 'userLogin', function(event, value) {
        var currentUser = JSON.parse(value);
        // 菜单树解析
        userMenuJsonStrFun(currentUser);
    });

    // 菜单选中事件
    function uiSrefFun(menuUrlObj) {
        if (!menuUrlObj.isOpen) {
            menuUrlObj.isOpen = 'true';
        } else {
            menuUrlObj.isOpen = false;
        }
        $rootScope.selectMenu = menuUrlObj;
        $rootScope.menuNav = [];
        $rootScope.menuNav.unshift(menuUrlObj);
        //prodMenuLevel prodMenuName prodMenuParentId prodMenuCode
        comboBreadcrumb(menuUrlObj);
        sessionStorage.setItem(CONFIG.SESSION.MENU_NAV, JSON.stringify($rootScope.menuNav));
        if (menuUrlObj.prodMenuUrl) {
            $state.go(menuUrlObj.prodMenuUrl);
        }
    }


    function comboBreadcrumb(menuUrlObj) {
        if (menuUrlObj.prodMenuParentId) {
            var parentNode = findParentNode(menuUrlObj.prodMenuParentId, menuUrlObj.prodMenuLevel);
            $rootScope.menuNav.unshift(parentNode);
            comboBreadcrumb(parentNode);
        }
    }

    function findParentNode(menuCode, menuLevel) {
        var menuNode = {};
        if (menuLevel === '2') {
            menuNode = _.find(vm.prodMenusListInfo, function(item, index) {
                return item.menuId === menuCode;
            });
        } else if (menuLevel === '3') {
            _.each(vm.prodMenusListInfo, function(item, index) {
                _.each(item.children, function(cItem, cIndex) {
                    if (cItem.menuId === menuCode) {
                        menuNode = cItem;
                    }
                });
            })
        }
        return menuNode;
    }
};
module.exports = sideBarMenuController;