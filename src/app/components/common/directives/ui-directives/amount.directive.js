'use strict';

module.exports = function amount($filter, toastr, ValidationService) {
    var directive = {
    	require: 'ngModel',
        restrict: 'AE',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
        var txt = '';

        el.bind('blur', function(event) {

            if(ctrl.$viewValue){
                var value = ctrl.$viewValue.replace(/\,/g, '');

                var flag = /(^\d{0,13}$)|(^\d{0,16}\.\d{1,2}$)/.test(value);

                if(!flag){
                    toastr.warning('只能输入整数或最多两位小数');
                    return false;
                }

                txt = $filter('number')(value, 2)

                ctrl.$setViewValue(txt);
                ctrl.$render()
            }
        })
    }
};
