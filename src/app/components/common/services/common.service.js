'use strict';

module.exports = function commonService() {
    var service = {
        clearSelectText: clearSelectText,
        setSelectTextById: setSelectTextById
    };

    return service;
    /**
     * 清除下拉框
     * @param  {[String]} clearText []
     * @return {[type]}           [description]
     */
    function clearSelectText(clearText,selectNum) {
        var selects;
        if (selectNum) {
            selects = angular.element('select').slice(0,selectNum);
        } else {
            selects = angular.element('select');
        }
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].previousElementSibling.children[0] != undefined) {
                selects[i].previousElementSibling.children[0].children[0].innerText = clearText[i];
            }
        }
    }

    /**
     * [setSelectTextById description]
     */
    function setSelectTextById(containerId, textArr) {
        var selects = angular.element('#' + containerId).find('select');
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].previousElementSibling.children[0] != undefined) {
                selects[i].previousElementSibling.children[0].children[0].innerText = textArr[i];
            }
        }
    }

};
