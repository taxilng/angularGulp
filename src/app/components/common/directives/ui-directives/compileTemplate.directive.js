'use strict';

module.exports = function($compile, $parse) {
    var directive = {
        restrict: 'AE',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, ele, attr) {
        var parsed = $parse(attr.ngBindHtml);
        function getStringValue() {
            return (parsed(scope) || '').toString();
        }

        //Recompile if the template changes
        scope.$watch(getStringValue, function() {
            $compile(ele, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
        });
    }
};
