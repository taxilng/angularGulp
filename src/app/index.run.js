'use strict';

module.exports = function runBlock($rootScope, wizardService, CONFIG, ROLE, PermissionService, uiSelect2Config, $state, $timeout) {
    uiSelect2Config.placeholder = "请选择";
    uiSelect2Config.allowClear = true;
    $rootScope.select2Options = {
        allowClear: true
        // minimumResultsForSearch: -1
    };
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        // when state change starts, check sessionstorage whether contains current_user or not.
        $rootScope.menuNav = [];
        // if (toState.newTab) {
        //     wizardService.newTab({
        //         title: toState.newTabTitle,
        //         state: toState.name
        //     });
        // }
        if (toState.name === 'login') {
            // 清空seeeion
            localStorage.clear();
            sessionStorage.clear();
            $timeout(function() {
                $rootScope.hideTopMenu = true;
                $('.content-wrapper, .right-side').css({
                    'background-color': 'transparent',
                    'background': 'url("/assets/images/login/login_bg.png") center bottom no-repeat',
                    'background-size': 'cover'
                });
                $('.main-sidebar').hide();
                $('.main-footer').show();
                // $('.content-wrapper').css({
                //     marginLeft:0
                // });
                $('.content-wrapper').animate({
                    // scrollTop: 0,
                    marginLeft: '0px'
                }, 0);
            });
            return;
        }

        if (sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER)) {
            $rootScope.hideTopMenu = false;
            $rootScope.hasLogin = true;
            var userInfo = JSON.parse(sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER));
            $rootScope.userName = userInfo.userName;
            $rootScope.employeeId = userInfo.employeeId;
            $rootScope.roleName = userInfo.roleName;
            $rootScope.orgSeriNo = userInfo.orgSeriNo;
            $rootScope.orgName = userInfo.orgName;
            $('.main-sidebar').show();
            $('.content-wrapper, .right-side').css({
                'background': '#e4eaf2'
            });
            // .skin-blue .main-sidebar, .skin-blue .left-side
            // $('.skin-blue .wrapper').css({
            //     'background-color': '#222d32'
            // });
            $('.skin-blue .main-sidebar').css({
                'background-color': '#0f2136'
            });
            // $('.skin-blue .left-side').css({
            //     'background-color': '#0f2136'
            // });
            $('.menu-header').css({
                'background-color': '#123859'
            });

            $('.main-footer').hide();
            $('.content-wrapper').animate({
                // scrollTop: 0,
                marginLeft: '230px'
            }, 0);
        } else {
            // 清空seeeion
            localStorage.clear();
            sessionStorage.clear();
            $rootScope.hasLogin = false;
            if (toState.loginState) {
                event.preventDefault();

                //收起sidebar
                // if ($("body").hasClass('sidebar-collapse')) {
                //     $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                // } else {
                //     $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                // }
                $state.go('login');
            }
        }


    });

    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.menuNav = JSON.parse(sessionStorage.getItem(CONFIG.SESSION.MENU_NAV));
        // $('.l-view').animate({
        //     scrollTop: 0
        // }, 200);
    });

    // $rootScope.isMobile = true;
    $rootScope.user = {
        name: '邱爽',
        userId: '001',
        orgId: '125025',
        orgName: '支付平台管理员',
        role: [
            ROLE.FINANCIAL_MANAGER.key
        ]
        // role: [
        //     ROLE.HEADQUATER_PRODUCT_MANAGER, //总行产品经理 --(0)PID001
        //     ROLE.BRANCH_PRODUCT_MANAGER, //分行产品经理 --(1)PID002
        //     ROLE.TEAM_MANAGER, //团队经理PID003
        //     ROLE.BRANCH_PRESIDENT, //支行行长  --(3)PID004
        //     ROLE.CUSTOMER_MANAGER, //客户经理   --(4)PID005
        //     ROLE.FINANCIAL_MANAGER, //理财经理  --(5)PID006
        //     ROLE.LOBBY_MANAGER, //大堂经理  --(6)PID007
        //     ROLE.CFC_PROMOTION_DIREACTOR, //CFC营销主管
        //     ROLE.CFC_PROMOTION_STAFF, //CFC营销人员
        //     ROLE.E_PROMOTION_DIRECTOR, //电销营销主管
        //     ROLE.E_PROMOTION_STAFF, //电销营销人员
        //     ROLE.WEALTH_CONSULTANT, //财富顾问
        //     ROLE.ADMIN //系统管理员
        // ],
    };
    if (sessionStorage) {
        var role = sessionStorage.getItem('userRole');
        if (role) {
            role = JSON.parse(role);
            $rootScope.user.role = role;
        }
    }
    if (CONFIG.OFFLINE) {
        var mockURL = CONFIG.ROOT_URL + '/' + CONFIG.ROUTE_URL;
        for (var api in CONFIG.API) {
            var url = mockURL + '/' + CONFIG.API[api];
            window.Mock.mock(url, window[api] ? window[api] : {}); //modified by liuyang
        }
    }
};