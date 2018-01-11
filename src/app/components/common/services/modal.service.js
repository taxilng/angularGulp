'use strict';

var _ = require('lodash');

module.exports = function ModalService($uibModal) {
    var modalInstance = {};
    var modalSymbolArr = [];

    var service = {
        modalInstance: modalInstance,           // modal实例
        modalSymbolArr: modalSymbolArr,         // modal实例Id
        showModal: showModal,                   // 打开Modal
        closeModal: closeModal,                 // 关闭Modal
        dismissModal: dismissModal,             // 消除Modal
        getLastModalId: getLastModalId,         // 获取最后modal实例Id
        wait_submit:wait_submit,                // 锁屏
        close_wait_submit:close_wait_submit,    // 解屏
        // dismissAllModal: dismissAllModal        // 消除所有Modal
    };

    return service;

    function showModal(params) {
        var modalParams = {};

        modalParams.template = '<cfo-modal modal-title="' +  params.modalTitle + '">' + params.template + '</cfo-modal>';
        modalParams.controller = params.controller;
        if(params.controllerAs) {
            modalParams.controllerAs = params.controllerAs;
        }
        modalParams.size = params.size || 'lg';
        modalParams.backdrop = params.backdrop || 'static';
        if(params.resolve) {
            modalParams.resolve = params.resolve;
        }

        if (!_.includes(modalSymbolArr, params.modalId)) {
            modalSymbolArr.push(params.modalId);
        }

        modalInstance[params.modalId] = $uibModal.open(modalParams);

        return modalInstance[params.modalId];
    }

    // a method that can be used to close a modal, passing a result
    function closeModal(key, data) {
        if(data) {
            modalInstance[key].close(data);
        } else {
            modalInstance[key].close();
        }
        delete modalInstance[key];
        modalSymbolArr.pop(key);
    }

    // a method taht can be used to dismiss a modal, passing a reason
    function dismissModal(key) {
        modalInstance[key].dismiss();
        delete modalInstance[key];
        modalSymbolArr.pop(key);
    }

    function getLastModalId() {
        var modalId = '';

        if (modalSymbolArr) {
            modalId = modalSymbolArr[modalSymbolArr.length - 1];
        }

        return modalId;
    }

    // function dismissAllModal() {
    //     $uibModal.dismissAll();
    //     modalSymbolArr.length = 0;
    //     modalInstance = {};
    // }
    // 
    
    /************请求等待*************/
    //开启等待
    function wait_submit(maggseInfo){
        if($("body",window.top.document).find("#pageOverlay_wait_submit").length===0){//不存在
            var whtml = '<div id="pageOverlay_wait_submit" style="display:none;"></div>'+
            '<div class="waitBox" style="display:none;" id="waitBox"><span id="messageId">'+maggseInfo+'</span></div>';
             $("body",window.top.document).append(whtml);
             $("#waitBox",window.top.document).show();
             $("#pageOverlay_wait_submit",window.top.document).show();
        }
    };
    //关闭等待
    function close_wait_submit(){
        $("#waitBox",window.top.document).remove();
        $("#pageOverlay_wait_submit",window.top.document).remove();
    };
    /***************************************弹出窗口开始*********************************/

};
