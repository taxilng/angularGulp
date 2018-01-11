'use strict';

var _ = require('lodash');

module.exports = function loading($compile,$rootScope,EventBusService) {
    var directive = {
        restrict: 'A',
        scope: {
            loading: '='
        },
        link: link
    };

    function link(scope, el, attr) {
        scope.isLoading=true;
        var template = '<div class="loading"></div>';
        var content = $compile(template)(scope);
        el.append(content);
        // $rootScope.$on('inter-loading',function(){
        //     if($rootScope.loadingRequest == 0){
        //         $('.loading').remove();
        //         setTimeout(function(){
        //             if(_.isEmpty(scope.loading)){
        //                 if($(el).find('.no-data').length == 0){
        //                     $(el).append('<div class="no-data">（┬＿┬）暂无数据</div>');
        //                 }
        //             }
        //             else{
        //                 $(el).find('.loading').remove();
        //                 $(el).find('.no-data').remove();
        //             }
        //         }, 0);

        //     }
        // });
        scope.$watch('loading', function(value) {
            if(!_.isEmpty(value)){
                $(el).find('.loading').remove();
                $(el).find('.no-data').remove();
            }
            else{
                $(el).find('.loading').remove();
                if($(el).find('.no-data').length==0){
                    $(el).find('.ui-grid-canvas').append('<div class="no-data">（┬＿┬）暂无数据</div>');
                }
            }
        });

    }
    return directive;
};
