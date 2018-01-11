'use strict';

var menuBarHtml = require('./menuNav.html');

module.exports = function menuBar($window,MenuConstant,$state) {
    var directive = {
        restrict: 'E',
        replace: true,
        template: menuBarHtml,
        link:linkFunc
    };

    return directive;

    function linkFunc(scope,el,attr) {
        scope.menu = MenuConstant;
        scope.displayMenu = [];             // 控制次级级目录显示数组的索引值key
        scope.circleRun = [];               // 控制一级点击效果呈现
        scope.nextDisplayMenu = [];         // 控制三级目录显示数组的索引值key
        scope.displayIndex = -1;            // 二级所引值
        scope.parentIndex = -1;             // 一级索引值
        scope.finalIndex = -1;              // 三级级索引值
        scope.rightNow = false;             // 鼠标是否在二级目录上
        scope.lastNow = false;              // 鼠标是否在三级目录上

        /**
         * 最顶层menu鼠标移出事件函数
         * @memberof menuNavDirective
         * @function disContentMenu
         * @description 顶层目录鼠标移除恢复默认状态
         */
        scope.disContentMenu = function(){
            scope.displayMenu = [];
            scope.rightNow = false;
            scope.lastNow = false;
        };

        /**
         * 点击目录菜单时候的效果
         * @memberof menuNavDirective
         * @function circleNice
         * @param index 选中的index值
         * @param length 菜单长度
         * @description 顶层目录菜单选中时候的效果
         */
        scope.circleNice = function(index, length){
            scope.circleRun = [];
            scope.circleRun[index] = true;
        };

        /**
         * 点击次级目录菜单时候的效果
         * @memberof menuNavDirective
         * @function selectMenu
         * @param index 选中的index值
         * @param length 次级菜单长度
         * @description 顶层目录菜单选中时候的效果
         */
        scope.selectMenu = function(index, length) {
            scope.parentIndex = index;
            for(var i = 0; i < length; i++) {
                if (i != index) {
                    scope.displayMenu[i] = false;
                }else {
                    // setTimeout(function() {
                        scope.displayMenu[index] = true;
                    // }, 155);
                }
            }
        };

        /**
         * 次级目录菜单被选中时候显示
         * @memberof menuNavDirective
         * @function selectMenu
         * @param nextindex 次级目录被选中索引值
         * @param nextLength 次级菜单长度
         * @param $event 判定事件是否落在这个元素
         * @description 次级目录菜单被选中时候显示功能函数
         */
        scope.selectNextMenu = function($event ,nextIndex, nextLength) {
            scope.displayIndex = nextIndex;
            if ($event.isTrusted) {
                scope.rightNow = true;
            }else {
                scope.rightNow = false;
            }
        };


        /**
         * 三级级目录菜单被选中显示
         * @memberof menuNavDirective
         * @function selectLastMenu
         * @param index 选中的index值
         * @param $event 判定鼠标落在这个元素
         * @param lastIndex 三级目录索引值
         * @description 三级目录被选中显示功能函数
         */
        scope.selectLastMenu = function($event, lastIndex) {
            scope.finalIndex = lastIndex;
            if ($event.isTrusted) {
                scope.lastNow = true;
            }else {
                scope.lastNow = false;
            }
        };

        /**
         * 鼠标挪开某个菜单栏则消失某一级的菜单
         * @memberof menuNavDirective
         * @function resetDisplay
         * @description 鼠标挪开某个菜单栏则消失某一级的菜单功能函数
         */
        scope.resetDisplay = function() {
            scope.rightNow = false;
            scope.lastNow = false;
        };

        /**
         * 点击冒泡效果并且跳转路由
         * @memberof menuNavDirective
         * @function circle
         * @name 冒泡路由
         * @param  $event 鼠标触发元素事件
         * @param  state  传值给
         * @param  name   菜单目录名称
         * @description 点击菜单实现冒泡效果并跳转路由
         */
        scope.myStyle = {};
        scope.circle = function($event, name, state) {
            var x, y;
            x = $event.layerX - 19 + 'px';
            y = $event.layerY - 19 + 'px';
            scope.myStyle = {left: x, top: y};
            scope.menuName = name;
            scope.menuBubble = true;
            setTimeout(function () {
                scope.menuBubble = false;
            }, 9);
            // state = $event.target.getAttribute('route');
            if (state==='' || state===undefined || state===null) {
                console.log('state is:' + '"' + state + '"');
            }else {
                $state.go(state);
            }
        };

    }
};
