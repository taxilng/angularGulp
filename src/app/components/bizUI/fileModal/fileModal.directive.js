'use strict';

module.exports = function fileModal($parse) {
    var directive = {
        restrict:'A',
        link:linkFunc
    };

    return directive;

    function linkFunc(scope,element,attrs) {
        var model =  $parse(attrs.fileModal);
        var modelSetter = model.assign;
        element.bind('change',function(event){
            scope.$apply(function(){
                modelSetter(scope,element[0].files[0]);
            });
            scope.file = (event.srcElement || event.target).files[0];
            scope.getFile(element[0].id,scope.file);
        });
    }
};
