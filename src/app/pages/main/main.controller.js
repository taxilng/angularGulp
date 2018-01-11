'use strict';

// var calendarModal = require('../modalPages/calendar');

module.exports = function($rootScope, PermissionService, ROLE, $state,
    ModalService) {
    var vm = this;

    vm.init = init;
    vm.menutoggler = menutoggler;
    vm.selectItem = selectItem;
    vm.roleClass = null;
    init();

    function selectItem(selectedItem) {
        angular.forEach(vm.concernContent, function(item) {
            if (item.isActive && item !== selectedItem) {
                item.isActive = false;
            }
        });
        selectedItem.isActive = true;
    }

    function init() {
        vm.viewtype = 'full';
        //主导航
        vm.concernContent = [{
            name: '收银台',
            src: 'icon-bank',
            // state: 'cashierdesk'
            state: 'cashierdesk.paymodemanage',
            isActive: true
        }, {
            name: '大钱包',
            src: 'icon-wallet',
            state: 'cashierdesk.paymodemanage'
        }, {
            name: '财富管家',
            src: 'icon-myfortune',
            state: 'myMarketing'
        }, {
            name: '安全管理',
            src: 'icon-security',
            state: 'myAchievement.sizeTargetOfOrganization'
        }, {
            name: '产品管理',
            src: 'icon-prodmanager',
            //state: 'product.productinfomanage'
            state: 'product'
        }, {
            name: '统一支付',
            src: 'icon-security',
            state: 'uniformPayment'
        }];

        vm.toolContent = [{
            name: '首页',
            src: 'calendar-icon',
            state: 'calendar',
            active: 'calendar-icon-active',
            click: function() {
                // ModalService.showModal({
                //     modalId: 'calendarModal',
                //     modalTitle: '事项管理',
                //     template: calendarModal.html,
                //     controller: ['$rootScope', 'ModalService', calendarModal.controller],
                //     controllerAs: 'vm',
                //     size: 'lg',
                //     backdrop: 'static'
                // });
            }
        }, {
            name: '客户联络',
            src: 'contact-icon',
            state: 'customerContact',
            active: 'contact-icon-active',
            click: function() {
                $state.go('customerContact');
            }
        }, {
            name: '支付',
            src: 'QQ-icon',
            state: 'qq',
            active: 'QQ-icon-active',
            click: function() {
                $state.go('qq');
            }
        }, {
            name: '银行卡',
            src: 'edit-icon',
            state: 'customInfoCollect',
            active: 'edit-icon-active',
            click: function() {
                $state.go(
                    'customerPotential.potentialCustomerAdd'
                );
            }
        }, {
            name: '渠道',
            src: 'chat-icon',
            //state: 'feedback',
            active: 'chat-icon-active',
            click: function() {
                $state.go('feedback');
            }
        }, {
            name: '交易',
            src: 'task-icon',
            state: 'task',
            active: 'task-icon-active',
            click: function() {
                $state.go('taskLayout.createTask');
            }
        }];
    }

    function menutoggler() {
        if (vm.viewtype === 'full') {
            vm.viewtype = 'mini';
            $('.l-content').css('left', '70px');
        } else {
            vm.viewtype = 'full';
            $('.l-content').css('left', '208px');
        }
    }
    // financial - manager
    vm.changeRole = function(type) {
        switch (type) {
            case 1:
                $rootScope.user.role = [
                    ROLE.FINANCIAL_MANAGER //理财经理
                ];
                break;
            case 2:
                $rootScope.user.role = [
                    ROLE.CUSTOMER_MANAGER //客户经理
                ];
                break;
            case 3:
                $rootScope.user.role = [
                    ROLE.LOBBY_MANAGER //大堂经理
                ];
                break;
            case 4:
                $rootScope.user.role = [
                    ROLE.BRANCH_PRESIDENT //支行行长
                ];
                break;
            default:
                break;
        }
        sessionStorage.setItem('userRole', JSON.stringify($rootScope.user
            .role));
    };

    $rootScope.wizardTabs = [{
        title: '收银台管理',
        state: 'cashierdesk'
    }];
};
