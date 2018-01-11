'use strict';

module.exports = function($rootScope,$scope,CONFIG,toastr,$ngBootbox,$state,ModalService,EventBusService,UserService,ValidationService) {
    var vm = this;

    // 提交后端model模型
    vm.model = {};

    //------------------------变量声明开始------------------------------//


    //------------------------变量声明结束------------------------------//

    //------------------------方法声明开始------------------------------//
    //用户登录
    vm.login  = login;

    vm.init = init;

    // init();
    //初始化数据
    //------------------------方法声明结束------------------------------//

    //------------------------方法定义开始------------------------------//


    function init () {
        var sectionheight = $('.login-section').height();
    }

    function login() {

        if (!vm.model.employeeId) {
            toastr.warning('请输入用户名！');
            return false;
        }

        if (!vm.model.password) {
            toastr.warning('请输入密码！');
            return false;
        }
        var params = {
            employeeId: vm.model.employeeId,
            // password: md5.createHash(vm.model.password)
            password: vm.model.password
        };
        // 服务通讯
        var promise = UserService.userLogin(params);
        promise.then(function(data) {
           var loginFlag = data.loginFlag;
           if(loginFlag == 'Y'){
              toastr.warning(vm.model.employeeId+'柜员非正常退出或在别处已经登录,请重新登录');
              return false;
           }else{
             $rootScope.hasLogin = true;
             sessionStorage.setItem(CONFIG.SESSION.CURRENT_USER,JSON.stringify(data));
             EventBusService.publish('currentUser', 'userLogin', JSON.stringify(data));
             $state.go('index');
           }
           
        }).catch(function(error){
            toastr.error(error.message);
        });
    }  

    //------------------------方法定义结束------------------------------//
};
